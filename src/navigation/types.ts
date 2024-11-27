import {NavigatorScreenParams} from '@react-navigation/native';

export type AppStackParamList = {
  LoadingScreen: undefined;
  MyTabs: NavigatorScreenParams<ButtomTabStackParamList> | undefined;
  AlertBox: undefined;
  MyProfile: undefined;
  StoryDetails: undefined;
};

export type ButtomTabStackParamList = {
  Home: undefined;
  Account: undefined;
  Jobs: undefined;
  Stories: undefined;
  Tailors: undefined;
  SearchOutfits: undefined;
};

export type AuthStackParamList = {
  SplashScreen: undefined;
  SignIn: undefined;
  ForgotPassword: undefined;
  ChangePassword: undefined;
  ResetPassword: undefined;
  AlertBox: undefined;
  Onboarding: undefined;
  Welcome: undefined;
  SignUp: undefined;
};
