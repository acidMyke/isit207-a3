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
  getAsApplicant: () => Applicant;
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
  getAsApplicant: () => ({
    fullname: '',
    email: '',
    phoneNumber: '',
  }),
});

type Props = {
  children: ReactNode;
};

export function AuthContextProvider({ children }: Props) {
  const [users, setUsers] = useLocalStorageState<User[]>('users', []);
  const [currentUser, setCurrentUser] = useLocalStorageState<Omit<
    User,
    'password'
  > | null>('currentUser', null);
  const [currentStaffname, setCurrentStaffname] =
    useState<AuthContextData['currentUsername']>();

  const processLogin = useCallback(
    (usernameOrEmail: string, password: string): boolean => {
      const existingUser = users.find(
        user => user.username === usernameOrEmail && user.password === password,
      );

      if (existingUser) {
        const { password: _, ...user } = existingUser;
        setCurrentUser(user);
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
    [users, setCurrentStaffname, setCurrentUser],
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
      setCurrentUser({ email, username, fullname, phoneNumber });

      return true;
    },
    [users, setUsers, setCurrentStaffname, setCurrentUser],
  );

  const processLogout = useCallback(() => {
    setCurrentStaffname(undefined);
    setCurrentUser(null);
  }, [setCurrentStaffname, setCurrentUser]);

  const getAsApplicant = useCallback(
    () => ({
      fullname: currentUser?.fullname ?? '',
      email: currentUser?.email ?? '',
      phoneNumber: currentUser?.phoneNumber ?? '',
    }),
    [currentUser],
  );

  return (
    <AuthContext.Provider
      value={{
        currentUsername: currentStaffname ?? currentUser?.username,
        currentRole: currentStaffname
          ? 'staff'
          : currentUser?.username
            ? 'member'
            : 'public',
        processLogin,
        processLogout,
        processRegister,
        getAsApplicant,
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
