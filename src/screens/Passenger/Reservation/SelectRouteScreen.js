import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import * as yup from 'yup';
import _ from "lodash";

import { AppForm, AppFormInput, SubmitButton, ErrorMessage } from '../../../components/forms';
import useAuth from '../../../auth/useAuth';
import colors from '../../../utils/colors';
import { FlatList } from 'react-native-gesture-handler';
import bookingAPI from '../../../api/reservation';

const reviewSchema = yup.object({
    begining: yup.string().required('Begining is required'),
    destination: yup.string().required('Destination is required')
});

const SelectRouteScreen = ({navigation}) => {

    const { user } = useAuth();
    const [updateState, setUpdateState] = useState({
        updateError: null,
        updateLoader: false,
    });
    const [buses, setBuses]= useState([]);

    const [loading, setLoading] = useState(true);
    const [busCount, setBusCount] = useState(true);

    const pressHandler = (id) => {
        navigation.navigate('SeatSelectionScreen', { id: id });
        console.log(id);
    }

    const handleUpdate = async (values) => {
        setLoading(false);
        setUpdateState({ updateLoader: true });
        console.log(_.pick(values, ["begining", "destination"]));
        const result = await bookingAPI.findBus(_.pick(values, ["begining", "destination"]));
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
            if(result.data.length>0){
                setBusCount(false);
            }
            if(result.data.length==0){
                setBusCount(true);
            }
            setBuses(result.data);
            console.log(result.data.length);
            console.log(result.data);
        }
    }

    return (
        <View style={styles.container}>
            <AppForm
                initialValues={{ begining:"", destination: "" }}
                validationSchema={reviewSchema}
                onSubmit={handleUpdate}
            >
                <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                <View style={{flexDirection:'column', justifyContent:'center'}}>
                <AppFormInput
                    name="begining"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.input}
                    label="Begining"
                    mode="outlined"
                />
                <AppFormInput
                    name="destination"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.input}
                    label="Destination"
                    mode="outlined"
                />
                </View>
                <SubmitButton
                    loading={updateState.updateLoader}
                    style={styles.button}
                    color={colors.primary}
                    title="Search"
                />
                </View>
                {updateState.updateError && <ErrorMessage error={updateState.updateError} />}
            </AppForm>

            {loading ? 
                <ActivityIndicator size="large" color="#0000ff" />
            :
                <View>
                {busCount ?
                    <View><Text style={styles.search}>No Buses Found!!!</Text></View>
                :
                    <FlatList
                        keyExtractor={(item) => item._id}
                        data={buses}
                        renderItem={({item}) => (
                        <TouchableOpacity onPress={() => pressHandler(item._id)}>
                            <Text style={styles.item}>{item.busNo}</Text>
                        </TouchableOpacity>
                        )}
                    />
                }
                </View>
            }
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
    },
    search: {
        marginTop:40,
        textAlign:'center',
        fontSize:24,
        fontWeight:'bold'
    },
})
