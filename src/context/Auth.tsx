import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { useLocalStorageState } from '../hooks';
import { useLocation } from 'wouter';
import type { Applicant } from './Store/Data';

type Role = 'public' | 'member' | 'staff';

type AuthContextData = {
  currentUsername: string | undefined;
  currentRole: Role;
  processLogin: (usernameOrEmail: string, password: string) => boolean;
  processRegister: (
    email: string,
    username: string,
    password: string,
    fullname: string,
    phoneNumber: string,
  ) => boolean;
  processLogout: () => void;
};

type User = Applicant & {
  email: string;
  username: string;
  password: string;
};

type Staff = {
  username: string;
  password: string;
};

const staffs: Staff[] = [
  {
    username: 'notadmin',
    password: 'notpassword',
  },
];

const AuthContext = createContext<AuthContextData>({
  currentUsername: undefined,
  currentRole: 'public',
  processLogin: () => false,
  processRegister: () => false,
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
    [users, setCurrentStaffname, setCurrentUsername],
  );

  const processRegister = useCallback(
    (
      email: string,
      username: string,
      password: string,
      fullname: string,
      phoneNumber: string,
    ): boolean => {
      let userExists = users.some(
        user => user.username === username || user.email === email,
      );
      userExists ||= staffs.some(staff => staff.username === username);
      if (userExists) return false;
      const newUser: User = {
        email,
        username,
        password,
        fullname,
        phoneNumber,
      };
      setUsers(users => [...users, newUser]);
      setCurrentUsername(username);

      return true;
    },
    [users, setUsers, setCurrentStaffname, setCurrentUsername],
  );

  const processLogout = useCallback(() => {
    setCurrentStaffname(undefined);
    setCurrentUsername(undefined);
  }, [setCurrentStaffname, setCurrentUsername]);

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
        processRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

type UseAuthOption = {
  allowedRoles?: Role[];
};

export function useAuth(options: UseAuthOption = {}) {
  const context = useContext(AuthContext);
  const [location, navigate] = useLocation();

  if (!context) {
    throw new Error('useAuth must be used within AuthContextProvider');
  }

  useEffect(() => {
    if (
      options.allowedRoles &&
      !options.allowedRoles.every(a => a === context.currentRole)
    ) {
      navigate(`/login?redirect=${encodeURIComponent(location)}`);
    }
  }, [options.allowedRoles]);

  return context;
}
