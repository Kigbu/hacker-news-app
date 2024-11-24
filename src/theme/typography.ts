import {Platform} from 'react-native';

/*
Available font weights

300 Light
400 Regular
500 Medium
600 SemiBold
700 Bold
*/

export const family = {
  Bold: Platform.select({
    ios: 'HKNova-Bold', // The font family name
    android: 'HKNova-Bold', // The file name
  }),
  Regular: Platform.select({
    ios: 'HKNova-Regular', // The font family name
    android: 'HKNova-Regular', // The file name
  }),
  Light: Platform.select({
    ios: 'HKNova-Light', // The font family name
    android: 'HKNova-Light', // The file name
  }),
  ExtraBold: Platform.select({
    ios: 'HKNova-ExtraBold', // The font family name
    android: 'HKNova-ExtraBold', // The file name
  }),
  Medium: Platform.select({
    ios: 'HKNova-Medium', // The font family name
    android: 'HKNova-Medium', // The file name
  }),
  SemiBold: Platform.select({
    ios: 'HKNova-SemiBold', // The font family name
    android: 'HKNova-SemiBold', // The file name
  }),
};
