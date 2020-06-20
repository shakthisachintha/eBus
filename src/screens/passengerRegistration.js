import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, ScrollView, TouchableWithoutFeedback, Keyboard} from 'react-native';

import {Formik} from 'formik';
import {TextInput} from 'react-native-paper';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';

import Card from '../components/Card'

const PassegerRegistartion = props => {

    const [enteredEmail, setEnteredEmail] = useState();

    var regx = /^([a-z 0-9\.]+)@([a-z0-9-]+).([a-z]{2,8})(.[a-z]{2,8})?$/;

    const emailInputHandler = (email) => {
        console.log(email);
    };

    return (
    <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss();}}>
    <View style={styles.screen}>
        <Text style={styles.title}>Register With Us!</Text>
        <ScrollView>
        <Formik
            initialValues={{name:'',email:'',nic:'',img:'',password:'',confirmpassword:''}}
            onSubmit={(values)=>  {
                console.log(values);
            }}
        >
            {(props)=>(
                <Card>
                    <View style={styles.inputContainer}>
                        <Icon style={{flex:1, marginRight:10}} name="account" size={30} color="#a7287b" />
                        <TextInput style={{flex:12}} label="Name" mode="outlined" onChangeText={props.handleChange('name')} value={props.values.name} />
                    </View>
                    <View style={styles.inputContainer}>
                        <Icon style={{flex:1, marginRight:10}} name="email" size={30} color="#a7287b"/>
                        <TextInput style={{flex:12}} label="Email" mode="outlined" onEndEditing={emailInputHandler} keyboardType='email-address' value={enteredEmail} onChangeText={props.handleChange('email')} value={props.values.email} />
                    </View>
                    <View style={styles.inputContainer}>
                        <Icon style={{flex:1, marginRight:10}} name="account-card-details" size={30} color="#a7287b" />
                        <TextInput style={{flex:12}} label="National Identity Card No." mode="outlined" onChangeText={props.handleChange('nic')} value={props.values.nic} />
                    </View>
                    <View style={styles.inputContainer}>
                        <Icon style={{flex:1, marginRight:10}} name="account-circle" size={30} color="#a7287b" />
                        <TextInput style={{flex:12}} label="Image" mode="outlined" onChangeText={props.handleChange('img')} value={props.values.img} />
                    </View>
                    <View style={styles.inputContainer}>
                        <Icon style={{flex:1, marginRight:10}} name="shield-lock" size={30} color="#a7287b" />
                        <TextInput style={{flex:12}} label="Password" mode="outlined" onChangeText={props.handleChange('password')} value={props.values.password} />
                    </View>
                    <View style={styles.inputContainer}>
                        <Icon style={{flex:1, marginRight:10}} name="shield-check" size={30} color="#a7287b" />
                        <TextInput style={{flex:12}} label="Confirm Password" mode="outlined" onChangeText={props.handleChange('confirmpassword')} value={props.values.confirmpassword} />
                    </View>
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}><Button title="Cancel" color="#ff0000" /></View>
                        <View style={styles.button}><Button title="Confirm" color="#a7287b" onPress={props.handleSubmit} /></View>
                    </View>
                </Card>
            )}
        </Formik>
        </ScrollView>
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
    screen: {
        padding: 10,
        // alignItems: "center", //align center in horizontally
        justifyContent: 'center' //align in vertically
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal:75,
        paddingTop: 20,
        paddingBottom: 15
    },
     title: {
         fontSize: 20,
         marginVertical: 10,
     },
     button:{
         width:100
     },
     inputContainer:{
         flexDirection: 'row',
         flex:1,
         width:'100%',
         alignItems: "center",
         justifyContent: 'space-between',
        // justifyContent: 'center' //align in vertically
     }
});

export default PassegerRegistartion;