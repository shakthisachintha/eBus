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
    const [show, setShow] = useState(false);

    
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

    useEffect( () =>{
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
            return;
        }
        fetchData();
    },[])

    const { id, year, month, date } = route.params;
    const busId = route.params.id;
    const bookingDate = route.params.year+"-"+(route.params.month+1)+"-"+route.params.date;
    const handleSubmit = async () => {
        setUpdateState({ updateLoader: true });
        const result = await bookingAPI.bookSeats(busId,bookingDate,count);
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
                `You have successfull reserved ${count} seats on ${bookingDate} at ${busNo}`,
                [
                  { text: 'OK', onPress: () => navigation.navigate('UserProfile')}
                ],
                { cancelable: false }
              );
        }
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
                        <Button style={styles.button} icon="account-multiple-check" mode="contained" onPress={handleSubmit}>
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