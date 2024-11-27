import React from 'react';

import {ButtomTabStackParamList} from 'navigation/types';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ACCOUNT_SCREEN, JOBS, STORIES} from 'core/constants/screen-names';
import Account from 'screens/home/Account';
import Header from 'components/Layout/Header';
import BottomTabBar from 'components/Layout/BottomTabBar';
import HomeScreen from 'screens/home/Home';
import Jobs from 'screens/home/Jobs';
import Stories from 'screens/home/Stories';

const Stack = createBottomTabNavigator<ButtomTabStackParamList>();

export default function BottomTab() {
  return (
    <Stack.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props: any) => <BottomTabBar {...props} />}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'For You',
          tabBarLabel: 'element-three',
          headerShown: true,
          header: ({navigation, route, options}) => (
            <Header
              navigation={navigation}
              main
              route={route}
              options={options}
            />
          ),
        }}
      />

      <Stack.Screen
        name={STORIES}
        component={Stories}
        options={{title: 'Stories', tabBarLabel: 'message'}}
      />

      <Stack.Screen
        name={JOBS}
        component={Jobs}
        options={{title: 'Jobs', tabBarLabel: 'briefcase'}}
      />

      <Stack.Screen
        name={ACCOUNT_SCREEN}
        component={Account}
        options={{title: 'Account', tabBarLabel: 'profile-cicle'}}
      />
    </Stack.Navigator>
  );
}
