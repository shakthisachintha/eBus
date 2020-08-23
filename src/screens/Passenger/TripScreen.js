import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ActivityIndicator, RefreshControl } from 'react-native'


import AppIcon from '../../components/AppIcon'
import colors from '../../utils/colors'
import tripAPI from '../../api/trip';



const TripScreen = () => {

    const [isRefreshing, setIsRefreshing] = useState(false);
    const { activeTrip } = useContext(tripAPI.ActiveTripContext);

    const getCurrentTrip = () => {
        setIsRefreshing(true);
        console.log(activeTrip);
        setTimeout(() => {
            setIsRefreshing(false);
        }, 2000);
    }

    useEffect(() => {
        getCurrentTrip();
    }, [])

    return (

        <ScrollView contentContainerStyle={styles.container} refreshControl={<RefreshControl colors={[colors.primary, colors.black, colors.success]} refreshing={isRefreshing} onRefresh={getCurrentTrip} progressViewOffset={70} />}>
            <AppIcon name="crosshairs-gps" size={80} backgroundColor={colors.secondary} iconColor={colors.white}> </AppIcon>
            <Text style={styles.helpText}>You don't have any active trips </Text>
            {activeTrip && <Text>{activeTrip._id}</Text>}
        </ScrollView>
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
