import React from 'react';
import {UserContext} from '../contextStore/context/user-context';
import localStorage, {storageKeys} from '../config/storage';
import userService from '../services/user.service';
import User from '../models/user.model';
import {L} from 'utils/helpers';

const useAuth = () => {
  const {setLoggedIn, setUser, setAccessToken, ...contextValues}: any =
    React.useContext(UserContext);

  const autoLogOutUser = async () => {
    L('logout user session ::: ::: ::: ::: ::: :::  logout called :::');
    const removeToken = async () => {
      localStorage.removeItem(storageKeys.NEWS_ACCESS_TOKEN);
      localStorage.removeItem(storageKeys.NEWS_USER_EMAIL);
      localStorage.removeItem(storageKeys.NEWS_USER_PIN);
      localStorage.removeItem(storageKeys.LAST_LOGIN_TIMESTAMP);
    };

    await removeToken();
    // alert('Session Expired!');

    setUser(null);
    setAccessToken('');

    setLoggedIn(false);
  };

  const loadUserProfile = async (token: any) => {
    const {ok, data}: any = await userService.getCurrentUserProfile(token);

    if (data?.data) {
      setUser(new User(data.data));
    }
  };

  return {
    setLoggedIn,
    setUser,
    setAccessToken,
    autoLogOutUser,
    loadUserProfile,
    ...contextValues,
  };
};

export default useAuth;
