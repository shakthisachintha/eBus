import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"


import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from '../screens/RegistrationScreen';
import LoadingScreen from '../screens/LoadingScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import Dashboard from '../screens/Dashboard';
import SetNewPasswordScreen from '../screens/SetNewPasswordScreen';

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
            component={Dashboard}
            options={{ title: "Dashboard" }}
        />

        <Stack.Screen
            name="LinkVerify"
            options={{ title: "Reset Password" }}
            component={SetNewPasswordScreen}
        />

    </Stack.Navigator>
)

export default AuthNavigator;