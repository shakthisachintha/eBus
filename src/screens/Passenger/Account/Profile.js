import React, { useState } from 'react';
import { StyleSheet, ScrollView, Image, View, Modal, ImageBackground } from 'react-native';
import * as yup from 'yup';
import { IconButton, Colors, Button } from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';

import { AppForm, AppFormInput, SubmitButton, ErrorMessage } from '../../../components/forms';
import colors from '../../../utils/colors';
import useAuth from '../../../auth/useAuth';
import images from '../../../utils/images';



const UserDetailsEditScreen = ({ navigation }) => {

    const { user } = useAuth();

    return (
        
        <ScrollView style={styles.scrollView}>
            <ImageBackground source={images.LOGING_BACKGROUND} style={styles.backgroundImage} >
                <Image style={styles.avatar} source={{ uri : user.image }} />
                <View style={{paddingTop:200 ,justifyContent: "center",alignItems: 'center',}}>
                    <AppForm
                        initialValues={{ name: user.name , email: user.email, address: "", number: "", image:user.image }}
                        // validationSchema={reviewSchema}
                        // onSubmit={handleUpdate}
                    >
                        <AppFormInput
                            // autoFocus={true}
                            name="name"
                            autoCapitalize="words"
                            autoCorrect={false}
                            style={styles.input}
                            label="Name"
                            mode="outlined"
                            disabled
                            value={user.name}
                        />

                        <AppFormInput
                            name="email"
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={styles.input}
                            label="Email"
                            mode="outlined"
                            value={user.email}
                            disabled
                        />

                        <AppFormInput
                            name="address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={styles.input}
                            label="Address"
                            mode="outlined"
                            disabled
                            multiline
                            value={user.address}
                        />
                        <AppFormInput
                            name="number"
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={styles.input}
                            label="Phone Number"
                            mode="outlined"
                            disabled
                        />
                    </AppForm>
                </View>
                <View style={styles.buttonContainer}>
                    <Button mode="outlined" icon="shield-key" labelStyle={{ fontSize: 13 }} onPress={() => navigation.navigate('ChangePassword')}>Change Password</Button>
                    <Button mode="outlined" icon="account-edit" labelStyle={{ fontSize: 13 }} onPress={() => navigation.navigate('EditUserProfile')} >Edit Details</Button>
                </View>
            </ImageBackground>
        </ScrollView>
        

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    backgroundImage: {
        resizeMode: "stretch",
        justifyContent: "center",
        alignItems: 'center',
    },
    button: {
        marginTop: 40,
        alignSelf: 'center',
    },
    headText: {
        fontSize: 30,
        justifyContent: 'center',
        alignSelf: 'center',
        color: 'purple'
    },
    buttonContent: {
        height: 40,
        width: 150,
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
    },
    topImage: {
        width: 200, height: 100,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 60
    },

    input: {
        height: 45,
        marginTop: 10,
        width: 300
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        alignSelf: 'center',
        position: 'absolute',
        top:50,
        right:50
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 30,
        paddingBottom: 60
    },
});

export default UserDetailsEditScreen;