import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity, Icon } from 'react-native';
import { Button, TextInput, Card } from 'react-native-paper';
import images from '../../../utils/images';
import { AppForm, AppFormInput, SubmitButton, ErrorMessage } from '../../../components/forms';
import * as yup from 'yup';
import colors from '../../../utils/colors';

const reviewSchema = yup.object({
    code: yup.number().required('Verification code is required').min(6)
});

const SelectDateScreen = ({ navigation, route }) => {

    const [updateState, setUpdateState] = useState({
        updateError: null,
        updateLoader: false,
    });
    const [count, setCount] = useState(1);

    // const onIncrement = () => {
    //     this.setState({
    //       counter: this.state.counter + 1,
    //     })
    // };

    // const [counter, setCounter]= useState({
    //     counter:1,
    //     setCounter:counter+1
    // });
    
    const { id } = route.params;

    // const handleSubmit = async ({code, email}) => {
    //     setUpdateState({ updateLoader: true });
    //     const result = await authAPI.verify(code,email);
    //     setUpdateState({ updateLoader: false });
    //     if (!result.ok) {
    //         if (result.data) {
    //             setUpdateState({ updateError: result.data.error });
    //         }
    //         else {
    //             setUpdateState({ updateError: "An unknown error occurred." });
    //         }
    //         return;
    //     }
    //     if (result.ok){
    //         Alert.alert(
    //             'Verification Code',
    //             'The verification is successful! Please enter a new password to proceed!',
    //             [
    //               { text: 'OK', onPress: () => navigation.navigate('PasswordReset', { id: result.data._id })}
    //             ],
    //             { cancelable: false }
    //           );
    //     }
    // }
    return (
        <ScrollView style={styles.container}>

            
            <Text style={{ color: 'black', justifyContent: 'center', fontSize: 18, marginTop: 10, textAlign:'center' }}><Text style={{ fontWeight: 'bold' }}>Bus id new: {id}</Text></Text>
            <View style={{ paddingTop:20 ,justifyContent: "center",alignItems: 'center',}}>
            <AppForm
                    initialValues={{ code: ""}}
                    validationSchema={reviewSchema}
                    // onSubmit={handleSubmit}
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

    
                <View style={styles.container}>
                    {/* <Text style={styles.counter}>Counter: {counter}</Text>
                    <TouchableOpacity 
                    style={styles.floatingButton}
                    onPress={onIncrement}
                    >
                    <Icon name="plus" size={20} color="#900" />
                    </TouchableOpacity> */}
                      <Button mode="contained" onPress={() => setCount(count + 1)}>
                        Click me
                    </Button>
                    <Text>Count :{count}</Text>
                </View>

                </View>
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

export default SelectDateScreen;