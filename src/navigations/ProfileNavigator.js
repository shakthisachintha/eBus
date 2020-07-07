import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

import {
    EditUserProfileScreen,
    UserAccountScreen,
    ChangePasswordScreen,
    SetNewPasswordScreen,
} from '../screens/Passenger';

import WalletNavigator from './WalletNavigator';



const Stack = createStackNavigator();

const AuthNavigator = () => (

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
            name="EditUserProfile"
            component={EditUserProfileScreen}
            options={{
                headerShown: false,
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
                headerShown: false,
                headerLeft: null,
                title: 'Reset Password'
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

    </Stack.Navigator>

)

export default AuthNavigator;