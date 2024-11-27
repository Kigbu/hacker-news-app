/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import React from 'react';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import ErrorBoundary from './src/components/error-boundary/ErrorBoundary ';
import MainLayout from './src/components/Layout/MainLayout';

function App(): React.JSX.Element {
  const _config = {
    screens: {},
  };
  const linking = {
    prefixes: [],
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

export default App;
