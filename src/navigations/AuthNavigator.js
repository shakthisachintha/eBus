import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"


import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from '../screens/RegistrationScreen';
import LoadingScreen from '../screens/LoadingScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import Dashboard from '../screens/Dashboard';

const Stack = createStackNavigator();

const AuthNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name="Loading" component={LoadingScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            options={{
                headerShown: false,
                headerLeft: null
            }}
            name="Login"
            component={LoginScreen}

        />
        <Stack.Screen name="Register" component={RegistrationScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
    </Stack.Navigator>
)

export default AuthNavigator;