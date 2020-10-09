import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity, Icon } from 'react-native';
import { Button, TextInput, Card } from 'react-native-paper';
import images from '../../../utils/images';
import { AppForm, AppFormInput, SubmitButton, ErrorMessage } from '../../../components/forms';
import * as yup from 'yup';
import colors from '../../../utils/colors';
import DatePicker from 'react-native-date-picker';

const reviewSchema = yup.object({
    code: yup.number().required('Verification code is required').min(6)
});

const SeatCountScreen = ({ navigation, route }) => {

    const [count, setCount] = useState(1);
    if(count<=0){
        setCount(1);
    }
    if(count>15){
        setCount(15);
    }
    const { id, year, month, date } = route.params;
    const bookingDate = route.params.year+"-"+route.params.month+"-"+route.params.date;
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
            <Text style={{ color: 'black', justifyContent: 'center', fontSize: 18, marginTop: 10, textAlign:'center' }}><Text style={{ fontWeight: 'bold' }}>Bus id : {id}</Text></Text>
            <Text style={{ color: 'black', justifyContent: 'center', fontSize: 18, marginTop: 10, textAlign:'center' }}><Text style={{ fontWeight: 'bold' }}>Booking date : {bookingDate}</Text></Text>
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