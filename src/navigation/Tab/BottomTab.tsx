import React from 'react';

import {ButtomTabStackParamList} from 'navigation/types';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ACCOUNT_SCREEN} from 'core/constants/screen-names';
import Account from 'screens/home/Account';
import Header from 'components/Layout/Header';
import BottomTabBar from 'components/Layout/BottomTabBar';
import HomeScreen from 'screens/home/Home';

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
          title: 'Home',
          tabBarLabel: 'home-two',
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

      {/* <Stack.Screen
        name={SEARCH_OUTFITS}
        component={SearchOutfits}
        options={{title: 'Search', tabBarLabel: 'search'}}
      /> */}

      <Stack.Screen
        name={ACCOUNT_SCREEN}
        component={Account}
        options={{title: 'Account', tabBarLabel: 'profile-cicle'}}
      />
    </Stack.Navigator>
  );
}
