import { result, set } from 'lodash';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, ActivityIndicator, Icon } from 'react-native';
import { Button, TextInput, Card } from 'react-native-paper';
import bookingAPI from '../../../api/reservation';
import { AppForm, AppFormInput, SubmitButton, ErrorMessage } from '../../../components/forms';

const ReservationDetailsScreen = ({ navigation, route }) => {

    const [updateState, setUpdateState] = useState({
        updateError: null,
        updateLoader: false,
    });
    const [count, setCount] = useState(1);
    const [busNo, setBusNo] = useState(null);
    const [bookedDate, setbookedDate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [startPoint, setStartPoint] = useState(null);
    const [endPoint, setEndPoint] = useState(null);
    const [seats, setSeats] = useState(0);

    const { id } = route.params;
    const resId = route.params.id;

    
    async function fetchData(){
        // console.log(resId);
        const result = await bookingAPI.getResDetails(resId);
        if (!result.ok) {
            return alert("Error while connecting.");
        }
        setSeats(result.data.numOfSeats);
        // setBusId(result.data.busId);
        setbookedDate(result.data.date);
        const bus = await bookingAPI.getBusNo(result.data.busId);
        if (!bus.ok) {
            return alert("Error while connecting...");
        }
        setBusNo(bus.data.busNo);
        setStartPoint(bus.data.startPoint);
        setEndPoint(bus.data.endPoint);
        setLoading(false);
        return;
    }

    useEffect( () =>{
        fetchData();
    },[route]);

    // const handleSubmit = async () => {
    //     setUpdateState({ updateLoader: true });
    //     const result = await bookingAPI.bookSeats(busId,bookingDate,count);
    //     setUpdateState({ updateLoader: false });
    //     if (!result.ok) {
    //         if (result.data) {
    //             setUpdateState({ updateError: result.data.error });
    //         }
    //         else {
    //             setUpdateState({ updateError: "An unknown error occurred." });
    //         }
    //         return;
    //     }
    //     if (result.ok){
    //         Alert.alert(
    //             'Seat Reservation Success',
    //             `You have successfull reserved ${count} seats on ${bookingDate} at ${busNo} route: ${startPoint} - ${endPoint}`,
    //             [
    //               { text: 'OK', onPress: () => navigation.navigate('UserProfile')}
    //             ],
    //             { cancelable: false }
    //           );
    //     }
    // }

    const confirmedDelete = async () => {
        const result = await bookingAPI.deleteRes(resId);
        if (!result.ok) {
            console.log(result)
            if (result.data) {
                setUpdateState({ updateError: result.data.error });
            }
            else {
                setUpdateState({ updateError: "An unknown error occurred." });
            }
            return;
        }
        if (result.ok){
            Alert.alert(
                'Seat Reservation Success',
                `You have successfull deleted reservation for ${seats} seats on ${bookedDate} at ${busNo} route: ${startPoint} - ${endPoint}`,
                [
                    { text: 'OK', onPress: () => navigation.navigate('UserProfile')}
                ],
                { cancelable: false }
                );
        }
    }

    const deleteReservation = () => {
        Alert.alert(
            'Confirm Delete the Reservation',
            `Are you sure you want to delete the reservation for ${seats} seats on ${bookedDate} in ${busNo} bus route ${startPoint}-${endPoint}?`,
            [
                {
                    text: 'Cancel',
                    onPress: () => navigation.navigate('ReservationDetailsScreen'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => confirmedDelete()}
            ],
            { cancelable: false }
        );
    }

    return (
        <ScrollView style={styles.container}>
            {loading ? 
            <ActivityIndicator size="large" color="#0000ff" />
            :
            <View>
                <Card style={{ justifyContent: 'center', marginTop: 100, textAlign:'center' }}>
                    <Text style={{ color: 'black', justifyContent: 'center', fontSize: 20, marginTop: 15, textAlign:'center' }}><Text style={{ fontWeight: 'bold' }}>Bus Number : {busNo}</Text></Text>
                    <Text style={{ color: 'black', justifyContent: 'center', fontSize: 20, marginTop: 10, textAlign:'center' }}><Text style={{ fontWeight: 'bold' }}>Bus Route : {startPoint} - {endPoint}</Text></Text>
                    <Text style={{ color: 'black', justifyContent: 'center', fontSize: 20, marginTop: 10, textAlign:'center' }}><Text style={{ fontWeight: 'bold' }}>Reserved date : {bookedDate}</Text></Text>
                    <Text style={{ color: 'black', justifyContent: 'center', fontSize: 22, marginTop: 10, textAlign:'center', marginBottom:15 }}><Text style={{ fontWeight: 'bold' }}>Reserved Number of Seats : {seats}</Text></Text>
                    <View style={styles.buttonContainer}>
                        <Button mode="contained" labelStyle={{ fontSize: 11 }} onPress= {deleteReservation}>Cancel Reservation</Button>
                        <Button mode="contained" labelStyle={{ fontSize: 11 }} onPress={() => navigation.navigate('EditUserProfile')} >Change Seat Count</Button>
                    </View>
                </Card>
                {updateState.updateError && <ErrorMessage error={updateState.updateError} />}
            </View>
            }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
container: {
    flex: 1,
},
button: {
    marginTop: 60,
    alignSelf: 'center',
    marginBottom: 50,
},
input: {
    height: 50,
    width: 80,
},
text: {
    marginTop:10,
    fontSize:28,
    fontWeight:'bold',
    marginBottom:10
},
buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 30,
},
});

export default ReservationDetailsScreen;