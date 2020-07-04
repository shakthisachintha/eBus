import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AppIcon from '../../components/AppIcon'
import colors from '../../utils/colors'

const TripScreen = () => {
    return (
        <View style={styles.container}>
            <AppIcon name="crosshairs-gps" size={80} backgroundColor={colors.secondary} iconColor={colors.white}> </AppIcon>
            <Text style={styles.helpText}>You don't have any active trips</Text>
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
