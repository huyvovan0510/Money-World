import React from 'react';
import Home from '../screens/Home';
import Jars from '../screens/Jars';
import Challenge from '../screens/Challenge';
import UserProfile from '../screens/UserProfile';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CustomizeTab from './components/CustomizeTab';

const Stack = createNativeStackNavigator();
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
      <Stack.Navigator
        initialRouteName={'MainTab'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={'MainTab'} component={MainTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
