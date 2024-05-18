import {View, Text, Image} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../../screens/mainscreens/Home';
import Profile from '../../screens/mainscreens/Profile';
import homeIcon from '../../assest/home.png';
import profileIcon from '../../assest/profile.png';

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerStyle: {
            backgroundColor: 'green',
          },
          headerTintColor: '#fff',

          tabBarLabel: ({focused}) => (
            <Text style={{color: focused ? 'green' : '#000', fontSize: 10}}>
              Home
            </Text>
          ),
          tabBarIcon: ({focused}) => {
            return (
              <View
                style={{
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    height: 24,
                    width: 24,
                    tintColor: focused ? 'green' : '#000',
                  }}
                  source={homeIcon}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerStyle: {
            backgroundColor: 'green',
          },
          headerTintColor: '#fff',

          tabBarLabel: ({focused}) => (
            <Text style={{color: focused ? 'green' : '#000', fontSize: 10}}>
              Search
            </Text>
          ),
          tabBarIcon: ({focused}) => {
            return (
              <View
                style={{
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    height: 24,
                    width: 24,
                    tintColor: focused ? 'green' : '#000',
                  }}
                  source={profileIcon}
                />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
