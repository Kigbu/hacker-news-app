import React from 'react';
import SafeAreaComp from 'components/Layout/SafeAreaComp';
import LoadingComp from 'components/LoadingComp/LoadingComp';
import useAuth from 'core/hooks/useAuth';
import {L} from 'utils/helpers';
import {WELCOEME} from 'core/constants/screen-names';

interface LoadingScreenProps {
  navigation: any;
}

export default function LoadingScreen({navigation}: LoadingScreenProps) {
  const {user, setLoggedIn, setInitialAuthScreen, setPhone, setEmail} =
    useAuth();

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      L('Screen: Loading - effect running');
      L('Screen: Loading - User', JSON.stringify(user, null, 4));

      const checkUserAuthStatus = () => {
        L('Check Auth status runningggg: :::: ::::: :::: :::');
        if (!user?.email) {
          setInitialAuthScreen(WELCOEME);
          setLoggedIn(false);
        } else {
          setLoggedIn(true);
          // setInitialAuthScreen(ACCOUNT_TYPE);
          navigation.reset({
            index: 0,
            routes: [{name: 'MyTabs'}],
          });
        }
      };

      checkUserAuthStatus();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaComp refreshing={false}>
      <LoadingComp />
    </SafeAreaComp>
  );
}
