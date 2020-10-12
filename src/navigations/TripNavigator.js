import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

import MyTripsScreen from '../screens/Passenger/MyTripsScreen';
import TripSummary from '../screens/Passenger/TripSummary';

const Stack = createStackNavigator();

const TripNavigator = () => (

    <Stack.Navigator>


        <Stack.Screen
            name="myTrips"
            component={MyTripsScreen}
            options={{
                headerShown: true,
                title: 'My trips'
            }}
        />

        <Stack.Screen
            name="tripSummary"
            component={TripSummary}
            options={{
                headerShown: true,
                // headerLeft: null,
                title: 'Trip Summary'
            }}
        />


    </Stack.Navigator>

)

export default TripNavigator;