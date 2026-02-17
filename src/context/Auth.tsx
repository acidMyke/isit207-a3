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
  processLogin: (usernameOrEmail: string, password: string) => boolean;
  processSignup: (email: string, username: string, password: string) => boolean;
  processLogout: () => void;
};

type User = {
  email: string;
  username: string;
  password: string;
};

const staffs: User[] = [
  {
    email: 'notadmin@whatever.com',
    username: 'notadmin',
    password: 'notpassword',
  },
];

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
  const [users, setUsers] = useLocalStorageState<User[]>('users', []);
  const [currentUsername, setCurrentUsername] = useLocalStorageState<
    AuthContextData['currentUsername']
  >('current', undefined);
  const [currentStaffname, setCurrentStaffname] =
    useState<AuthContextData['currentUsername']>();

  const processLogin = useCallback(
    (usernameOrEmail: string, password: string): boolean => {
      const existingUser = users.find(
        user => user.username === usernameOrEmail && user.password === password,
      );

      if (existingUser) {
        setCurrentUsername(usernameOrEmail);
        return true;
      }

      const staff = staffs.find(
        user => user.username === usernameOrEmail && user.password === password,
      );

      if (staff) {
        setCurrentStaffname(usernameOrEmail);
        return true;
      }

      return false;
    },
    [users, setUsers],
  );

  const { processLogout, processSignup } = useMemo(() => {
    const processSignup = (
      email: string,
      username: string,
      password: string,
    ): boolean => {
      let userExists = users.some(
        user => user.username === username || user.email === email,
      );
      userExists ||= staffs.some(
        staff => staff.username === username || staff.email === email,
      );
      if (userExists) return false;

      const newUser: User = { email, username, password };
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
