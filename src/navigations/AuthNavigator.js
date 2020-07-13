import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"


import DashboardNavigator from './DashboardNavigator';
import { LoadingScreen } from '../screens';
import {
    LoginScreen,
    RegistrationScreen,
    ResetPasswordScreen,
    SetNewPasswordScreen,
    ForgotPasswordScreen,
    VerifyCodeScreen,
    PasswordResetScreen
} from "../screens/Authentication";

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
            options={{ title: "Register With Us" }}
        />

        <Stack.Screen
            name="ResetPassword"
            component={ForgotPasswordScreen}
            options={{ title: "Forgot Password" }}
        />

        <Stack.Screen
            name="Dashboard"
            component={DashboardNavigator}
            options={{ title: "Dashboard", headerShown: false }}
        />

        <Stack.Screen
            name="LinkVerify"
            options={{ title: "Verify Code" }}
            component={VerifyCodeScreen}
        />

        <Stack.Screen
            name="PasswordReset"
            options={{ title: "Reset Password" }}
            component={PasswordResetScreen}
        />

    </Stack.Navigator>
)

export default AuthNavigator;