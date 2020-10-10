import { set } from 'lodash';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { Button, TextInput, Card } from 'react-native-paper';
import bookingAPI from '../../../api/reservation';
import useAuth from '../../../auth/useAuth';

const ViewReservationsScreen = ({ navigation, route }) => {

    const { user } = useAuth();
    const [show, setShow] = useState(true);
    const [loading, setLoading] = useState(true);
    const [reservations, setReservations] = useState([]);
    
    async function fetchData(){
        const result = await bookingAPI.getReservations(user.id);
        if (!result.ok) {
            return alert("Error while connecting.");
        }
        // console.log(result.data);
        setLoading(false);
        if(result.data.length==0){
            setShow(false);
        }
        setReservations(result.data);
        return;
    }

    useEffect( () =>{
        fetchData();
        // console.log(show);
    },[route]);

    const pressHandler = (id) => {
        navigation.navigate('ReservationDetailsScreen', { id: id });
        // console.log(id);
    }

    return (
        <View>
            {loading ? 
            <ActivityIndicator size="large" color="#0000ff" />
            :
            <View>
                {show ?
                    <FlatList
                        keyExtractor={(item) => item._id}
                        data={reservations}
                        renderItem={({item}) => (
                        <TouchableOpacity onPress={() => pressHandler(item._id)}>
                            <Text style={styles.item}>Date : {item.date} {"\n"}Number of seats reserved : {item.numOfSeats}</Text>
                        </TouchableOpacity>
                        )}
                    />
                :
                    <View>
                        <Text style={{ color: 'black', justifyContent: 'center', fontSize: 30, marginTop: 100, textAlign:'center' }}><Text style={{ fontWeight: 'bold' }}>You do not have any reservations at the moment!!!</Text></Text>
                    </View>
                    
                }
            </View>
            }
            </View>
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
item: {
    marginTop:24,
    padding:30,
    backgroundColor:'blue',
    fontSize:18,
    fontWeight:'bold'
},
text: {
    marginTop:10,
    fontSize:28,
    fontWeight:'bold',
    marginBottom:10
}
});

export default ViewReservationsScreen;