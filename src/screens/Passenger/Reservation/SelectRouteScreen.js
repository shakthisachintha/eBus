import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import * as yup from 'yup';
import _ from "lodash";

import { AppForm, AppFormInput, SubmitButton, ErrorMessage } from '../../../components/forms';
import useAuth from '../../../auth/useAuth';
import colors from '../../../utils/colors';
import { FlatList } from 'react-native-gesture-handler';

const reviewSchema = yup.object({
    destinantion: yup.string().required('Destination is required')
});

const SelectRouteScreen = () => {

    const { user } = useAuth();
    const [updateState, setUpdateState] = useState({
        updateError: null,
        updateLoader: false,
    });
    const [buses, setBuses]= useState([
        { number: 'NA-2233', id:'1'},
        { number: 'NA-2244', id:'2'},
        { number: 'NA-2255', id:'3'},
        { number: 'NA-6633', id:'4'},
        { number: 'NA-7733', id:'5'},
        { number: 'NA-8833', id:'6'},
        { number: 'NA-9933', id:'7'},
    ]);

    const pressHandler = (id) => {
        console.log(id);
    }

    const handleUpdate = async (values) => {
        // setUpdateState({ updateLoader: true });
        // const result = await userAPI.updatePassword(_.pick(values, ["oldpassword", "newpassword", "confirmpassword"]));
        // setUpdateState({ updateLoader: false });
        // if (!result.ok) {
        //     if (result.data) {
        //         setUpdateState({ updateError: result.data.error });
        //     }
        //     else {
        //         setUpdateState({ updateError: "An unknown error occurred." });
        //         console.log(result);
        //     }
        //     return;
        // }
        // if (result.ok){
        //     Alert.alert(
        //         'Password Change',
        //         'You have successefully changed you password!',
        //         [
        //           { text: 'OK', onPress: () => navigation.navigate('Profile') }
        //         ],
        //         { cancelable: false }
        //       );
        // }
    }

    return (
        <View style={styles.container}>
            <AppForm
                initialValues={{ destinantion: "" }}
                validationSchema={reviewSchema}
                onSubmit={handleUpdate}
            >
                <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                <AppFormInput
                    name="destinantion"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.input}
                    label="Destination"
                    mode="outlined"
                />
                <SubmitButton
                    loading={updateState.updateLoader}
                    style={styles.button}
                    color={colors.primary}
                    title="Search"
                />
                </View>
                {updateState.updateError && <ErrorMessage error={updateState.updateError} />}
            </AppForm>

            
            <FlatList
                keyExtractor={(item) => item.id}
                data={buses}
                renderItem={({item}) => (
                <TouchableOpacity onPress={() => pressHandler(item.id)}>
                    <Text style={styles.item}>{item.number}</Text>
                </TouchableOpacity>
                )}
            />
            
        </View>
    )
}

export default SelectRouteScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        height: 45,
        marginTop: 20,
        width: 300
    },
    button: {
        marginTop: 20,
        alignSelf: 'center',
    },
    buttonContent: {
        marginTop: 20,
        height: 45,
        width: 100,
    },
    item: {
        marginTop:24,
        padding:30,
        backgroundColor:'blue',
        fontSize:18
    }
})
