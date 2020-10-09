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

const SelectDateScreen = ({ navigation, route }) => {

    const [count, setCount] = useState(1);
    const [date, setDate] = useState(new Date);
    const minDate = new Date();
    // const maxDate = (new Date().getDate() + 365);
    const someDate = new Date();
    const numberOfDaysToAdd = 365;
    someDate.setDate(someDate.getDate() + numberOfDaysToAdd); 
    // someDate.setDate(someDate.getDate() + numberOfDaysToAdd); 
    // const onIncrement = () => {
    //     this.setState({
    //       counter: this.state.counter + 1,
    //     })
    // };

    // const [counter, setCounter]= useState({
    //     counter:1,
    //     setCounter:counter+1
    // });
    
    const { id } = route.params;

    const handleSubmit = () => {
        console.log(date.getFullYear(), date.getMonth(), date.getDate());
        navigation.navigate('SeatCountScreen', { id: id, year:date.getFullYear(), month: date.getMonth(), date: date.getDate()});
    }
    return (
        <ScrollView style={styles.container}>
            <View style={styles.timeInput}>
                <DatePicker
                    date={date}
                    mode="date"
                    onDateChange={setDate}
                    maximumDate={someDate}
                    minimumDate={minDate}
                    fadeToColor="white"
                />
            </View>
            {/* <Text style={{ color: 'black', justifyContent: 'center', fontSize: 18, marginTop: 10, textAlign:'center' }}><Text style={{ fontWeight: 'bold' }}>Bus id new: {id}</Text></Text> */}
            <View style={{ paddingTop:20 ,justifyContent: "center",alignItems: 'center',}}>
            {/* <AppForm
                    initialValues={{ code: ""}}
                    validationSchema={reviewSchema}
                    // onSubmit={handleSubmit}
                > */}
                   
                    {/* {updateState.updateError && <ErrorMessage error={updateState.updateError} />} */}

                    {/* <SubmitButton
                        loading={updateState.updateLoader}
                        style={styles.button}
                        color={colors.primary}
                        contentStyle={styles.buttonContent}
                        title="Submit"
                        icon="check-circle-outline"
                    />
                </AppForm> */}
                <Button style={styles.button} icon="update" mode="contained" onPress={handleSubmit}>
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
    marginTop: 30,
    alignSelf: 'center',
    marginBottom: 40
},
input: {
    height: 45,
    width: 300
},
timeInput: {
    alignSelf:'center',
    marginTop:50,
    marginBottom:20
},
text: {
    fontSize:28,
    fontWeight:'bold'
}
});

export default SelectDateScreen;