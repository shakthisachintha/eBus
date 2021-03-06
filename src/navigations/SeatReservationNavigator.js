import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"


import SelectRouteScreen from '../screens/Passenger/Reservation/SelectRouteScreen';
import SeatSelectionScreen from '../screens/Passenger/Reservation/SeatSelectionScreen';
import SelectDateScreen from '../screens/Passenger/Reservation/SelectDateScreen';
import SeatCountScreen from '../screens/Passenger/Reservation/SeatCountScreen';
import ViewReservationsScreen from '../screens/Passenger/Reservation/ViewReservationsScreen';
import ReservationDetailsScreen from '../screens/Passenger/Reservation/ReservationDetailsScreen';
import UpdateSeatCountScreen from '../screens/Passenger/Reservation/UpdateSeatCountScreen';

const Stack = createStackNavigator();

const SeatReservationNavigator = () => (

    <Stack.Navigator>


        <Stack.Screen
            name="SelectRouteScreen"
            component={SelectRouteScreen}
            options={{
                headerShown: true,
                title: 'Route Selection'
            }}
        />

        <Stack.Screen
            name="SelectDateScreen"
            component={SelectDateScreen}
            options={{
                headerShown: true,
                title: 'Select Date'
            }}
        />

        <Stack.Screen
            name="SeatCountScreen"
            component={SeatCountScreen}
            options={{
                headerShown: true,
                title: 'Set Seat Count'
            }}
        />

        <Stack.Screen
            name="SeatSelectionScreen"
            component={SeatSelectionScreen}
            options={{
                headerShown: true,
                title: 'Seat Selection'
            }}
        />

        <Stack.Screen
            name="ViewReservationsScreen"
            component={ViewReservationsScreen}
            options={{
                headerShown: true,
                title: 'My Reservations'
            }}
        />

        <Stack.Screen
            name="ReservationDetailsScreen"
            component={ReservationDetailsScreen}
            options={{
                headerShown: true,
                title: 'Reservation Details'
            }}
        />

        <Stack.Screen
            name="UpdateSeatCountScreen"
            component={UpdateSeatCountScreen}
            options={{
                headerShown: true,
                title: 'Update Seat Count'
            }}
        />
    </Stack.Navigator>

)

export default SeatReservationNavigator;