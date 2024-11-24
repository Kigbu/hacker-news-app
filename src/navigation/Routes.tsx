import React from 'react';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import {jwtDecode} from 'jwt-decode';
import {L} from 'utils/helpers';
import localStorage, {storageKeys} from 'core/config/storage';
import {SIGN_IN} from 'core/constants/screen-names';
import useAuth from 'core/hooks/useAuth';

interface RoutesProps {
  email?: string;
  accessToken: string;
}

export default function Routes({email, accessToken}: RoutesProps) {
  // const [loadingRoutes, setLoadingRoutes] = React.useState(true);
  const {loggedIn, setLoggedIn, setInitialAuthScreen} = useAuth();

  React.useEffect(() => {
    // setLoggedIn(false);

    // if (hasViewedOnboarding) setInitialAuthScreen(SIGN_IN);

    // L('hasViewedOnboarding  ROUTES:;', );
    L('loggedIn Routes :>> ', loggedIn);
    L('email Routes :>> ', email);
    L('accessToken Routes :>> ', accessToken);

    // setTimeout(() => {
    //   getInitialAuthScreen();
    //   setLoadingRoutes(false);
    // }, 2000);
  }, []);

  const verifySession = async (accessToken: any) => {
    const decoded: any = jwtDecode(accessToken);
    const _isExpired = Date.now() >= +decoded.exp * 1000;
    console.log('_isExpired :>> ', _isExpired);
    if (!_isExpired) setLoggedIn(true);
  };

  return (
    <>{loggedIn ? <AppStack /> : <AuthStack email={email ? email : ''} />}</>
  );
}
