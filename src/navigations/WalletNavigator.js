import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

import { PayHereWebViewScreen, WalletScreen, EditCardScreen, RechargeWalletScreen } from '../screens/Passenger';
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

        <Stack.Screen name="editCard" component={EditCardScreen} options={({ route }) => ({ title: route.params.title, cardStyle: { backgroundColor: colors.gray } })} />
        <Stack.Screen name="rechargeWallet" component={RechargeWalletScreen} options={({ route }) => ({ title: route.params.title, cardStyle: { backgroundColor: colors.gray } })} />
    </Stack.Navigator>
)


export default WalletNavigator;