import React from 'react';
import UserProvider from '../../core/contextStore/provider/user-provider';
import {L} from 'utils/helpers';
import User from 'core/models/user.model';
import localStorage, {storageKeys} from 'core/config/storage';
import userService from 'core/services/user.service';
import useApiClient from 'core/hooks/useClient';
import SplashScreen from 'react-native-splash-screen';
import {jwtDecode} from 'jwt-decode';
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

    L('storedEmail', storedEmail);
    L('storedAccessToken', storedToken);

    if (storedToken !== null) {
      setAccessToken(storedToken);

      await verifySession(storedToken);
    }
    // router.replace("/(tabs)/home");
    if (storedEmail !== null) {
      setEmail(storedEmail);
    }

    if (hasViewOnboarding !== null) {
      L('hasViewOnboarding MAIN::', hasViewOnboarding);

      setInitialAuthScreen('');
    }
  };

  const verifySession = async (accessToken: any) => {
    L('storedAccessToken Verify Session', accessToken);
    const decoded: any = jwtDecode(accessToken);
    L('decoded Token::: ::: :::', JSON.stringify(decoded, null, 4));
    // const _isExpired = Date.now() >= +decoded.exp * 1000;

    if (decoded?.email) {
      // get user profile

      const {ok, user}: any = await userService.getCurrentUserProfile(
        accessToken,
      );

      if (ok) {
        const profileUser = new User({
          ...user,
          accessToken: accessToken,
        });
        setUser(profileUser);
        L('data refresh user data ::::', JSON.stringify(user, null, 4));

        setLoggedIn(true);

        // router.replace(`/(tabs)/home`);
      } else {
        await clearSession();
      }
    } else {
      L("Token does not contain 'exp' claim.");
    }
    // return _isExpired;
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

  console.log('loggedIn :>> ', loggedIn);

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
      {/* <Stack
          screenOptions={{ headerShown: false }}
          // initialRouteName={loggedIn ? "(app-stack)" : "(auth)"}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

          <Stack.Screen name="(auth)" options={{ headerShown: false }} />

          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" /> */}
      <Routes email={email ? email : ''} accessToken={accessToken} />
    </UserProvider>
  );
}
