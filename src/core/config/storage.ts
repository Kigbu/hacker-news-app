import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
import {L} from 'utils/helpers';

export const storageKeys = {
  NEWS_USER_EMAIL: 'News_UserEmail',
  NEWS_ACCESS_TOKEN: 'News_ACCESS_TOKEN',
  NEWS_SESSION_ID: 'news_SessionId',
  NEWS_SELECTED_ROLE: 'news_role',

  NEWS_USER_PIN: 'News_UserPin',
  NEWS_Nonce: 'News_Nonce',
  NEWS_TERMS_AGREEMENT: 'news_TermsAgreement',
  LAST_LOGIN_TIMESTAMP: 'news_LastLoginTimestamp',

  ALL_NOTIFICATION_TYPES: 'news_AllNotificationTypes',
  NEWS_ONBOARDING: 'news_OnboardingViewd',
  USER_DB: 'news_user_DB',
};

export const isExpired = (timestamp: any, expiryInMinutes: any) => {
  const now = dayjs();
  const storedTime = dayjs(timestamp);
  return now.diff(storedTime, 'minute') > expiryInMinutes;
};

const storeItem = async (key: any, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    L('storeItem catch', error);
  }
};

const retrieveItem = async (key: any) => {
  try {
    const jsonObj = await AsyncStorage.getItem(key);
    return jsonObj != null ? JSON.parse(jsonObj) : null;
  } catch (error) {
    L('getItem catch', error);
  }
};

const deleteItem = async (key: any) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    L('removeItem catch', error);

    return false;
  }
};

const clearStorage = async () => {
  AsyncStorage.clear();
};

const localStorage = {
  setItem: storeItem,
  getItem: retrieveItem,
  removeItem: deleteItem,
  clearStorage,
};

export default localStorage;
