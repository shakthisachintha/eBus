import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Image, View, Modal, ImageBackground,Text,ActivityIndicator } from 'react-native';
import * as yup from 'yup';
import { IconButton, Colors, Button } from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';

import { AppForm, AppFormInput, SubmitButton, ErrorMessage } from '../../../components/forms';
import colors from '../../../utils/colors';
import useAuth from '../../../auth/useAuth';
import images from '../../../utils/images';
import userAPI from '../../../api/user';


const UserProfileScreen = ({ navigation }) => {

    const { user } = useAuth();
    const [data,setData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect( () =>{
        async function fetchData(){
            const result = await userAPI.userDetails();
            if (!result.ok) {
                return alert("Error while connecting.");
            }
            // console.log(result);
            setData(result.data);
            setLoading(false);
            return;
        }
        fetchData();
    },[])

    return (
        <ScrollView style={styles.scrollView}>
            {loading ? 
            <ActivityIndicator size="large" color="#0000ff" />
            :
            <ImageBackground source={images.LOGING_BACKGROUND} style={styles.backgroundImage} >
            {/* <Image
                style={styles.topImage}
                source={images.LOGO}
                resizeMode="contain"
            /> */}
            <Text style={styles.userNameText}> {data.name} </Text>
            <Text style={styles.emailText}> {data.email} </Text>
                <Image style={styles.avatar} source={{ uri : data.image }} />
                <View style={{paddingTop:200 ,justifyContent: "center",alignItems: 'center',}}>
                    <AppForm
                        initialValues={{ name: data.name , email: data.email, address: data.address, phoneNumber: data.phoneNumber, image:data.image }}
                        style={styles.data}
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
                            value={data.name}
                        />

                        <AppFormInput
                            name="email"
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={styles.input}
                            label="Email"
                            mode="outlined"
                            value={data.email}
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
                            // multiline
                            value={data.address}
                            multiline={true}
                            numberOfLines={2}
                            style={{width:300}}
                        />
                        <AppFormInput
                            name="phoneNumber"
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={styles.input}
                            label="Phone Number"
                            mode="outlined"
                            disabled
                            value={data.phoneNumber}
                        />
                    </AppForm>
                </View>
                <View style={styles.buttonContainer}>
                    <Button mode="outlined" icon="shield-key" labelStyle={{ fontSize: 13 }} onPress={() => navigation.navigate('ChangePassword')}>Change Password</Button>
                    <Button mode="outlined" icon="account-edit" labelStyle={{ fontSize: 13 }} onPress={() => navigation.navigate('EditUserProfile')} >Edit Details</Button>
                </View>
            </ImageBackground>
        }
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
        // paddingTop: 300
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
    userNameText: {
        // width: 75, height: 75,
        // justifyContent: 'center',
        alignSelf: 'flex-start',
        position:'absolute',
        top:65,
        left:30,
        fontSize:20,
        fontWeight:'bold',
        color: 'white'
        // marginTop: 60
    },
    emailText: {
        alignSelf: 'flex-start',
        position:'absolute',
        top:92,
        left:30,
        color: 'white'
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
        right:40
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 30,
        paddingBottom: 60
    },
});

export default UserProfileScreen;