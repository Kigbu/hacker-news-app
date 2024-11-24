import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';

import {Platform} from 'react-native';
import localStorage, {storageKeys} from '../setup/db/storage';
import {L} from '../utils/helpers';
import Routes from './Routes';
import {jwtDecode} from 'jwt-decode';
import {useNotificationContext} from 'core/contextStore/context/Notification/NotificationContext';
import useAuthContext from 'core/hooks/useAuthContext';
import {ACCOUNT_TYPE, SIGN_IN} from 'core/constants/screen-names';
import UserSignupProvider from 'core/contextStore/provider/user-provider';
import {getEnvVariable} from 'setup/config';
import useApiClient from 'core/hooks/useClient';
import userService from 'core/services/user.service';
import User from 'core/models/user.model';
import MeasurementProvider from 'core/contextStore/provider/measurement-provider';

export default function Main() {
  const {
    setShowNotificationModal,
    setNotificationData,
    showNotificationModal,
    notificationData,
  } = useNotificationContext();
  // useNotificationConfig(setShowNotificationModal, setNotificationData);

  const [accessToken, setAccessToken] = useState('');
  const [email, setEmail] = useState('');
  const [userInfo, setUserInfo] = React.useState<User>(new User(null));
  const [bankStatement, setBankStatement] = useState(null);
  const [userBvnStatus, setUserBvnStatus] = useState(null);
  const [userPinStatus, setUserPinStatus] = useState(false);
  const [hasAgreedToTerms, setHasAgreedToTerms] = useState(false);
  const [initialAuthScreen, setInitialAuthScreen] = useState('');
  const [userSelectedRole, setUserSelectedRole] = React.useState<string>('');
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [loadingApp, setLoadingApp] = React.useState<boolean>(true);
  const [firstLogin, setFirstLogin] = React.useState<boolean>(true);

  const {client} = useApiClient(accessToken);

  useEffect(() => {
    // try {

    // } catch (error) {

    // } finally {
    //   setLoadingApp(false);
    //   SplashScreen.hide();
    // }
    initLoad();
  }, []);

  const initLoad = () => {
    Promise.all([getAuthParams()]).then(() => {
      setLoadingApp(false);
      SplashScreen.hide();
    });
  };

  const getAuthParams = async () => {
    const storedEmail = await localStorage.getItem(
      storageKeys.DINKI_USER_EMAIL,
    );
    const storedToken = await localStorage.getItem(
      storageKeys.DINKI_ACCESS_TOKEN,
    );

    const storedPin = await localStorage.getItem(storageKeys.DINKI_USER_PIN);

    const storedAgreementStatus = await localStorage.getItem(
      storageKeys.DINKI_TERMS_AGREEMENT,
    );

    const hasViewOnboarding = await localStorage.getItem(
      storageKeys.DINKI_ONBOARDING,
    );

    const selectedRole = await localStorage.getItem(
      storageKeys.DINKI_SELECTED_ROLE,
    );

    const _firstLogin = await localStorage.getItem(storageKeys.FIRST_LOGIN);

    L('storedEmail', storedEmail);
    L('storedAccessToken', storedToken);
    L('storedAgreementStatus', storedAgreementStatus);
    L('selectedRole ::: ::: : ', selectedRole);
    L('_firstLogin :::: ::: ::: : ', _firstLogin);

    if (storedPin) {
      setUserPinStatus(true);
    }
    if (storedToken !== null) {
      setAccessToken(storedToken);

      await verifySession(storedToken);
    }
    if (storedEmail !== null) {
      setEmail(storedEmail);
    }

    if (storedAgreementStatus !== null) {
      setHasAgreedToTerms(storedAgreementStatus);
    }

    if (selectedRole !== null) {
      setUserSelectedRole(selectedRole);
    }

    if (hasViewOnboarding !== null) {
      L('hasViewOnboarding MAIN::', hasViewOnboarding);

      setInitialAuthScreen(ACCOUNT_TYPE);
    }

    if (_firstLogin !== null) {
      setFirstLogin(_firstLogin);
    }
  };

  const agreeToTerms = () => {
    setHasAgreedToTerms(true);
    localStorage.setItem(storageKeys.DINKI_TERMS_AGREEMENT, true);
  };

  const verifySession = async (accessToken: any) => {
    L('storedAccessToken Verify Session', accessToken);
    const decoded: any = jwtDecode(accessToken);
    L('decoded Token::: ::: :::', JSON.stringify(decoded, null, 4));
    // const _isExpired = Date.now() >= +decoded.exp * 1000;

    if (decoded.exp) {
      const _isExpired = Date.now() >= decoded.exp * 1000;
      console.log('_isExpired :>> ', _isExpired);

      const expirationDate = new Date(decoded.exp * 1000);
      L('Token will expire on:', expirationDate);

      if (!_isExpired) {
        // get user profile

        client.addAsyncRequestTransform(async (request: any) => {
          request.headers['Authorization'] = `Bearer ${accessToken}`;
        });

        const {ok, data, status}: any = await userService.getCurrentUserProfile(
          client,
        );

        if (ok) {
          const profileUser = new User({
            ...data.data,
            accessToken: accessToken,
          });
          setUserInfo(profileUser);
          L('data refresh user data ::::', JSON.stringify(data, null, 4));

          setLoggedIn(true);
        } else {
          await clearSession();
        }
      } else setLoggedIn(false);
    } else {
      L("Token does not contain 'exp' claim.");
    }
    // return _isExpired;
  };

  const clearSession = async () => {
    setUserInfo(new User(null));
    setLoggedIn(false);
    setAccessToken('');
    localStorage.removeItem(storageKeys.DINKI_ACCESS_TOKEN);
    localStorage.removeItem(storageKeys.DINKI_USER_EMAIL);
    localStorage.removeItem(storageKeys.DINKI_USER_PIN);
  };

  return (
    <>
      {!loadingApp && (
        <UserSignupProvider
          setUserPinStatus={setUserPinStatus}
          userPinStatus={userPinStatus}
          setUserBvnStatus={setUserBvnStatus}
          userBvnStatus={userBvnStatus}
          setBankStatement={setBankStatement}
          bankStatement={bankStatement}
          setAccessToken={setAccessToken}
          accessToken={accessToken}
          hasAgreedToTerms={hasAgreedToTerms}
          agreeToTerms={agreeToTerms}
          initialAuthScreen={initialAuthScreen}
          setInitialAuthScreen={setInitialAuthScreen}
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          userSelectedRole={userSelectedRole}
          setUserSelectedRole={setUserSelectedRole}
          firstLogin={firstLogin}
          setFirstLogin={setFirstLogin}>
          <MeasurementProvider>
            <Routes email={email ? email : ''} accessToken={accessToken} />
            {/* {showNotificationModal ? (
                <NotificationModal
                  dismissable
                  dismissFunc={() => setShowNotificationModal(false)}
                  mainImgUri={
                    notificationImageUrl
                      ? notificationImageUrl
                      : notificationData?.image_url
                  }
                  mainTxt={notificationData?.title}
                  subTxt={notificationData?.body}
                  notificationType={notificationData?.type}
                  mainBtnTxt="Close"
                  mainBtnAction={() => setShowNotificationModal(false)}
                />
              ) : null} */}
          </MeasurementProvider>
        </UserSignupProvider>
      )}
    </>
  );
}
