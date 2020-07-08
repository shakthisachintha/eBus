import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableNativeFeedback } from 'react-native'


import AppIcon from '../../components/AppIcon'
import colors from '../../utils/colors'
import useLocation from '../../hooks/useLocation'
import { TouchableOpacity } from 'react-native-gesture-handler'



const TripScreen = () => {

    const location = useLocation();
    console.log(location);

    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <AppIcon name="crosshairs-gps" size={80} backgroundColor={colors.secondary} iconColor={colors.white}> </AppIcon>
            </TouchableOpacity>

            <Text style={styles.helpText}>You don't have any active trips</Text>
            {/* <Text>Longitude:{cords} Latitude:{cords}</Text> */}
        </View>
    )
}

export default TripScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    helpText: {
        color: "tomato",
        fontSize: 20,
        marginVertical: 20,
        textTransform: "uppercase"
    }
})
