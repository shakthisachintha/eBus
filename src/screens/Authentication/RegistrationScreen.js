import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback, Keyboard, Image } from 'react-native';

import { Formik } from 'formik';
import * as yup from 'yup';
import { TextInput, Button } from 'react-native-paper';

// import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


import Card from '../../components/Card';
import navigationTheme from '../../navigations/navigationTheme';


const reviewSchema = yup.object({
    name: yup.string()
        .required('Name is required'),
    email: yup.string()
        .required('Email is required')
        .email(),
    password: yup.string()
        .required('Password is required')
        .min(8),
    confirmpassword: yup.string()
        .required('Confirm password is required')
        .oneOf([yup.ref('password'), null], 'Passwords must match')
})

const RegistrationScreen = ({ navigation }) => {
    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
            <View style={styles.screen}>
                {/* <Text style={styles.title}>Register With Us!</Text> */}
                <ScrollView>
                    <Formik
                        initialValues={{ name: '', email: '', password: '', confirmpassword: '' }}
                        validationSchema={reviewSchema}
                        onSubmit={(values) => {
                            console.log(values);
                        }}
                    >
                        {(props) => (
                            <Card>
                                <View style={styles.inputContainer}>
                                    <Icon style={{ flex: 1, marginRight: 10 }} name="account" size={30} color="#a7287b" />
                                    <TextInput style={{ flex: 12 }} label="Name" mode="outlined" onChangeText={props.handleChange('name')} value={props.values.name} onBlur={props.handleBlur('name')} />
                                </View>
                                <Text style={styles.errorText}>{props.touched.name && props.errors.name}</Text>
                                <View style={styles.inputContainer}>
                                    <Icon style={{ flex: 1, marginRight: 10 }} name="email" size={30} color="#a7287b" />
                                    <TextInput style={{ flex: 12 }} label="Email" mode="outlined" keyboardType='email-address' onChangeText={props.handleChange('email')} value={props.values.email} onBlur={props.handleBlur('email')} />
                                </View>
                                <Text style={styles.errorText}>{props.touched.email && props.errors.email}</Text>
                                <View style={styles.inputContainer}>
                                    <Icon style={{ flex: 1, marginRight: 10 }} name="shield-lock" size={30} color="#a7287b" />
                                    <TextInput secureTextEntry={true} style={{ flex: 12 }} label="Password" mode="outlined" onChangeText={props.handleChange('password')} value={props.values.password} onBlur={props.handleBlur('password')} />
                                </View>
                                <Text style={styles.errorText}>{props.touched.password && props.errors.password}</Text>
                                <View style={styles.inputContainer}>
                                    <Icon style={{ flex: 1, marginRight: 10 }} name="shield-check" size={30} color="#a7287b" />
                                    <TextInput secureTextEntry={true} style={{ flex: 12 }} label="Confirm Password" mode="outlined" onChangeText={props.handleChange('confirmpassword')} value={props.values.confirmpassword} onBlur={props.handleBlur('confirmpassword')} />
                                </View>
                                <Text style={styles.errorText}>{props.touched.confirmpassword && props.errors.confirmpassword}</Text>
                                <View style={styles.buttonContainer}>
                                    <View style={styles.button}><Button onPress={() => navigation.navigate('Login')} color="#ff0000" mode="contained">Cancel</Button></View>
                                    <View style={styles.button}><Button color="#a7287b" mode="contained" onPress={props.handleSubmit}>Register</Button></View>
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
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 15
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
    },
    button: {
        width: 150
    },
    inputContainer: {
        flexDirection: 'row',
        flex: 1,
        width: '100%',
        alignItems: 'center',
        //justifyContent: 'center',
    },
    errorText: {
        paddingLeft: 40,
        color: 'crimson',
        fontWeight: 'bold'
    },
    image: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    }
});

export default RegistrationScreen;