import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../../screens/authscreens/Login';
import Signup from '../../screens/authscreens/Signup';

const authStack = createNativeStackNavigator();

const AuthRoutes = () => {
  return (
    <authStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Login">
      <authStack.Screen name="Login" component={Login} />
      <authStack.Screen name="Signup" component={Signup} />
    </authStack.Navigator>
  );
};

export default AuthRoutes;
