import React, { useState,useEffect } from 'react';
import { StyleSheet, ScrollView, Image, View, Modal, Alert, ActivityIndicator, Text } from 'react-native';
import * as yup from 'yup';
import { IconButton, Colors, Button, TextInput } from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';
import _ from "lodash";

import { AppForm, AppFormInput, SubmitButton, ErrorMessage } from '../../../components/forms';
import colors from '../../../utils/colors';
import { Formik } from 'formik';

import useAuth from '../../../auth/useAuth';
import userAPI from '../../../api/user';

const reviewSchema = yup.object({
    name: yup.string().required().label("Name"),
    email: yup.string().required().email().label("Email"),
    address: yup.string().label("Address"),
    phoneNumber: yup.string().max(10).label("Phone number")
});


const EditUserProfileScreen = ({ navigation }) => {

    const { user } = useAuth();
    const [updateState, setUpdateState] = useState({
        updateError: null,
        updateLoader: false,
    });
    const [modal, setModal] = useState(false);
    const [photo, setphoto] = useState(null);

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

    //choose a photo from storage
    const handleChoosePhoto = () => {
        const options = {
            noData: true,
        };
        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                setModal(false);
                console.log("response", response);
                setphoto(response);
            }
        });
    };
    //take a photo
    const handleTakePhoto = () => {
        const options = {
            noData: true,
        };
        ImagePicker.launchCamera(options, response => {
            if (response.uri) {
                setModal(false);
                console.log("response", response);
                setphoto(response);
            }
        });
    };

    const handleUpdate = async (values) => {
        setUpdateState({ updateLoader: true });
        const result = await userAPI.updateDetails(_.pick(values, ["name", "email", "address", "phoneNumber"]));
        setUpdateState({ updateLoader: false });
        if (!result.ok) {
            if (result.data) {
                setUpdateState({ updateError: result.data.error });
                Alert.alert(
                    'Profile Detail Update Error',
                    `${result.data.error}`,
                    [
                      { text: 'OK', onPress: () => navigation.navigate('EditUserProfile') }
                    ],
                    { cancelable: false }
                  );
            }
            else {
                setUpdateState({ updateError: "An unknown error occurred." });
                console.log(result);
            }
            return;
        }
        if (result.ok){
            Alert.alert(
                'Profile Detail Update',
                'You have successefully updated the user details!',
                [
                  { text: 'OK', onPress: () => navigation.navigate('UserProfile') }
                ],
                { cancelable: false }
              );
        }
    }

    return (
        
        <ScrollView style={styles.container}>
            {loading ? 
                <ActivityIndicator size="large" color="#0000ff" />
                :
            <View>    
                <Image style={styles.avatar} source={{ uri : data.image }} />
                <IconButton
                    icon="camera-account"
                    color={Colors.red500}
                    size={30}
                    onPress={() => setModal(true)}
                    style={{ position: 'absolute', marginTop: 60, marginLeft: 250 }}
                />
                <View style={{paddingTop:150 ,justifyContent: "center",}}>
                    {/* <AppForm
                        initialValues={{ name: data.name , email: data.email, address: data.address, phoneNumber: data.phoneNumber, image:user.image }}
                        validationSchema={reviewSchema}
                        onSubmit={handleUpdate}
                    >
                        <AppFormInput
                            // autoFocus={true}
                            name="name"
                            autoCapitalize="words"
                            autoCorrect={false}
                            style={styles.input}
                            label="Name"
                            mode="outlined"
                            // value={data.name}
                        />

                        <AppFormInput
                            name="email"
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={styles.input}
                            label="Email"
                            mode="outlined"
                            keyboardType='email-address'
                            // value={data.email}
                        />

                        <AppFormInput
                            name="address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={styles.input}
                            label="Address"
                            mode="outlined"
                            // value={data.address}
                        />
                        <AppFormInput
                            name="phoneNumber"
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={styles.input}
                            label="Phone Number"
                            mode="outlined"
                            keyboardType='numeric'
                            // value={data.phoneNumber}
                        />

                        {updateState.updateError && <ErrorMessage error={updateState.updateError} />}

                        <SubmitButton
                            loading={updateState.updateLoader}
                            style={styles.button}
                            color={colors.primary}
                            contentStyle={styles.buttonContent}
                            title="Update"
                        />
                    </AppForm> */}
                    <Formik
                        initialValues={{ name: data.name, email: data.email, address: data.address, phoneNumber: data.phoneNumber }}
                        validationSchema={reviewSchema}
                        onSubmit={handleUpdate}
                    >
                        {(props) => (
                            <View style={{width:'80%', alignSelf:'center'}}>
                                <TextInput label="Name" mode="outlined" onChangeText={props.handleChange('name')} value={props.values.name} onBlur={props.handleBlur('name')} />
                                <Text style={styles.errorText}>{props.touched.name && props.errors.name}</Text>

                                <TextInput label="Email" mode="outlined" keyboardType='email-address' onChangeText={props.handleChange('email')} value={props.values.email} onBlur={props.handleBlur('email')} />
                                <Text style={styles.errorText}>{props.touched.email && props.errors.email}</Text>
                                
                               
                                <TextInput multiline label="Address" mode="outlined" onChangeText={props.handleChange('address')} value={props.values.address} onBlur={props.handleBlur('address')} />
                                <Text style={styles.errorText}>{props.touched.address && props.errors.address}</Text>
                             
                    
                                <TextInput label="Phone number" mode="outlined" onChangeText={props.handleChange('phoneNumber')} value={props.values.phoneNumber} onBlur={props.handleBlur('phoneNumber')} keyboardType='numeric' />
                                <Text style={styles.errorText}>{props.touched.phoneNumber && props.errors.phoneNumber}</Text>

                                <SubmitButton
                                    loading={updateState.updateLoader}
                                    style={styles.button}
                                    color={colors.primary}
                                    contentStyle={styles.buttonContent}
                                    title="Update"
                                />
                            </View>
                        )}
                    </Formik>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modal}
                    onRequestClose={() => {
                        setModal(false);
                    }}
                >
                    <View style={styles.modalView}>
                    <View style={styles.photobuttons}>
                        <Button mode="contained" icon="upload" onPress={handleChoosePhoto}>Upload a photo</Button>
                    </View>
                    <View style={styles.photobuttons}>
                        <Button mode="contained" icon="camera" onPress={handleTakePhoto}>Take a photo</Button>
                    </View>
                    </View>
                </Modal>
                </View>
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
    },
    button: {
        // marginTop: 30,
        margin:35,
        alignSelf: 'center',
    },
    headText: {
        fontSize: 30,
        justifyContent: 'center',
        alignSelf: 'center',
        color: 'purple'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 15
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
        top:10,
        // right:80
    },
    modalView: {
        position:'absolute',
        bottom:1,
        alignSelf:'center',
        width: '100%',
        backgroundColor:"#ffffff"
    },
    photobuttons: {
        padding:15
    },
    errorText: {
        paddingLeft: 40,
        color: 'crimson',
        fontWeight: 'bold'
    },
});

export default EditUserProfileScreen;