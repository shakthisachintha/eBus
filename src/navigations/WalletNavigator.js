import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

import { PayHereWebViewScreen, WalletScreen } from '../screens/Passenger';
import colors from '../utils/colors';
import { NONE } from 'apisauce';

const Stack = createStackNavigator();

const WalletNavigator = () => (
    <Stack.Navigator screenOptions={{
        gestureEnabled: true,
        gestureDirection: "horizontal",
        gestureResponseDistance: 10,
        gestureVelocityImpact: 1,
    }}
        initialRouteName="Wallet">

        <Stack.Screen
            name="Wallet"
            component={WalletScreen}
            options={{
                headerShown: true,
                title: 'My Walllet'
            }}
        />

        <Stack.Screen
            name="PayHereWebView"
            component={PayHereWebViewScreen}
            options={{
                headerShown: false,
                cardOverlayEnabled: true,
                title: 'Add payment method'
            }}
        />
    </Stack.Navigator>
)


export default WalletNavigator;