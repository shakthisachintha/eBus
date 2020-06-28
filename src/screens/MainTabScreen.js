import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';

import UserProfile from './userProfile';
import Dashboard from './Dashboard';
import Registration from './passengerRegistration'

const Tab = createMaterialBottomTabNavigator();

const MyTabs = () => {
  return (
      <NavigationContainer>
        <Tab.Navigator
        initialRouteName="Dashboard"
        activeColor="#fff"
        shifting={true}
        style={{ backgroundColor: 'tomato' }}
        >
        <Tab.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
            tabBarLabel: 'Dashboard',
            tabBarColor: 'purple',
            tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
            }}
        />
        <Tab.Screen
            name="Registration"
            component={Registration}
            options={{
            tabBarLabel: 'Registration',
            tabBarColor: 'purple',
            tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="bell" color={color} size={26} />
            ),
            }}
        />
        <Tab.Screen
            name="Profile"
            component={UserProfile}
            options={{
            tabBarLabel: 'Profile',
            tabBarColor: 'purple',
            tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
            }}
        />
        </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MyTabs;