import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ActivityIndicator, RefreshControl } from 'react-native'
import LottieView from 'lottie-react-native';

import animations from '../../utils/animations';
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
            {activeTrip ?
                <>
                    <LottieView style={{ width: "100%" }} source={animations.TRIP_ANIMATION} autoPlay loop />


                    <AppText style={styles.mainText}>We are tracking your trip...</AppText>
                    <AppText style={styles.secondaryText}>Start location : Karapitiya Central Bus Station</AppText>


                    {/* <Text>{activeTrip.start}</Text> */}
                </>
                :
                <>
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                        <AppIcon name="crosshairs-gps" size={80} backgroundColor={colors.black} iconColor={colors.white}> </AppIcon>
                        <Text style={styles.helpText}>You don't have any active trips </Text>
                    </View>

                </>
            }
        </ScrollView>
    )
}

export default TripScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        alignItems: "center",
        // flexDirection:"column"
    },

    helpText: {
        // color: "tomato",
        fontSize: 20,
        marginVertical: 20,
        // textTransform: "uppercase"
    },
    mainText: {
        color: colors.black,
        fontSize: 22,
        marginBottom: 10
    },
    secondaryText: {
        color: "gray",
        fontSize: 18
    }
})
