import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

import UserProfileScreen from '../screens/Passenger/UserProfileScreen';
import EditUserProfileScreen from '../screens/Passenger/EditUserProfileScreen';
import SetNewPasswordScreen from '../screens/Authentication/SetNewPasswordScreen';
import ChangePasswordScreen from '../screens/Passenger/ChangePasswordScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => (

    <Stack.Navigator>

        <Stack.Screen
            name="UserProfile"
            component={UserProfileScreen}
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
    </Stack.Navigator>

)

export default AuthNavigator;