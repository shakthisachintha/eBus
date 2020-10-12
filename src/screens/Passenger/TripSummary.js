import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Pline from '@mapbox/polyline';
import MapView, { Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import config from '../../utils/config';
import AppText from '../../components/AppText';
import TouchableIcon from '../../components/TouchableIcon';
import call from 'react-native-phone-call'
import colors from '../../utils/colors';
import TripCard from '../../components/TripCard';

const TripSummary = ({ navigation, route }) => {
    const trip = route.params.trip;
    const initlat = (parseFloat(trip.start.cordes.lat) + parseFloat(trip.end.cordes.lat)) / 2
    const initlng = (parseFloat(trip.start.cordes.lng) + parseFloat(trip.end.cordes.lng)) / 2


    const onRegionChange = (region) => {
        setinitialRegion(region);
    }

    const [cordes, setCordes] = useState([]);
    const [initialRegion, setinitialRegion] = useState({
        latitude: initlat,
        longitude: initlng,
        latitudeDelta: 0.053,
        longitudeDelta: 0.0420,
    })

    const getDirections = async () => {
        // console.log(trip.end.cordes.lng)
        const resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?mode=transit&origin=${trip.start.cordes.lat},${trip.start.cordes.lng}&destination=${trip.end.cordes.lat},${trip.end.cordes.lng}&key=${config.MAPS_API}`)
        const resp_json = await resp.json();
        const points = Pline.decode(resp_json.routes[0].overview_polyline.points);
        const crds = points.map((point, index) => ({ latitude: point[0], longitude: point[1] }))
        setCordes(crds);
    }

    const emergCall = (number) => {
        call({ number, prompt: true }).catch(console.error)
    }

    useEffect(() => {
        getDirections();
    }, [route])

    return (
        <ScrollView>
            <MapView onRegionChange={onRegionChange} zoomTapEnabled style={{ width: "100%", height: 200 }} initialRegion={initialRegion} provider={PROVIDER_GOOGLE}>
                <Polyline
                    coordinates={cordes}
                    strokeColor={colors.visaBlue} // fallback for when `strokeColors` is not supported by the map-provider
                    strokeWidth={3}
                />
            </MapView>

            <View style={{ backgroundColor: "white" }}>
                <TripCard
                    from={trip.start.place_name}
                    to={trip.end.place_name}
                    date={trip.created_at}
                    duration={trip.distance.time}
                />
            </View>


            <View style={{ marginTop: 10, paddingHorizontal: 15, paddingVertical: 20, backgroundColor: "white" }}>
                <AppText style={{ fontWeight: "bold", fontSize: 18, marginBottom: 3 }}>Trip Fare</AppText>
                <AppText style={{ marginLeft: 10, fontSize: 18, color: colors.masterOrange }}>{trip.fare.amount.text}</AppText>

                <AppText style={{ fontWeight: "bold", fontSize: 18, marginBottom: 3, marginTop: 15 }}>Payement Method</AppText>
                <AppText style={{ marginLeft: 10, fontSize: 18, color: colors.darkGray }}>{trip.fare.payment.method}</AppText>
            </View>


            <View style={{ marginVertical: 10, paddingHorizontal: 15, paddingVertical: 20, backgroundColor: "white" }}>
                <AppText style={{ fontSize: 24 }}>Emergency Contact</AppText>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <View>
                        <AppText style={{ fontWeight: "bold", fontSize: 18, marginBottom: 3 }}>Bus Conductor</AppText>
                        <AppText style={{ marginLeft: 10 }}>{trip.bus.conductor.name}</AppText>
                        <AppText style={{ marginLeft: 10 }}>{trip.bus.conductor.telephone}</AppText>
                    </View>
                    <View>
                        <TouchableIcon onPress={() => emergCall("077434534")} name="phone" iconColor="black" backgroundColor="red" size={50} />
                    </View>
                </View>
                <View style={{ paddingVertical: 10, backgroundColor: "white" }}>
                    <AppText style={{ fontSize: 18, fontWeight: "bold" }}>Bus License Number</AppText>
                    <AppText style={{ marginTop: 3, marginLeft: 10, fontSize: 18, color: colors.darkGray }}>{trip.bus.number}</AppText>
                </View>

            </View>
        </ScrollView>
    )
}

export default TripSummary

const styles = StyleSheet.create({})
