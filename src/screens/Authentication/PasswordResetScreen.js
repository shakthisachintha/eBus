import React, { useState } from 'react';
import { StyleSheet, ScrollView, Image, View, ImageBackground, Alert,Text } from 'react-native';
import { Button, TextInput, Card } from 'react-native-paper';
import * as yup from 'yup';
import _ from "lodash";

import { AppForm, AppFormInput, SubmitButton, ErrorMessage } from '../../components/forms';
import colors from '../../utils/colors';
import images from '../../utils/images';
import authAPI from '../../api/auth';

const reviewSchema = yup.object({
    newpassword: yup.string().required('New password is required').min(6),
    confirmpassword: yup.string().required('Confirm password is required')
    .oneOf([yup.ref('newpassword'), null], 'Passwords must match')
});


const PasswordResetScreen = ({ navigation, route }) => {

    const [updateState, setUpdateState] = useState({
        updateError: null,
        updateLoader: false,
    });
    const { id } = route.params;

    const handleUpdate = async (values) => {
        setUpdateState({ updateLoader: true });
        const result = await authAPI.resetpassword(values.id, values.newpassword, values.confirmpassword);
        setUpdateState({ updateLoader: false });
        if (!result.ok) {
            if (result.data) {
                setUpdateState({ updateError: result.data.error });
            }
            else {
                setUpdateState({ updateError: "An unknown error occurred." });
            }
            return;
        }
        if (result.ok){
            Alert.alert(
                'Password Reset',
                'You have successefully reset you password! Please login with the new password',
                [
                  { text: 'OK', onPress: () => navigation.navigate('Login') }
                ],
                { cancelable: false }
              );
        }
    }

    return (
        
        <ScrollView style={styles.scrollView}>
            <Card>
                <Card.Cover source={images.PASSWORD_BACKGROUND} />
            </Card>
                <View style={{justifyContent: "center",alignItems: 'center',}}>
                    <AppForm
                        initialValues={{ newpassword: "" , confirmpassword: "", id:id }}
                        validationSchema={reviewSchema}
                        onSubmit={handleUpdate}
                    >

                        <AppFormInput
                            name="newpassword"
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={styles.input}
                            label="New Password"
                            mode="outlined"
                            secureTextEntry
                        />

                        <AppFormInput
                            name="confirmpassword"
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={styles.input}
                            label="Confirm Password"
                            mode="outlined"
                            secureTextEntry
                        />
                        {updateState.updateError && <ErrorMessage error={updateState.updateError} />}

                        <SubmitButton
                            loading={updateState.updateLoader}
                            style={styles.button}
                            color={colors.primary}
                            contentStyle={styles.buttonContent}
                            title="Reset Password"
                        />
                    </AppForm>
                </View>
        </ScrollView>
        

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    backgroundImage: {
        justifyContent: "center",
        alignItems: 'center',
        resizeMode:"stretch"
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
        width: 200,
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
    }
});

export default PasswordResetScreen;