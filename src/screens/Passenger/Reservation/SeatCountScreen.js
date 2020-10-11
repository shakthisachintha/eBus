import { set } from 'lodash';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, ActivityIndicator, Icon } from 'react-native';
import { Button, TextInput, Card } from 'react-native-paper';
import bookingAPI from '../../../api/reservation';

const SeatCountScreen = ({ navigation, route }) => {

    const [updateState, setUpdateState] = useState({
        updateError: null,
        updateLoader: false,
    });
    const [count, setCount] = useState(1);
    const [busNo, setBusNo] = useState(null);
    const [freeSeats, setFreeSeats] = useState(1);
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(true);
    const [startPoint, setStartPoint] = useState(null);
    const [endPoint, setEndPoint] = useState(null);
    
    if(count<=0){
        setCount(1);
    }
    if(freeSeats>0){
        if(count>freeSeats){
            setCount(freeSeats);
        }
    }
    if(count>15){
        setCount(15);
    }

    async function fetchData(){
        // console.log(busId,bookingDate);
        const result = await bookingAPI.freeSeats(busId,bookingDate);
        if (!result.ok) {
            return alert("Error while connecting.");
        }
        if(freeSeats==0){
            setShow(false)
        }
        // console.log(result.data);
        setLoading(false);
        const bus = await bookingAPI.getBusNo(busId);
        // console.log(bus.data.busNo);
        setBusNo(bus.data.busNo);
        setStartPoint(bus.data.startPoint);
        setEndPoint(bus.data.endPoint);
        if(result.data.length==0){
            setFreeSeats(15);
            setShow(true);
        }
        else{
            var seats =0;
            var tot=0;
            result.data.forEach((element) => {
                seats = element.numOfSeats;
                tot=tot+seats;
            })
            var free = 15-tot;

            setFreeSeats(free);

            if(freeSeats==0){
                setShow(false)
            }
        }
        if(freeSeats==0){
            setShow(false)
        }
        return;
    }

    useEffect( () =>{
        fetchData();
        // console.log(show);
        if(freeSeats==0){
            setShow(false)
        }
    },[route]);
    useEffect(() => {
        if(freeSeats>0){
            setShow(true);
        }else{
            setShow(false)
        }
        // console.log("free seats",freeSeats)
    }, [freeSeats])

    const { id, year, month, date } = route.params;
    const busId = route.params.id;
    const bookingDate = route.params.year+"-"+(route.params.month+1)+"-"+route.params.date;
    const handleSubmit = async () => {
        setUpdateState({ updateLoader: true });
        const result = await bookingAPI.bookSeats(busId,bookingDate,count,startPoint,endPoint,busNo);
        setUpdateState({ updateLoader: false });
        if (!result.ok) {
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
                `You have successfull reserved ${count} seats on ${bookingDate} at ${busNo} route: ${startPoint} - ${endPoint}`,
                [
                  { text: 'OK', onPress: () => navigation.navigate('UserProfile')}
                ],
                { cancelable: false }
              );
        }
    }

    const handleConfirmation = () => {
        Alert.alert(
            'Confirm Submission',
            `Are you sure you want to submit the reservation?`,
            [
                {
                    text: 'Cancel',
                    onPress: () => navigation.navigate('SeatCountScreen'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => handleSubmit()}
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
                <Text style={{ color: 'black', justifyContent: 'center', fontSize: 18, marginTop: 10, textAlign:'center' }}><Text style={{ fontWeight: 'bold' }}>Bus Number : {busNo}</Text></Text>
                <Text style={{ color: 'black', justifyContent: 'center', fontSize: 20, marginTop: 10, textAlign:'center' }}><Text style={{ fontWeight: 'bold' }}>Booking date : {bookingDate}</Text></Text>
                <Text style={{ color: 'black', justifyContent: 'center', fontSize: 22, marginTop: 10, textAlign:'center' }}><Text style={{ fontWeight: 'bold' }}>Available Seats : {freeSeats}</Text></Text>
                {show ?
                    <View style={{ paddingTop:50 ,justifyContent: "center", alignItems: 'center',}}>
                        <Button style={styles.input} mode="contained" onPress={() => setCount(count + 1)}>
                            <Text style={{fontSize: 25, textAlign:'center', fontWeight:'bold'}}>+</Text>
                        </Button>
                        <Text  style={styles.text}>Seats : {count}</Text>
                        <Button style={styles.input} mode="contained" onPress={() => setCount(count - 1)}>
                        <Text style={{fontSize: 25, textAlign:'center', fontWeight:'bold'}}>-</Text>
                        </Button>
                        <Button style={styles.button} icon="account-multiple-check" mode="contained" onPress={handleConfirmation}>
                            Next
                        </Button>
                        {updateState.updateError && <ErrorMessage error={updateState.updateError} />}
                    </View>
                :
                    <View>
                        <Text style={{ color: 'black', justifyContent: 'center', fontSize: 30, marginTop: 100, textAlign:'center' }}><Text style={{ fontWeight: 'bold' }}>Sorry no more reservations!</Text></Text>
                        <Text style={{ color: 'black', justifyContent: 'center', fontSize: 30, marginTop: 10, textAlign:'center' }}><Text style={{ fontWeight: 'bold' }}>Reservations are full on {bookingDate}</Text></Text>
                        <Button style={styles.button} icon="backup-restore" mode="contained" onPress={() => navigation.navigate('SelectRouteScreen')} >
                            Back to search another bus
                        </Button>
                    </View>
                    
                }
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
}
});

export default SeatCountScreen;