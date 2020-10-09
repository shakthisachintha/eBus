import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

import {
    EditUserProfileScreen,
    UserAccountScreen,
    ChangePasswordScreen,
    SetNewPasswordScreen,
    UserProfileScreen,
} from '../screens/Passenger';

import WalletNavigator from './WalletNavigator';
import SelectRouteScreen from '../screens/Passenger/Reservation/SelectRouteScreen';
import SeatSelectionScreen from '../screens/Passenger/Reservation/SeatSelectionScreen';
import SelectDateScreen from '../screens/Passenger/Reservation/SelectDateScreen';

const Stack = createStackNavigator();

const ProfileNavigator = () => (

    <Stack.Navigator>

        <Stack.Screen
            name="UserProfile"
            component={UserAccountScreen}
            options={{
                headerShown: false,
                headerLeft: null,
                title: 'User Profile'
            }}
        />

        <Stack.Screen
            name="Profile"
            component={UserProfileScreen}
            options={{
                headerShown: false,
                headerLeft: null,
                title: 'Profile'
            }}
        />

        <Stack.Screen
            name="EditUserProfile"
            component={EditUserProfileScreen}
            options={{
                headerShown: true,
                headerLeft: null,
                title: 'Edit Profile'
            }}
        />

        <Stack.Screen
            name="SetNewPassword"
            component={SetNewPasswordScreen}
            options={{
                headerShown: false,
                headerLeft: null,
                title: 'Set New Password'
            }}
        />

        <Stack.Screen
            name="ChangePassword"
            component={ChangePasswordScreen}
            options={{
                headerShown: true,
                headerLeft: null,
                title: 'Change Password'
            }}
        />

        <Stack.Screen
            name="userWallet"
            component={WalletNavigator}
            options={{
                headerShown: false,
                headerLeft: null,
                title: 'My Wallet'
            }}
        />

        <Stack.Screen
            name="SelectRouteScreen"
            component={SelectRouteScreen}
            options={{
                headerShown: true,
                title: 'Route Selection'
            }}
        />

        <Stack.Screen
            name="SelectDateScreen"
            component={SelectDateScreen}
            options={{
                headerShown: true,
                title: 'Select Date'
            }}
        />

        <Stack.Screen
            name="SeatSelectionScreen"
            component={SeatSelectionScreen}
            options={{
                headerShown: true,
                title: 'Seat Selection'
            }}
        />

    </Stack.Navigator>

)

export default ProfileNavigator;