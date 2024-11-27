import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppStackParamList} from './types';
import BottomTab from './Tab/BottomTab';
import LoadingScreen from 'screens/loader/LoadingScreen';
import {STORY_DETAILS} from 'core/constants/screen-names';
import StoryDetails from 'screens/news/StoryDetails';
import Header from 'components/Layout/Header';

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="LoadingScreen">
      <Stack.Screen name={'LoadingScreen'} component={LoadingScreen} />

      <Stack.Screen name="MyTabs" component={BottomTab} />

      <Stack.Screen
        name={STORY_DETAILS}
        component={StoryDetails}
        options={{
          title: 'Story Details',
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
      />
    </Stack.Navigator>
  );
}
