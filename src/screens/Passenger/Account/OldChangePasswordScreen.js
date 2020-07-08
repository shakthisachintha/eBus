import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, ScrollView, } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { TextInput, Button } from 'react-native-paper';
import Card from '../../../components/Card';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



const reviewSchema = yup.object({
    oldPassword: yup.string()
        .required('Old password is required')
        .min(8),
    newPassword: yup.string()
        .required('New password is required')
        .min(8),
    confirmNewPassword: yup.string()
        .required('Confirm password is required')
        .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
})

const ChangePasswordScreen = ({ navigation }) => {
    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
            <View style={styles.screen}>
                <Text style={styles.title}>Change Password</Text>
                <ScrollView>
                    <Formik
                        initialValues={{ oldPassword: '', newPassword: '', confirmNewPassword: '' }}
                        validationSchema={reviewSchema}
                        onSubmit={(values) => {
                            console.log(values);
                        }}
                    >
                        {(props) => (
                            <Card>
                                <View style={styles.inputContainer}>
                                    <Icon style={{ flex: 1, marginRight: 10 }} name="shield-remove" size={30} color="#a7287b" />
                                    <TextInput secureTextEntry={true} style={{ flex: 12 }} label="Old Password" mode="outlined" onChangeText={props.handleChange('oldPassword')} value={props.values.oldPassword} onBlur={props.handleBlur('oldPassword')} />
                                </View>
                                <Text style={styles.errorText}>{props.touched.oldPassword && props.errors.oldPassword}</Text>
                                <View style={styles.inputContainer}>
                                    <Icon style={{ flex: 1, marginRight: 10 }} name="shield-plus" size={30} color="#a7287b" />
                                    <TextInput secureTextEntry={true} style={{ flex: 12 }} label="New Password" mode="outlined" onChangeText={props.handleChange('newPassword')} value={props.values.newPassword} onBlur={props.handleBlur('newPassword')} />
                                </View>
                                <Text style={styles.errorText}>{props.touched.newPassword && props.errors.newPassword}</Text>
                                <View style={styles.inputContainer}>
                                    <Icon style={{ flex: 1, marginRight: 10 }} name="shield-check" size={30} color="#a7287b" />
                                    <TextInput secureTextEntry={true} style={{ flex: 12 }} label="Re-enter the new password" mode="outlined" onChangeText={props.handleChange('confirmNewPassword')} value={props.values.confirmNewPassword} onBlur={props.handleBlur('confirmNewPassword')} />
                                </View>
                                <Text style={styles.errorText}>{props.touched.confirmNewPassword && props.errors.confirmNewPassword}</Text>

                                <View style={styles.buttonContainer}>
                                    <View style={styles.button}><Button color="#ff0000" mode="contained" onPress={() => navigation.goBack()}>Cancel</Button></View>
                                    <View style={styles.button}><Button color="#a7287b" mode="contained" onPress={props.handleSubmit}>Change</Button></View>
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

export default ChangePasswordScreen;