import User from 'core/models/user.model';
import React, {createContext} from 'react';

export interface UserContextProps {
  accessToken: String;
  setAccessToken: any;
  user: User;
  setUser: any;
  alertClass: any;
  setAlertClass: any;
  isLoading: boolean;
  setIsLoading: any;
  linkingParams: any;
  setLinkingParams: any;
  loggedIn: boolean;
  setLoggedIn: any;
  initialAuthScreen: string;
  setInitialAuthScreen: any;

  firstName: string;
  setFirstName: any;
  lastName: string;
  setLastName: any;
  fullName: string;
  setFullName: any;
  email: string;
  setEmail: any;
  phone: string;
  setPhone: any;
  password: string;
  setPassword: any;
}

export const UserContext = createContext<UserContextProps | null>({
  accessToken: '',
  setAccessToken: () => {},
  user: new User(null),
  setUser: () => {},
  alertClass: null,
  setAlertClass: () => {},
  isLoading: false,
  setIsLoading: () => {},
  linkingParams: null,
  setLinkingParams: () => {},
  loggedIn: false,
  setLoggedIn: () => {},
  initialAuthScreen: '',
  setInitialAuthScreen: () => {},

  firstName: '',
  setFirstName: null,
  lastName: '',
  setLastName: null,
  fullName: '',
  setFullName: null,
  email: '',
  setEmail: null,
  phone: '',
  setPhone: null,
  password: '',
  setPassword: null,
});
