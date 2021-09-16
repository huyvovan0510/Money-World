import React from 'react';
import Home from '../screens/Home';
import Jars from '../screens/Jars';
import Challenge from '../screens/Challenge';
import UserProfile from '../screens/UserProfile';
import {NavigationContainer} from '@react-navigation/native';
import CustomizeTab from './components/CustomizeTab';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tabs = createBottomTabNavigator();

const MainTab = () => {
  return (
    <Tabs.Navigator
      tabBar={props => <CustomizeTab {...props} />}
      screenOptions={{header: () => null}}>
      <Tabs.Screen name={'Home'} component={Home} />
      <Tabs.Screen name={'Jars'} component={Jars} />
      <Tabs.Screen name={'Challenge'} component={Challenge} />
      <Tabs.Screen name={'UserProfile'} component={UserProfile} />
    </Tabs.Navigator>
  );
};

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <MainTab />
    </NavigationContainer>
  );
};

export default RootNavigation;
