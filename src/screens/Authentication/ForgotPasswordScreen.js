import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Button, TextInput, Card } from 'react-native-paper';
import images from '../../utils/images';
import { AppForm, AppFormInput, SubmitButton, ErrorMessage } from '../../components/forms';
import * as yup from 'yup';
import colors from '../../utils/colors';
import authAPI from '../../api/auth';

const reviewSchema = yup.object({
    email: yup.string().required('Email Address is required').email().min(6)
});

const ForgotPasswordScreen = ({ navigation }) => {

    const [updateState, setUpdateState] = useState({
        updateError: null,
        updateLoader: false,
    });

    const handleUpdate = async ({email}) => {
        setUpdateState({ updateLoader: true });
        const result = await authAPI.forgetpassword(email);
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
                'Verification Code',
                `A verification code successfully sent to ${result.data.email}`,
                [
                  { text: 'OK', onPress: () => navigation.navigate('LinkVerify', { email: result.data.email }) }
                ],
                { cancelable: false }
              );
        }
    }
    return (
        <ScrollView style={styles.container}>

            <Card>
                <Card.Cover source={images.FORGOT_PASSWORD_BACKROUND} />
            </Card>
            <Text style={{ color: 'black', justifyContent: 'center', fontSize: 18, alignSelf: 'center', marginTop: 10, textAlign:'center' }}>To reset your password ,You need to enter your registered Email address. We will sent the verification code to your email address</Text>
            <View style={{ paddingTop:20 ,justifyContent: "center",alignItems: 'center',}}>
            <AppForm
                    initialValues={{ email: ""}}
                    validationSchema={reviewSchema}
                    onSubmit={handleUpdate}
                >
                    <AppFormInput
                        // autoFocus={true}
                        name="email"
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={styles.input}
                        label="Email address"
                        mode="outlined"
                        keyboardType='email-address'
                    />

                    {updateState.updateError && <ErrorMessage error={updateState.updateError} />}

                    <SubmitButton
                        loading={updateState.updateLoader}
                        style={styles.button}
                        color={colors.primary}
                        contentStyle={styles.buttonContent}
                        title="Send Link"
                        icon="email-outline"
                    />
                </AppForm>
                </View>
            {/* <TextInput
                style={{ height: 40, marginTop: 10, width: 300, alignSelf: 'center' }}
                placeholder="Email"
                label="Email"
                mode="outlined"
            />

            <Button onPress={() => navigation.navigate("LinkVerify")}
                icon="share"
                mode="contained"
                style={{ width: 300, alignSelf: 'center', marginTop: 20, backgroundColor: 'purple' }}>
                Send
            </Button> */}


        </ScrollView>
    );
}

const styles = StyleSheet.create({
container: {
    flex: 1,
},
button: {
    marginTop: 20,
    alignSelf: 'center',
    marginBottom: 40
},
input: {
    height: 45,
    width: 300
}
});

export default ForgotPasswordScreen;