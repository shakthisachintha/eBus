import React, { useEffect, useState } from 'react'
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'


import tripAPI from '../../api/trip';
import AppText from '../../components/AppText';
import TripCard from '../../components/TripCard';
import colors from '../../utils/colors';

const MyTripsScreen = ({ navigation }) => {

    const [isRefreshing, setIsRefreshing] = useState(false)
    const [trips, setTrips] = useState([]);

    const getAllTrips = async () => {
        setIsRefreshing(true);
        const result = await tripAPI.recentTrips();
        setIsRefreshing(false)
        if (!result.ok) return alert("Couldn't fetch data.");
        setTrips(result.data);
    }

    const tripRenderComponent = (item) => {
        return <TripCard
            onPress={() => navigation.navigate("tripSummary", { trip: item })}
            date={item.created_at}
            bus={item.bus.number}
            from={item.start.place_name}
            to={item.end.place_name}
            fare={item.fare.amount.text} />
    }

    useEffect(() => {
        getAllTrips();
    }, []);

    return (
        <View>
            <FlatList
                ListHeaderComponent={<View style={{ marginVertical: 10 }}>
                </View>}
                refreshControl={<RefreshControl colors={[colors.primary, colors.black, colors.success]} refreshing={isRefreshing} onRefresh={getAllTrips} progressViewOffset={70} />}
                data={trips}
                renderItem={({ item }) => tripRenderComponent(item)}
                keyExtractor={item => item._id}
                ItemSeparatorComponent={() => <View style={{ marginVertical: 2, borderBottomColor: colors.darkGray, opacity: 0.3, borderBottomWidth: 0.8, marginHorizontal: 15 }} />}

            />


        </View>
    )
}

export default MyTripsScreen

const styles = StyleSheet.create({})
