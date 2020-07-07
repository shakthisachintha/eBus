import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';

import AppCard from '../../components/AppCard'
import AppText from '../../components/AppText';
import { Button } from 'react-native-paper';
import colors from '../../utils/colors';
import AppIcon from '../../components/AppIcon';

import SideLabelDrawer from '../../components/SideLabelDrawer';
import config from '../../utils/config';
import useAuth from '../../auth/useAuth';
import paymentAPI from '../../api/payment';

const WalletScreen = ({ due, navigation }) => {
    const [payMethods, setPayMethods] = useState(null);
    // const payMethods = [
    //     { id: 1, label: "Primary (xxxx...2147 VISA)" },
    //     { id: 2, label: "(xxxx...2156 MASTER)" },
    //     { id: 25, label: "Credit/Debit Card" },
    // ];

    const { user } = useAuth()

    const paymentParams = {
        URL: "https://sandbox.payhere.lk/pay/preapprove",
        method: "POST",
        first_name: "Shakthi",
        last_name: "Sachintha",
        email: "shakthisachintha@gmail.com",
        phone: "0774345234",
        address: "Shakthi Sachintha " + config.APP_ADDRESS,
        userID: user.id
    }

    const PaymentMethods = async () => {
        const result = await paymentAPI.getPaymentMethods();
        if (!result.ok) return alert('Couldnt fetch payment data');
        setPayMethods(result.data.paymentMethods);
    }

    useEffect(() => {
        PaymentMethods();
    })

    return (
        <View>
            {/* <SideLabelDrawer
                rechargeSubmit={(method, amount) => alert(`${method}, ${amount}`)}
                payMethods={payMethods}
                credit={200}
                enableModal={true}
                backgroundColor={colors.danger}
                position={80}
                IconComponent={() => <Icon style={{ marginLeft: 10 }} name="coins" color={colors.white} size={35} />}>
            </SideLabelDrawer> */}

            {due > 0 && (
                <View style={styles.columnTwo}>
                    <AppText style={styles.columnTitle}> Due Balance </AppText>
                </View>
            )}

            <AppCard title="Add Payment Method" onPress={() => navigation.navigate('PayHereWebView', paymentParams)} style={{ marginVertical: 30 }} IconComponent={<AppIcon name="card" backgroundColor={'#5415fe'} />} />
            <FlatList
                data={payMethods}
                renderItem={({ item }) => <Text style={{ fontSize: 24, backgroundColor: colors.mediumGray, padding: 15, marginVertical: 5 }}>{item.method} {item.cardDetails.cardMask}</Text>}
                keyExtractor={item => item._id}
            />
        </View>
    )
}

export default WalletScreen

const styles = StyleSheet.create({

    creditBalance: {
        fontSize: 28,
        color: colors.white,
        fontWeight: "bold",
        alignSelf: "center",

    },
    columnOne: {
        paddingRight: 10,
        paddingVertical: 10,
        paddingLeft: 5,
        marginVertical: 10,
        backgroundColor: colors.primary,
        borderRadius: 50,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderColor: colors.white,
        borderWidth: 3,
        borderLeftWidth: 0,
        shadowColor: colors.secondary,
        shadowOffset: {
            width: 100,
            height: 12,
        },
        shadowOpacity: 0.7,
        shadowRadius: 82,

        elevation: 12,
    },
    columnTwo: {
        padding: 10,
        alignItems: "flex-end",
        backgroundColor: "yellow",
        width: "50%"
    },
    columnTitle: {
        fontSize: 22,
        fontWeight: "bold",
        textTransform: "uppercase"
    },
    name: {
        fontWeight: "bold",
        fontSize: 24,
        textTransform: "uppercase"
    }
})