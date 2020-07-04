import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"


import DashboardNavigator from './DashboardNavigator';
import LoginScreen from "../screens/Authentication/LoginScreen";
import LoadingScreen from '../screens/LoadingScreen';
import RegistrationScreen from '../screens/Authentication/RegistrationScreen';
import ResetPasswordScreen from '../screens/Authentication/ResetPasswordScreen';
import SetNewPasswordScreen from '../screens/Authentication/SetNewPasswordScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => (

    <Stack.Navigator>

        <Stack.Screen
            name="Loading"
            component={LoadingScreen}
            options={{ headerShown: false }}
        />

        <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
                headerShown: false,
                headerLeft: null
            }}
        />

        <Stack.Screen
            name="Register"
            component={RegistrationScreen}
            options={{ title: "Register" }}
        />

        <Stack.Screen
            name="ResetPassword"
            component={ResetPasswordScreen}
            options={{ title: "Forgot Password" }}
        />

        <Stack.Screen
            name="Dashboard"
            component={DashboardNavigator}
            options={{ title: "Dashboard", headerShown: false }}
        />

        <Stack.Screen
            name="LinkVerify"
            options={{ title: "Reset Password" }}
            component={SetNewPasswordScreen}
        />

    </Stack.Navigator>
)

export default AuthNavigator;