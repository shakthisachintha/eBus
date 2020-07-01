import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, ScrollView, } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { TextInput, Button } from 'react-native-paper';
import Card from '../../components/Card';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



const reviewSchema = yup.object({
    name: yup.string()
        .required('First name is required'),
    email: yup.string()
        .required()
        .email(),
    nic: yup.string()
        .min(10, 'National Identity Card Number must be at least 10 characters')
        .max(12, 'National Identity Card Number must be at most 12 characters'),
    address: yup.string(),
    number: yup.number()
        .min(10, 'Phone number must be at least 10 characters')
})

const EditUserProfileScreen = ({ navigation }) => {
    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
            <View style={styles.screen}>
                <Text style={styles.title}>Edit details</Text>
                <ScrollView>
                    <Formik
                        initialValues={{ name: 'John Doe', email: 'johndoe@gmail.com', nic: '', address: '', number: '' }}
                        validationSchema={reviewSchema}
                        onSubmit={(values) => {
                            console.log(values);
                        }}
                    >
                        {(props) => (
                            <Card>
                                <View style={styles.inputContainer}>
                                    <Icon style={{ flex: 1, marginRight: 10 }} name="account" size={30} color="#a7287b" />
                                    <TextInput style={{ flex: 12 }} label="First Name" mode="outlined" onChangeText={props.handleChange('name')} value={props.values.name} onBlur={props.handleBlur('name')} />
                                </View>
                                <Text style={styles.errorText}>{props.touched.name && props.errors.name}</Text>
                                <View style={styles.inputContainer}>
                                    <Icon style={{ flex: 1, marginRight: 10 }} name="email" size={30} color="#a7287b" />
                                    <TextInput style={{ flex: 12 }} label="Email" mode="outlined" keyboardType='email-address' onChangeText={props.handleChange('email')} value={props.values.email} onBlur={props.handleBlur('email')} />
                                </View>
                                <Text style={styles.errorText}>{props.touched.email && props.errors.email}</Text>
                                <View style={styles.inputContainer}>
                                    <Icon style={{ flex: 1, marginRight: 10 }} name="account-card-details" size={30} color="#a7287b" />
                                    <TextInput style={{ flex: 12 }} label="National Identity Card No." mode="outlined" onChangeText={props.handleChange('nic')} value={props.values.nic} onBlur={props.handleBlur('nic')} />
                                </View>
                                <Text style={styles.errorText}>{props.touched.nic && props.errors.nic}</Text>
                                <View style={styles.inputContainer}>
                                    <Icon style={{ flex: 1, marginRight: 10 }} name="home-map-marker" size={30} color="#a7287b" />
                                    <TextInput multiline style={{ flex: 12 }} label="Address" mode="outlined" onChangeText={props.handleChange('address')} value={props.values.address} onBlur={props.handleBlur('address')} />
                                </View>
                                <Text style={styles.errorText}>{props.touched.address && props.errors.address}</Text>
                                <View style={styles.inputContainer}>
                                    <Icon style={{ flex: 1, marginRight: 10 }} name="cellphone-basic" size={30} color="#a7287b" />
                                    <TextInput style={{ flex: 12 }} label="Phone number" mode="outlined" onChangeText={props.handleChange('number')} value={props.values.number} onBlur={props.handleBlur('number')} keyboardType='numeric' />
                                </View>
                                <Text style={styles.errorText}>{props.touched.number && props.errors.number}</Text>

                                <View style={styles.buttonContainer}>
                                    <View style={styles.button}><Button color="#ff0000" mode="contained" onPress={() => navigation.goBack()}>Cancel</Button></View>
                                    <View style={styles.button}><Button color="#a7287b" mode="contained" onPress={props.handleSubmit}>Save</Button></View>
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

export default EditUserProfileScreen;