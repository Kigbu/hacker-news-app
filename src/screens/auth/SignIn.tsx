import AuthBottomAction from 'components/Auth/AuthBottomAction';
import AuthHeader from 'components/Auth/AuthHeader';
import MyAppButton from 'components/Form/Button';
import PasswordInput from 'components/Form/PasswordInput';
import AppTextInput from 'components/Form/TextInput';
import SafeAreaComp from 'components/Layout/SafeAreaComp';
import LoadingComp from 'components/LoadingComp/LoadingComp';
import AppText from 'components/widgets/Text';
import localStorage, {storageKeys} from 'core/config/storage';
import useAuth from 'core/hooks/useAuth';
import useApiClient from 'core/hooks/useClient';
import User from 'core/models/user.model';
import userService from 'core/services/user.service';
import {family} from 'theme';
import colors from 'theme/colors';
import {height} from 'utils/dimensions';
import {w} from 'utils/responsive';
import React from 'react';
import {useForm} from 'react-hook-form';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export default function SignIn() {
  const navigation = useNavigation<NativeStackNavigationProp<any, any>>();
  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const {
    accessToken,
    setAccessToken,
    setLoggedIn,
    setPhone,
    setEmail,
    setUser,
  } = useAuth();
  const {client} = useApiClient(accessToken);

  const {control, handleSubmit} = useForm({mode: 'onChange'});

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const onSubmit = async (formData: any) => {
    setSubmitting(true);
    const dto = {
      email: formData.email.toLowerCase().trim(),
      password: formData.password,
    };

    const res = await userService.loginUser(dto);

    if (res?.success) {
      setSubmitting(false);

      const profileUser = new User({
        ...res.user,
        accessToken: res?.access_token,
      });

      try {
        await localStorage.setItem(
          storageKeys.NEWS_ACCESS_TOKEN,
          res?.access_token,
        );
        await localStorage.setItem(
          storageKeys.NEWS_USER_EMAIL,
          profileUser.email,
        );

        await localStorage.setItem(
          storageKeys.LAST_LOGIN_TIMESTAMP,
          Date.now(),
        );

        await localStorage.setItem(storageKeys.NEWS_SESSION_ID, Date.now());
      } catch (err) {
        console.log('err :>> ', err);
      }

      setUser(profileUser);

      setAccessToken(res?.access_token);
      setLoggedIn(true);
      // router.replace(`/(tabs)/home`);
    } else {
      alert(res?.message || 'Something went wrong. please try again');
    }

    console.log('res :>> ', res?.success);

    setSubmitting(false);
  };

  return (
    <SafeAreaComp refreshing={false}>
      <View style={{minHeight: height, paddingVertical: w(32), gap: w(36)}}>
        <AuthHeader
          headText={'Sign in to account'}
          subText={
            'Connect with a network of fashion-forward clients; expand your reach and build a loyal clientele'
          }
        />

        <View style={{gap: w(16)}}>
          <View>
            <AppTextInput
              name={'email'}
              control={control}
              label={'Email'}
              placeholder={'Enter Email Address'}
              keyboardType="email-address"
              rules={{
                required: 'Email Address is required',

                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },

                maxLength: {
                  value: 150,
                  message: 'Max length of 150 exceeded',
                },
              }}
            />
          </View>

          <View>
            <PasswordInput
              name={'password'}
              control={control}
              label={'Password'}
              placeholder={'Password'}
              type={'password'}
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 5,
                  message: 'Phone number must be at least 5 characters',
                },
              }}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: w(4),
            }}>
            <AppText
              style={{
                fontSize: w(12),
                fontWeight: '400',
                lineHeight: w(16.6),
              }}>
              Forgot your password?
            </AppText>
            <AppText
              onPress={() => {
                // navigation.navigate(FORGOT_PASSWORD)
              }}
              style={{
                color: colors.primary700,
                fontFamily: family.Bold,
                fontSize: w(12),
                lineHeight: w(16.6),
              }}>
              Reset it
            </AppText>
          </View>
        </View>

        <View style={{gap: w(16)}}>
          <View>
            <MyAppButton
              buttonVariant={'solid'}
              label="Sign In"
              disabled={submitting}
              onPress={handleSubmit(onSubmit)}
            />
          </View>
          <AuthBottomAction
            onPress={() => {
              // navigation.navigate(ACCOUNT_TYPE)
            }}
            text={'Don’t have an Account?'}
            linkText={'Create an account'}
            disabled={false}
          />
        </View>
      </View>

      {submitting && <LoadingComp />}
    </SafeAreaComp>
  );
}