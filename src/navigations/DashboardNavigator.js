import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Dashboard from '../screens/Passenger/Dashboard';
import ProfileNavigator from './ProfileNavigator';
import colors from '../utils/colors';
import TripScreen from '../screens/Passenger/TripScreen';
import TripButton from './TripButton';
import WalletScreen from '../screens/Passenger/WalletScreen';


const Tab = createBottomTabNavigator();

const AppNavigator = () => (
    <Tab.Navigator initialRouteName="Dashboard"
        tabBarOptions={{
            activeTintColor: colors.white,
            inactiveTintColor: colors.black,
        }}
    >
        <Tab.Screen
            options={{
                tabBarIcon: ({ color, size }) => <Icon name="format-list-bulleted-type" color={color} size={size} />
            }}
            name="Dashboard"
            component={WalletScreen}
        />
        <Tab.Screen
            options={({ navigation }) => ({
                tabBarButton: () => <TripButton onPress={() => navigation.navigate("Trip")} />,

            })}
            name="Trip"
            component={TripScreen}
        />

        <Tab.Screen
            options={{
                tabBarIcon: ({ color, size }) => <Icon name="account" color={color} size={size} />,
                title: "Account"
            }}
            name="UserProfile"
            component={ProfileNavigator}
        />
    </Tab.Navigator>
)

export default AppNavigator;