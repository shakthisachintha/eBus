import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ActivityIndicator, RefreshControl } from 'react-native'
import LottieView from 'lottie-react-native';
import moment from 'moment';
import MapView, { Polyline, PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import animations from '../../utils/animations';
import AppIcon from '../../components/AppIcon'
import colors from '../../utils/colors'
import tripAPI from '../../api/trip';



const TripScreen = () => {

    const [isRefreshing, setIsRefreshing] = useState(false);
    const { activeTrip, setActiveTrip } = useContext(tripAPI.ActiveTripContext);

    const getCurrentTrip = async () => {
        setIsRefreshing(true);
        const result = await tripAPI.activeTrip();
        setIsRefreshing(false);
        if (!result.ok) return alert("Active trip fetching failed");
        setActiveTrip(result.data);
        return result.data;
    }

    useEffect(() => {
        getCurrentTrip();
    }, [])

    return (

        <ScrollView refreshControl={<RefreshControl colors={[colors.primary, colors.black, colors.success]} refreshing={isRefreshing} onRefresh={getCurrentTrip} progressViewOffset={70} />}>
            {activeTrip ?
                <>
                    <LottieView style={{ width: "100%" }} source={animations.TRIP_ANIMATION} autoPlay loop />

                    <View style={{ backgroundColor: "white", paddingHorizontal: 15, paddingVertical: 15 }}>
                        <AppText style={styles.mainText}>We are tracking your trip...</AppText>
                        <AppText style={styles.secondaryText}>Start Location : {activeTrip.start.place_name}</AppText>
                        <AppText style={styles.secondaryText}>Start Time : {moment(activeTrip.created_at).format('LT')}</AppText>
                    </View>

                    <MapView style={{ width: "100%", height: 210 }}
                        initialRegion={{
                            latitude: parseFloat(activeTrip.start.cordes.lat),
                            longitude: parseFloat(activeTrip.start.cordes.lng),
                            latitudeDelta: 0.013,
                            longitudeDelta: 0.0320
                        }} provider={PROVIDER_GOOGLE}>
                        <Marker
                            coordinate={{ latitude: parseFloat(activeTrip.start.cordes.lat), longitude: parseFloat(activeTrip.start.cordes.lng) }}
                            title="Start"
                        />
                    </MapView>
                </>
                :
                <>
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                        <Text style={styles.helpText}>No active trips</Text>
                        <LottieView speed={0.8} style={{ width: "100%" }} source={animations.TRIP_NOT_FOUND} loop={true} autoPlay />
                        <Text style={styles.helpText}>We couldn't find any active trips</Text>
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
