import React from 'react'
import { Alert, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import ENIcon from 'react-native-vector-icons/Entypo';
import AppText from '../../../components/AppText'
import Card from '../../../components/Card'
import colors from '../../../utils/colors'
import paymentAPI from '../../../api/payment';

const EditCardScreen = ({ route, navigation }) => {

    const handleDelete = (methodID) => {
        Alert.alert("Remove Payment Method", "Are you sure you want to remove this payment method?", [
            {
                text: "Yes",
                onPress: () => deletePaymentMethod(methodID)
            },
            {
                text: "No",
                onPress: () => { return },
                style: "cancel"
            }
        ], { cancelable: true });
    }
    const deletePaymentMethod = async (methodID) => {
        const result = await paymentAPI.removePaymentMethod(methodID);
        if (!result.ok) return alert("Couldn't remove payment method");
        navigation.navigate("Wallet", { item: null });
    }

    return (
        <>
            <View style={{ backgroundColor: "white", marginTop: 15, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 25, paddingVertical: 15 }}>
                <View>
                    <AppText style={{ fontSize: 18, fontWeight: "bold", marginBottom: 5 }}>Card Number</AppText>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <ENIcon style={{ marginRight: 5 }} color={colors.black} solid size={18} name="dots-three-horizontal" />
                        <AppText style={{ fontSize: 18 }}>
                            {route.params.item.cardDetails.cardMask.substr(route.params.item.cardDetails.cardMask.length - 4)}
                        </AppText>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={() => handleDelete(route.params.item._id)}>
                    <View>
                        <Icon name="trash" size={20} color={colors.danger} />
                    </View>
                </TouchableWithoutFeedback>
            </View>


            <View style={{ padding: 15 }}>
                <AppText style={{ fontSize: 14, color: colors.darkGray }}>*Note : No need to worry. You can remove the payment methods anytime, but you can add them back anytime.</AppText>
            </View>
        </>


    )
}

export default EditCardScreen

const styles = StyleSheet.create({})
