import React from 'react';
import UserProvider from '../../core/contextStore/provider/user-provider';
import {decryptUserData, L} from 'utils/helpers';
import User from 'core/models/user.model';
import localStorage, {storageKeys} from 'core/config/storage';
import userService from 'core/services/user.service';
import useApiClient from 'core/hooks/useClient';
import SplashScreen from 'react-native-splash-screen';
import Routes from '../../navigation/Routes';
import {WELCOEME} from 'core/constants/screen-names';

export default function MainLayout() {
  const [accessToken, setAccessToken] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [user, setUser] = React.useState<User>(new User(null));
  const [loadingApp, setLoadingApp] = React.useState<boolean>(true);
  const [initialAuthScreen, setInitialAuthScreen] =
    React.useState<string>(WELCOEME);
  const [loggedIn, setLoggedIn] = React.useState<boolean>(false);

  const {client} = useApiClient(accessToken);

  React.useEffect(() => {
    initLoad();
  }, [loadingApp, loggedIn]);

  const initLoad = () => {
    // localStorage.removeItem(storageKeys.USER_DB);
    // localStorage.clearStorage();

    Promise.all([getAuthParams()]).then(() => {
      setLoadingApp(false);
      SplashScreen.hide();
    });
  };

  const getAuthParams = async () => {
    const storedEmail = await localStorage.getItem(storageKeys.NEWS_USER_EMAIL);
    const storedToken = await localStorage.getItem(
      storageKeys.NEWS_ACCESS_TOKEN,
    );

    const hasViewOnboarding = await localStorage.getItem(
      storageKeys.NEWS_ONBOARDING,
    );

    // L('storedEmail', storedEmail);
    // L('storedAccessToken', storedToken);

    if (storedToken !== null) {
      setAccessToken(storedToken);

      await verifySession(storedToken);
    }

    if (storedEmail !== null) {
      setEmail(storedEmail);
    }

    // if (hasViewOnboarding !== null) {
    //   L('hasViewOnboarding MAIN::', hasViewOnboarding);

    //   setInitialAuthScreen('');
    // }
  };

  const verifySession = async (accessToken: any) => {
    const decoded: any = decryptUserData(accessToken);
    L('decoded Token::: ::: :::', JSON.stringify(decoded, null, 4));

    if (decoded?.email) {
      // get user profile

      const {success, user}: any = await userService.getCurrentUserProfile(
        accessToken,
      );

      if (success) {
        const profileUser = new User({
          ...user,
          accessToken: accessToken,
        });
        setUser(profileUser);

        setLoggedIn(true);
      } else {
        await clearSession();
      }
    } else {
      L("Token does not contain 'exp' claim.");
    }
  };

  const clearSession = async () => {
    setUser(new User(null));
    setLoggedIn(false);
    setAccessToken('');
    localStorage.removeItem(storageKeys.NEWS_ACCESS_TOKEN);
    localStorage.removeItem(storageKeys.NEWS_USER_EMAIL);
  };

  if (loadingApp) {
    return null;
  }

  return (
    <UserProvider
      setAccessToken={setAccessToken}
      accessToken={accessToken}
      initialAuthScreen={initialAuthScreen}
      setInitialAuthScreen={setInitialAuthScreen}
      loggedIn={loggedIn}
      setLoggedIn={setLoggedIn}
      user={user}
      setUser={setUser}>
      <Routes email={email ? email : ''} accessToken={accessToken} />
    </UserProvider>
  );
}
