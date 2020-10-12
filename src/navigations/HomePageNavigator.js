import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

import WalletNavigator from './WalletNavigator';

import Dashboard from '../screens/Passenger/Dashboard';
import SeatReservationNavigator from './SeatReservationNavigator';
import TripNavigator from './TripNavigator';

const Stack = createStackNavigator();

const HomePageNavigator = () => (

    <Stack.Navigator>


        <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
                headerShown: false,
                headerLeft: null,
                title: 'Dashboard'
            }}
        />

        <Stack.Screen
            name="myTrips"
            component={TripNavigator}
            options={{
                headerShown: false,
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
            name="seatReservations"
            component={SeatReservationNavigator}
            options={{
                headerShown: false,
            }}
        />


    </Stack.Navigator>

)

export default HomePageNavigator;