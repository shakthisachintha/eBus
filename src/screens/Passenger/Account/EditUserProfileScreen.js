import React, { useState } from 'react';
import { StyleSheet, ScrollView, Image, View, Modal, Alert } from 'react-native';
import * as yup from 'yup';
import { IconButton, Colors, Button } from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';
import _ from "lodash";

import { AppForm, AppFormInput, SubmitButton, ErrorMessage } from '../../../components/forms';
import colors from '../../../utils/colors';
import useAuth from '../../../auth/useAuth';
import userAPI from '../../../api/user';

const reviewSchema = yup.object({
    name: yup.string().required().label("Name"),
    email: yup.string().required().email().label("Email"),
    address: yup.string(),
    number: yup.string().max(10)
});


const EditUserProfileScreen = ({ navigation }) => {

    const { user } = useAuth();
    const [updateState, setUpdateState] = useState({
        updateError: null,
        updateLoader: false,
    });
    const [modal, setModal] = useState(false);
    const [photo, setphoto] = useState(null);

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
        const result = await userAPI.updateDetails(_.pick(values, ["name", "email", "address", "number","id"]));
        setUpdateState({ updateLoader: false });
        if (!result.ok) {
            if (result.data) {
                setUpdateState({ updateError: result.data.error });
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
                  { text: 'OK', onPress: () => navigation.navigate('Profile') }
                ],
                { cancelable: false }
              );
        }
    }

    return (
        
        <ScrollView style={styles.container}>
            {/* <ImageBackground source={images.LOGING_BACKGROUND} style={styles.backgroundImage} > */}
                <Image style={styles.avatar} source={{ uri : user.image }} />
                <IconButton
                    icon="camera-account"
                    color={Colors.red500}
                    size={30}
                    onPress={() => setModal(true)}
                    style={{ position: 'absolute', marginTop: 60, marginLeft: 250 }}
                />
                <View style={{paddingTop:130 ,justifyContent: "center",alignItems: 'center',}}>
                    <AppForm
                        initialValues={{ name: user.name , email: user.email, address: user.address, number: user.number, image:user.image, id:user.id }}
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
                            // value={user.id}
                        />

                        <AppFormInput
                            name="email"
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={styles.input}
                            label="Email"
                            mode="outlined"
                            keyboardType='email-address'
                            // value
                        />

                        <AppFormInput
                            name="address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={styles.input}
                            label="Address"
                            mode="outlined"
                            // value
                        />
                        <AppFormInput
                            name="number"
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={styles.input}
                            label="Phone Number"
                            mode="outlined"
                            keyboardType='numeric'
                            // value
                        />

                        {updateState.updateError && <ErrorMessage error={updateState.updateError} />}

                        <SubmitButton
                            loading={updateState.updateLoader}
                            style={styles.button}
                            color={colors.primary}
                            contentStyle={styles.buttonContent}
                            title="Update"
                        />
                    </AppForm>
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
            {/* </ImageBackground> */}
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
    }
});

export default EditUserProfileScreen;