import React, { useState } from 'react';
import { Text, StyleSheet, ScrollView, ImageBackground, Image } from 'react-native';
import * as yup from 'yup';
import _ from "lodash";

import { AppForm, AppFormInput, SubmitButton, ErrorMessage } from '../../components/forms';
import colors from '../../utils/colors';
import images from '../../utils/images';
import userAPI from '../../api/user';
import useAuth from '../../auth/useAuth';

const reviewSchema = yup.object({
    name: yup.string().required().label("Name"),
    email: yup.string().required().email().label("Email"),
    password: yup.string().required('Password is required').min(6),
    confirmpassword: yup.string().required('Confirm password is required')
        .oneOf([yup.ref('password'), null], 'Passwords must match')
});


const RegistrationScreen = ({ navigation }) => {

    const auth = useAuth();

    const [registerState, setRegisterState] = useState({
        regError: null,
        regLoader: false,
    });

    const handleRegister = async (user) => {
        setRegisterState({ regLoader: true });
        const result = await userAPI.register(_.pick(user, ["name", "email", "password"]));
        setRegisterState({ regLoader: false });
        if (!result.ok) {
            if (result.data) setRegisterState({ regError: result.data.error });
            else {
                setRegisterState({ regError: "An unknown error occurred." });
                console.log(result);
            }
            return;
        }
        auth.logIn(result.headers['x-auth-token']);
    }

    return (
        <ScrollView style={styles.scrollView}>
            <ImageBackground source={images.LOGING_BACKGROUND} style={styles.backgroundImage} >
                <Image
                    style={styles.topImage}
                    source={images.LOGO}
                    resizeMode="contain"
                />
                <Text style={styles.headText}>REGISTER</Text>
                <AppForm
                    initialValues={{ name: "", email: "", password: "", confirmpassword: "" }}
                    validationSchema={reviewSchema}
                    onSubmit={handleRegister}
                >
                    <AppFormInput
                        autoFocus={true}
                        name="name"
                        autoCapitalize="words"
                        autoCorrect={false}
                        style={styles.input}
                        label="Name"
                        mode="outlined"
                    />

                    <AppFormInput
                        name="email"
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={styles.input}
                        label="Email"
                        mode="outlined"
                    />

                    <AppFormInput
                        name="password"
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry
                        style={styles.input}
                        label="Password"
                        mode="outlined"
                    />
                    <AppFormInput
                        name="confirmpassword"
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry
                        style={styles.input}
                        label="Confirm Password"
                        mode="outlined"
                    />

                    {registerState.regError && <ErrorMessage error={registerState.regError} />}

                    <SubmitButton
                        loading={registerState.regLoader}
                        style={styles.button}
                        color={colors.primary}
                        contentStyle={styles.buttonContent}
                        title="Register"
                    />
                </AppForm>
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
        alignSelf: 'auto',
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
});

export default RegistrationScreen;