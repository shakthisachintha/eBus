import { validateYupSchema } from 'formik'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList, ToastAndroid, TouchableHighlight, RefreshControl } from 'react-native'
import { Button, RadioButton, Snackbar } from 'react-native-paper'
import moment from 'moment';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import AppModal from '../../../components/AppModal'
import AppText from '../../../components/AppText'
import AppTextInput from '../../../components/AppTextInput'
import colors from '../../../utils/colors'
import paymentAPI from '../../../api/payment';

const RechargeWalletScreen = ({ route, navigation }) => {

    const [isRefreshing, setisRefreshing] = useState(false);
    const [snackBar, setsnackBar] = useState(false)
    const [visible, setVisible] = useState(false)
    const [paymentMethod, setpaymentMethod] = useState(0);
    const [availableMethods, setAvailableMethods] = useState([{ id: 0, label: "" }])
    const [amount, setAmount] = useState(0);
    const [credits, setCredits] = useState()
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [transactions, setTransactions] = useState([])

    const validateAmount = (amt) => {
        amt >= 50 ? setBtnDisabled(false) : setBtnDisabled(true); setAmount(amt)
    }

    const rechargeSubmit = async (payMethod, amount) => {
        if (!payMethod) return alert("Select payment method.")
        setBtnDisabled(true);
        const result = await paymentAPI.walletRecharge(payMethod, amount);
        if (!result.ok) {
            setBtnDisabled(false);
            alert("Wallet recharge failed. Try again later")
            return
        };
        setsnackBar(true);
        setCredits(result.data.wallet.prepaidBalance);
        setVisible(false);
        setBtnDisabled(false);
    }

    const prepareData = async () => {
        setCredits(route.params.item.token)
        let card_methods = [];
        route.params.payMethods.forEach(method => {
            if (method.method != "Wallet") {
                let temp = {
                    id: method._id,
                    label: `${method.method}   ....${method.cardDetails.cardMask.substr(method.cardDetails.cardMask.length - 4)}`,
                }
                card_methods.push(temp);
            }
        });
        setAvailableMethods(card_methods);
        getTransactions();
    }

    const getTransactions = async () => {
        const result = await paymentAPI.getWalletTransactions();
        if (!result.ok) return alert("Couldn't fetch previous transactions");
        setTransactions(result.data);
    }

    const previousTransRender = (item) => {
        let type = 0;
        item.reason.code == "+wallet" ? type = 1 : type = 0;
        return (
            <>
                <View style={{ backgroundColor: colors.white, paddingHorizontal: 15, paddingVertical: 15 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <AppText style={{ fontSize: 18, fontWeight: "bold" }}>{moment(item.created_at).format('LLL')}</AppText>
                        <AppText style={{ fontSize: 18, fontWeight: "bold", color: type ? colors.success : colors.danger }}>{type ? "+" : "-"}{item.amount.value}</AppText>
                    </View>
                    <View style={{ marginTop: 5 }}>
                        <AppText>Reference - {item._id}</AppText>
                    </View>
                </View>
            </>
        )
    }


    useEffect(() => {
        prepareData();
    }, [route])


    return (
        <>
            <AppModal size={50} modalContentStyle={styles.modalLower} visible={visible} position="bottom" onRequestClose={() => setVisible(false)} onOutTouch={() => { }}>
                <View style={styles.modalContent}>

                    <View style={styles.modalHeader}>
                        <AppText style={styles.modalTitle}>CREDIT RECHARGE</AppText>
                    </View>

                    <View>
                        <View style={styles.modalMargin}>
                            <AppTextInput onChangeText={(value) => validateAmount(value)} placeholder="Amount to recharge minimum LKR 50" icon="cash" keyboardType="decimal-pad" append="LKR" backgroundColor={colors.white} />
                        </View>

                        <AppText style={{ marginVertical: 5, fontSize: 20, color: colors.darkGray }}>Select payment method</AppText>
                        <RadioButton.Group onValueChange={value => setpaymentMethod(value)} value={paymentMethod}>
                            <FlatList
                                data={availableMethods}
                                renderItem={({ item }) => <RadioButton.Item label={item.label} value={item.id} />}
                                keyExtractor={item => item.id.toString()}
                            />
                        </RadioButton.Group>
                        <View style={styles.modalActionButtons}>
                            <Button disabled={btnDisabled} color={colors.success} onPress={() => rechargeSubmit(paymentMethod, amount)} icon="cash" mode="contained">Recharge Now</Button>
                            <Button color={colors.danger} icon="close" mode="contained" onPress={() => setVisible(false)}>Cancel</Button>
                        </View>


                    </View>

                </View>
            </AppModal>


            <FlatList
                ListHeaderComponent={<>
                    <View style={{ alignItems: "center", backgroundColor: colors.white, paddingBottom: 50, paddingTop: 20 }}>

                        <View style={{ marginTop: 10 }}>
                            <AppText style={{ fontSize: 18, fontWeight: "bold" }}> CURRENT CREDIT BALANCE </AppText>
                        </View>
                        <View style={{ marginVertical: 20, borderWidth: 1, borderRadius: 5, borderColor: colors.masterOrange, width: 100, height: 50, justifyContent: "center", alignItems: "center" }}>
                            <AppText style={{ fontSize: 22, fontWeight: "bold" }}>{credits}</AppText>
                        </View>
                        <View style={{ marginTop: 5 }}>
                            <Button onPress={() => setVisible(true)} mode="contained" color={colors.success} contentStyle={{ height: 40 }} > + Top up Credits</Button>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", paddingHorizontal: 10, marginVertical: 15 }}>
                        <AppText style={{ fontWeight: "bold", color: colors.darkGray, fontSize: 14 }}>Note: </AppText>
                        <AppText style={{ color: colors.darkGray, fontSize: 14, paddingRight: 25 }}>If your payment exceed the credit amount, a due amount will be added to the due balance. You will not be able to make any trips
                        if you have a due balance. Due balance will be automatically recovered when you top up the credits.
                </AppText>
                    </View>

                    <View style={{ backgroundColor: colors.silver, paddingVertical: 14, paddingLeft: 10 }}>
                        <AppText style={{ fontWeight: "bold" }}>Past Transactions</AppText>
                    </View>
                </>}
                data={transactions}
                renderItem={({ item }) => previousTransRender(item)}
                keyExtractor={item => item._id}
                refreshControl={<RefreshControl colors={[colors.primary, colors.black, colors.success]} refreshing={isRefreshing} onRefresh={prepareData} progressViewOffset={70} />}

            />


            <Snackbar
                duration={2000}
                onDismiss={() => setsnackBar(false)}
                style={{ zIndex: 100, justifyContent: "center" }}
                visible={snackBar}>
                <MCIcon style={{ marginLeft: 15, marginRight: 20 }} name="check-circle" color={colors.success} size={25} />
                <AppText style={{ fontSize: 20, marginLeft: 15, marginRight: 20 }}>     Payment success</AppText>

            </Snackbar>
        </>
    )
}

export default RechargeWalletScreen

const styles = StyleSheet.create({
    modalContent: {
        padding: 10,
        height: "100%",
        backgroundColor: colors.black,
        opacity: 1
    },
    modalHeader: {

    },
    modalTitle: {
        fontSize: 28,
        fontWeight: "300",
        alignSelf: "center",
        color: colors.gray
    },
    modalMargin: {
        marginVertical: 10
    },
    modalActionButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        opacity: 1,
        marginVertical: 20
    }
})
