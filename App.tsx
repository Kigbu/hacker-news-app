/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import ErrorBoundary from './src/components/error-boundary/ErrorBoundary ';
import MainLayout from './src/components/Layout/MainLayout';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const _config = {
    screens: {
      NewPassword: 'restorePassword',
      EmailVerified: 'verifyEmail',
    },
  };
  const linking = {
    prefixes: [
      'aibanc://',
      'https://www.mydinki.com',
      'https://mydinki.com',
      'http://www.mydinki.com',
    ],
    _config,
  };

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#fff',
    },
  };
  return (
    <SafeAreaProvider>
      <NavigationContainer linking={linking} theme={MyTheme}>
        <ErrorBoundary>
          <MainLayout />
        </ErrorBoundary>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
