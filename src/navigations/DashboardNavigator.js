import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Dashboard from '../screens/Passenger/Dashboard';
import ProfileNavigator from './ProfileNavigator';
import colors from '../utils/colors';


const Tab = createBottomTabNavigator();

const AppNavigator = () => (
    <Tab.Navigator
        tabBarOptions={{
            activeBackgroundColor: colors.primary,
            inactiveBackgroundColor: colors.white,
            activeTintColor: colors.white,
            inactiveTintColor: colors.black
        }}
    >
        <Tab.Screen
            options={{
                tabBarIcon: ({ color, size }) => <Icon name="home" color={color} size={size} />
            }}
            name="Dashboard"
            component={Dashboard}
        />
        <Tab.Screen
            options={{
                tabBarIcon: ({ color, size }) => <Icon name="account" color={color} size={size} />
            }}
            name="UserProfile"
            component={ProfileNavigator}
        />
    </Tab.Navigator>
)

export default AppNavigator;