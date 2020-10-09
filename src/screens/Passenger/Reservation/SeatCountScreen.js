import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, ActivityIndicator, Icon } from 'react-native';
import { Button, TextInput, Card } from 'react-native-paper';
import * as yup from 'yup';
import bookingAPI from '../../../api/reservation';

const reviewSchema = yup.object({
    code: yup.number().required('Verification code is required').min(6)
});

const SeatCountScreen = ({ navigation, route }) => {

    const [count, setCount] = useState(1);
    const [busNo, setBusNo] = useState(null);
    const [freeSeats, setFreeSeats] = useState(0);
    const [loading, setLoading] = useState(true);
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
            console.log(result.data);
            setBusNo("NA2222");
            setLoading(false);
            if(result.data.length==0){
                setFreeSeats(15);
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
            }
            return;
        }
        fetchData();
    },[])

    const { id, year, month, date } = route.params;
    const busId = route.params.id;
    const bookingDate = route.params.year+"-"+(route.params.month+1)+"-"+route.params.date;
    // const handleSubmit = async ({code, email}) => {
    //     setUpdateState({ updateLoader: true });
    //     const result = await authAPI.verify(code,email);
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
    //             'Verification Code',
    //             'The verification is successful! Please enter a new password to proceed!',
    //             [
    //               { text: 'OK', onPress: () => navigation.navigate('PasswordReset', { id: result.data._id })}
    //             ],
    //             { cancelable: false }
    //           );
    //     }
    // }
    return (
        <ScrollView style={styles.container}>
            {loading ? 
            <ActivityIndicator size="large" color="#0000ff" />
            :
            <View>
                <Text style={{ color: 'black', justifyContent: 'center', fontSize: 18, marginTop: 10, textAlign:'center' }}><Text style={{ fontWeight: 'bold' }}>Bus id : {busNo}</Text></Text>
                <Text style={{ color: 'black', justifyContent: 'center', fontSize: 20, marginTop: 10, textAlign:'center' }}><Text style={{ fontWeight: 'bold' }}>Booking date : {bookingDate}</Text></Text>
                <Text style={{ color: 'black', justifyContent: 'center', fontSize: 22, marginTop: 10, textAlign:'center' }}><Text style={{ fontWeight: 'bold' }}>Available Seats : {freeSeats}</Text></Text>
                <View style={{ paddingTop:20 ,justifyContent: "center", alignItems: 'center',}}>
                    <Button style={styles.input} mode="contained" onPress={() => setCount(count + 1)}>
                        <Text style={{fontSize: 25, textAlign:'center', fontWeight:'bold'}}>+</Text>
                    </Button>
                    <Text  style={styles.text}>Count : {count}</Text>
                    <Button style={styles.input} mode="contained" onPress={() => setCount(count - 1)}>
                    <Text style={{fontSize: 25, textAlign:'center', fontWeight:'bold'}}>-</Text>
                    </Button>
                    <Button style={styles.button} icon="account-multiple-check" mode="contained" onPress={() => console.log('Pressed')}>
                        Next
                    </Button>
                </View>
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
    marginTop: 50,
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