import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useLocalStorageState } from '../hooks';

type AuthContextData = {
  currentUsername: string | undefined;
  currentRole: 'public' | 'member' | 'staff';
  processLogin: (username: string, password: string) => boolean;
  processSignup: (username: string, password: string) => boolean;
  processLogout: () => void;
};

type User = {
  username: string;
  password: string;
};

const staffs: User[] = [{ username: 'notadmin', password: 'notpassword' }];

const AuthContext = createContext<AuthContextData>({
  currentUsername: undefined,
  currentRole: 'public',
  processLogin: () => false,
  processSignup: () => false,
  processLogout: () => false,
});

type Props = {
  children: ReactNode;
};

export function AuthContextProvider({ children }: Props) {
  const [users, setUsers] = useLocalStorageState<User[]>('users', [
    { username: 'notadmin', password: 'notpassword' },
  ]);
  const [currentUsername, setCurrentUsername] = useLocalStorageState<
    AuthContextData['currentUsername']
  >('current', undefined);
  const [currentStaffname, setCurrentStaffname] =
    useState<AuthContextData['currentUsername']>();

  const processLogin = useCallback(
    (username: string, password: string): boolean => {
      const existingUser = users.find(
        user => user.username === username && user.password === password,
      );

      if (existingUser) {
        setCurrentUsername(username);
        return true;
      }

      const staff = staffs.find(
        user => user.username === username && user.password === password,
      );

      if (staff) {
        setCurrentStaffname(username);
        return true;
      }

      return false;
    },
    [users, setUsers],
  );

  const { processLogout, processSignup } = useMemo(() => {
    const processSignup = (username: string, password: string): boolean => {
      let userExists = users.some(user => user.username === username);
      userExists ||= staffs.some(staff => staff.username === username);
      if (userExists) return false;

      const newUser: User = { username, password };
      setUsers(users => [...users, newUser]);
      setCurrentUsername(username);

      return true;
    };

    const processLogout = () => {
      setCurrentStaffname(undefined);
      setCurrentUsername(undefined);
    };

    return { processLogout, processSignup };
  }, [setUsers, setCurrentUsername]);

  return (
    <AuthContext.Provider
      value={{
        currentUsername: currentStaffname ?? currentUsername,
        currentRole: currentStaffname
          ? 'staff'
          : currentUsername
            ? 'member'
            : 'public',
        processLogin,
        processLogout,
        processSignup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthContextProvider');
  }

  return context;
}
