import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TopNavTab from 'components/TopNavTab/TopNavTab';
import React from 'react';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

const {Navigator} = createMaterialTopTabNavigator();

const TopTabNavigation = ({children, initialRouteName}: any) => {
  return (
    <Navigator
      initialRouteName={initialRouteName}
      initialLayout={{width: width}}
      tabBar={(props: any) => <TopNavTab {...props} />}>
      {children}
    </Navigator>
  );
};

export default TopTabNavigation;
