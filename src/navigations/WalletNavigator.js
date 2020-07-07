import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

import { PayHereWebViewScreen, WalletScreen } from '../screens/Passenger';

const Stack = createStackNavigator();

const WalletNavigator = () => (
    <Stack.Navigator initialRouteName="Wallet">

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
                title: 'User Profile'
            }}
        />
    </Stack.Navigator>
)


export default WalletNavigator;