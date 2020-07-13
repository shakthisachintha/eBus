import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Button, TextInput, Card } from 'react-native-paper';
import images from '../../utils/images';
import { AppForm, AppFormInput, SubmitButton, ErrorMessage } from '../../components/forms';
import * as yup from 'yup';
import colors from '../../utils/colors';
import authAPI from '../../api/auth';

const reviewSchema = yup.object({
    code: yup.number().required('Verification code is required').min(6)
});

const VerifyCodeScreen = ({ navigation }) => {

    const [updateState, setUpdateState] = useState({
        updateError: null,
        updateLoader: false,
    });

    const handleSubmit = async ({code}) => {
        setUpdateState({ updateLoader: true });
        const result = await authAPI.verify(code);
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
                'The verification code matches!',
                [
                  { text: 'OK', onPress: () => navigation.navigate('PasswordReset', { id: result.data._id })}
                ],
                { cancelable: false }
              );
        }
    }
    return (
        <ScrollView style={styles.container}>

            <Card>
                <Card.Cover source={images.VERIFY_BACKGROUND} />
            </Card>
            <Text style={{ color: 'grey', justifyContent: 'center', fontSize: 16, alignSelf: 'center', marginTop: 10 }}>To recover your Password ,You need to Enter</Text>
            <Text style={{ color: 'grey', justifyContent: 'center', fontSize: 16, alignSelf: 'center' }}>your registration Email address.We will sent the </Text>
            <Text style={{ color: 'grey', justifyContent: 'center', fontSize: 16, alignSelf: 'center' }}>Recovery code to your Email</Text>
            <View style={{ paddingTop:20 ,justifyContent: "center",alignItems: 'center',}}>
            <AppForm
                    initialValues={{ code: ""}}
                    validationSchema={reviewSchema}
                    onSubmit={handleSubmit}
                >
                    <AppFormInput
                        // autoFocus={true}
                        name="code"
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={styles.input}
                        label="Veification Code"
                        mode="outlined"
                        keyboardType='numeric'
                    />

                    {updateState.updateError && <ErrorMessage error={updateState.updateError} />}

                    <SubmitButton
                        loading={updateState.updateLoader}
                        style={styles.button}
                        color={colors.primary}
                        contentStyle={styles.buttonContent}
                        title="Verify"
                        icon="check-circle-outline"
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

export default VerifyCodeScreen;