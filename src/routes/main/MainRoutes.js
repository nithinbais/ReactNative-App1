import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../../screens/mainscreens/Home';
import Profile from '../../screens/mainscreens/Profile';
import bottomTab from '../main/BottomTab';

const authStack = createNativeStackNavigator();

const MainRoutes = () => {
  return (
    <authStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="bottomTab">
      <authStack.Screen name="bottomTab" component={bottomTab} />
      <authStack.Screen name="Home" component={Home} />
      <authStack.Screen name="Profile" component={Profile} />
    </authStack.Navigator>
  );
};

export default MainRoutes;
