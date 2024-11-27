import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthStackParamList} from './types';
import {SIGN_IN, SIGN_UP, WELCOEME} from 'core/constants/screen-names';
import useAuth from 'core/hooks/useAuth';
import Welcome from 'screens/auth/Welcome';
import SignUp from 'screens/auth/SignUp';
import SignIn from 'screens/auth/SignIn';
import {L} from 'utils/helpers';

const Stack = createNativeStackNavigator<AuthStackParamList>();

interface AuthStackProps {
  email: String;
}

export default function AuthStack({email}: AuthStackProps) {
  const {accessToken, initialAuthScreen} = useAuth();

  L('initialAuthScreen ::: AuthStack ::>', initialAuthScreen);

  return (
    <Stack.Navigator
      initialRouteName={initialAuthScreen}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={WELCOEME} component={Welcome} />
      <Stack.Screen name={SIGN_UP} component={SignUp} />
      <Stack.Screen name={SIGN_IN} component={SignIn} />
    </Stack.Navigator>
  );
}
