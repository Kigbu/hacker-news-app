import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppStackParamList} from './types';
import BottomTab from './Tab/BottomTab';
import navigatorId from 'core/constants/navigationId';
import LoadingScreen from 'screens/loader/LoadingScreen';

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppStack() {
  return (
    <Stack.Navigator
      // id={navigatorId.MAIN_APP_STACK }
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="LoadingScreen">
      <Stack.Screen name={'LoadingScreen'} component={LoadingScreen} />

      <Stack.Screen name="MyTabs" component={BottomTab} />

      {/* <Stack.Screen
        name="AlertBox"
        component={AlertBox}
        options={{
          presentation: 'transparentModal',
          // animationEnabled: false,
        }}
      /> */}

      {/*
      <Stack.Screen
        name={OUTFIT_DETAILS}
        component={OutfitDetails}
        options={{
          title: '',
          headerShown: true,
          header: ({navigation, route, options}: any) => (
            <Header
              navigation={navigation}
              route={route}
              options={options}
              hasBackBtn
            />
          ),
        }}
      /> */}
    </Stack.Navigator>
  );
}
