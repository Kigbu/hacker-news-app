import {NavigatorScreenParams} from '@react-navigation/native';

export type AppStackParamList = {
  LoadingScreen: undefined;
  MyTabs: NavigatorScreenParams<ButtomTabStackParamList> | undefined;
  AlertBox: undefined;
  AddOutfit: undefined;
  OutfitDetails: undefined;
  MyProfile: undefined;
  EditProfile: undefined;
  ShopProfile: undefined;
  EditShopProfile: undefined;
  SearchOutfits: undefined;
  OrderOutfit: undefined;
  Measurements: undefined;
  AddMeasurement: undefined;
  AddMeasurementOptions: undefined;
  ReviewOrder: undefined;
  ShoppingBag: undefined;
  OnboardingProfile: undefined;
  OnboardingPreference: undefined;
  OnboardingAccountVerification: undefined;

  // MakePayment: undefined;
  // TransactionHistory: undefined;
};

export type ButtomTabStackParamList = {
  Home: undefined;
  Account: undefined;
  Orders: undefined;
  Outfits: undefined;
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
