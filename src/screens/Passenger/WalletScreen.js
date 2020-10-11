import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableWithoutFeedback, RefreshControl, TouchableHighlight, ToastAndroid } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ENIcon from 'react-native-vector-icons/Entypo';

import AppCard from '../../components/AppCard'
import AppText from '../../components/AppText';
import colors from '../../utils/colors';
import AppIcon from '../../components/AppIcon';

import useAuth from '../../auth/useAuth';
import paymentAPI from '../../api/payment';
import AppModal from '../../components/AppModal';


const WalletScreen = ({ navigation, route }) => {
    const [visible, setVisible] = useState(false)
    const [payMethods, setPayMethods] = useState(null);
    const [wallet, setWallet] = useState({ credit: 0, due: 0 });
    const [isRefreshing, setIsRefreshing] = useState(false)
    const { user } = useAuth();

    const getWallet = async () => {
        const result = await paymentAPI.getWallet();
        setWallet({ credit: result.data.prepaidBalance, due: result.data.debt })
    }

    const fetchWalletData = async () => {
        setIsRefreshing(true);
        getWallet();
        getPaymentMethods();
        setIsRefreshing(false)
    }

    const getPaymentMethods = async () => {
        const result = await paymentAPI.getPaymentMethods();
        if (!result.ok) return alert("Couldn't fetch paymentmethods");
        setPayMethods(result.data.paymentMethods);
    }

    const setPrimaryMethod = async (item) => {
        setIsRefreshing(true);
        let methodID = item.method == "Wallet" ? "wallet" : item._id;
        console.log(methodID);
        const result = await paymentAPI.setPrimaryMethod(methodID);
        setIsRefreshing(false);
        if (!result.ok) return alert("Couldn't set primary payment method");
        ToastAndroid.show("Primary payment method saved.", ToastAndroid.SHORT);
        getPaymentMethods();
    }

    const editPaymentMethod = async (item) => {
        if (item.method == "Wallet") {
            navigation.navigate("rechargeWallet", { title: "Recharge Credit Balance", item })
        } else {
            navigation.navigate("editCard", { title: item.method, item })
        }

    }

    const CreditBalanceListComponent = (item) => {
        return (
            <TouchableWithoutFeedback onPress={() => editPaymentMethod(item)}>
                <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
                    <TouchableWithoutFeedback onPress={() => setPrimaryMethod(item)}>
                        <MCIcon style={{ marginLeft: 15, marginRight: 20 }} name={item.isPrimary ? "check-circle" : "circle-outline"} color={item.isPrimary ? colors.success : colors.mediumGray} size={25} />
                    </TouchableWithoutFeedback>

                    <Icon color="orange" size={28} name="coins" />
                    <AppText style={{ fontSize: 22, fontWeight: "bold", marginVertical: 15, marginLeft: 20 }}>Credits LKR {item.token} </AppText>
                    <View style={{ flex: 1, paddingRight: 15, alignItems: "flex-end", justifyContent: "center" }}>
                        <Icon size={22} name="chevron-right" color={colors.darkGray} />
                    </View>


                </View>
            </TouchableWithoutFeedback>
        )

    }

    const visaMasterComponent = (item) => {
        return (
            <TouchableWithoutFeedback onPress={() => editPaymentMethod(item)}>
                <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
                    <TouchableWithoutFeedback onPress={() => setPrimaryMethod(item)}>
                        <MCIcon style={{ marginLeft: 15, marginRight: 20 }} name={item.isPrimary ? "check-circle" : "circle-outline"} color={item.isPrimary ? colors.success : colors.mediumGray} size={25} />
                    </TouchableWithoutFeedback>

                    <Icon color={item.method == "VISA" ? colors.visaBlue : colors.masterOrange} solid size={28} name={item.method == "VISA" ? "cc-visa" : "cc-mastercard"} />
                    <ENIcon style={{ marginLeft: 20, marginRight: 5 }} color={colors.black} solid size={20} name="dots-three-horizontal" />
                    <AppText style={{ fontSize: 22, fontWeight: "bold", marginVertical: 15 }}>{item.cardDetails.cardMask.substr(item.cardDetails.cardMask.length - 4)}</AppText>
                    <View style={{ flex: 1, paddingRight: 15, alignItems: "flex-end", justifyContent: "center" }}>
                        <Icon size={22} name="chevron-right" color={colors.darkGray} />
                    </View>
                </View>
            </TouchableWithoutFeedback>)

    }

    const paymentMethodComponent = (item) => {
        if (item.method == "Wallet") return CreditBalanceListComponent(item);
        return visaMasterComponent(item);
    }

    useEffect(() => {
        fetchWalletData();
    }, [])
    useEffect(() => {
        fetchWalletData();
    }, [route])

    return (
        <>
            <AppModal visible={visible} position="top" onRequestClose={() => setVisible(false)} onOutTouch={() => setVisible(false)}>

            </AppModal>
            <View>
                <FlatList
                    ListHeaderComponent={
                        <>
                            <View style={styles.creditFrame}>
                                <View style={{ flex: 1, justifyContent: "center", alignItems: 'center', paddingVertical: 5 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Icon color="orange" size={22} name="coins" />
                                    </View>

                                    <AppText style={{ color: "orange", fontWeight: "bold", fontSize: 24, marginVertical: 5 }}>
                                        {`LKR ${wallet.credit}`}
                                    </AppText>
                                    <AppText style={{ fontWeight: "bold", color: 'black', fontSize: 18 }}>
                                        Credit Balance
                                </AppText>
                                </View>

                                {wallet.due > 0 && (<View style={{ flex: 1, justifyContent: "center", borderLeftWidth: 0.5, borderLeftColor: "gray", alignItems: 'center', }}>

                                    <Icon color={colors.danger} style={{ marginLeft: 5 }} size={22} name="minus-circle" />
                                    <AppText style={{ fontWeight: "bold", color: colors.danger, fontSize: 24, marginVertical: 5 }}>
                                        {`LKR ${wallet.due}`}
                                    </AppText>
                                    <AppText style={{ fontWeight: "bold", color: 'black', fontSize: 18 }}>
                                        Due Amount
                                </AppText>
                                </View>)}
                            </View>
                            <View style={{ marginVertical: 10 }}>
                                <AppCard title="Add Payment Method" onPress={() => navigation.navigate('PayHereWebView', user)} IconComponent={<AppIcon name="credit-card-plus" backgroundColor={'#5415fe'} />} />
                            </View>
                        </>
                    }
                    data={payMethods}
                    renderItem={({ item }) => paymentMethodComponent(item)}
                    keyExtractor={item => item._id}
                    ItemSeparatorComponent={() => <View style={{ marginVertical: 2, borderBottomColor: colors.darkGray, opacity: 0.3, borderBottomWidth: 0.8, marginHorizontal: 15 }} />}
                    refreshControl={<RefreshControl colors={[colors.primary, colors.black, colors.success]} refreshing={isRefreshing} onRefresh={fetchWalletData} progressViewOffset={70} />}
                />
            </View>
        </>
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

    creditFrame: {
        shadowOffset: {
            width: 100,
            height: 12,
        },
        shadowOpacity: 0.7,
        shadowRadius: 82,

        elevation: 12,
        opacity: 0.9,
        flexDirection: 'row',
        paddingVertical: 10,
        backgroundColor: "white",
        marginVertical: 15,
        marginHorizontal: 10, borderRadius: 10
    },

})