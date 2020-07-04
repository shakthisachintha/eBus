import React, { useState } from 'react'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { StyleSheet, Text, Vibration, View, FlatList } from 'react-native'
import { Button, RadioButton } from 'react-native-paper';

import colors from '../utils/colors';
import AppText from './AppText';
import AppModal from './AppModal';
import AppTextInput from './AppTextInput';


const SideLabelDrawer = ({ backgroundColor, credit, enableModal = false, IconComponent, position, payMethods, rechargeSubmit, titleColor = "white" }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [paymentMethod, setpaymentMethod] = useState(1);
    const [amount, setAmount] = useState(0);
    const [btnDisabled, setBtnDisabled] = useState(true);



    return (
        <>
            {enableModal && (
                <AppModal onOutTouch={() => setModalVisible(false)} modalContentStyle={styles.modalLower} position="bottom" size={75} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                    <View style={styles.modalContent}>

                        <View style={styles.modalHeader}>
                            <AppText style={styles.modalTitle}>CREDIT RECHARGE</AppText>
                            <View style={{ opacity: 1, flexDirection: "row", justifyContent: "space-between", marginTop: 30, marginBottom: 20 }}>
                                <Text style={{ fontSize: 20, textTransform: "uppercase", color: colors.darkGray }}>
                                    available balance
                                </Text>
                                <Text style={{ fontSize: 20, fontWeight: "bold", alignSelf: "flex-start", textTransform: "uppercase", color: colors.darkGray }}>
                                    LKR {credit}
                                </Text>
                            </View>
                        </View>

                        {/* Modal Body */}

                        <View style={styles.modalForm}>
                            <View style={styles.modalMargin}>
                                <AppTextInput onChangeText={(amount) => { amount >= 50 ? setBtnDisabled(false) : setBtnDisabled(true); setAmount(amount) }} placeholder="Amount to recharge minimum LKR 50" icon="coin" keyboardType="decimal-pad" append="LKR" backgroundColor={colors.white}></AppTextInput>
                            </View>

                            <AppText style={{ marginVertical: 5, fontSize: 20, textTransform: "uppercase", color: colors.darkGray }}>Payment method</AppText>
                            <RadioButton.Group onValueChange={value => setpaymentMethod(value)} value={paymentMethod}>
                                <FlatList
                                    data={payMethods}
                                    renderItem={({ item }) => <RadioButton.Item label={item.label} value={item.id} />}
                                    keyExtractor={item => item.id.toString()}
                                />
                            </RadioButton.Group>
                            <View style={styles.modalActionButtons}>
                                <Button disabled={btnDisabled} color={colors.success} onPress={() => rechargeSubmit(paymentMethod, amount)} icon="cash" mode="contained">Recharge Now</Button>
                                <Button color={colors.danger} icon="close" mode="contained" onPress={() => setModalVisible(false)}>Cancel</Button>
                            </View>
                        </View>
                    </View>
                </AppModal>
            )}

            <View style={[styles.container, { top: position }]}>
                <Swipeable
                    friction={3.6}
                    overshootFriction={4}
                    renderLeftActions={() => { return (<View style={{ width: 1 }}><Text style={styles.creditBalance}>{credit}</Text></View>) }}
                    onSwipeableLeftOpen={() => { enableModal && Vibration.vibrate(15, false); setModalVisible(true) }}
                >
                    <View style={[styles.drawer, { backgroundColor: backgroundColor }]}>
                        <AppText style={{ ...styles.creditBalance, color: titleColor }}>
                            LKR {credit}
                        </AppText>
                        {IconComponent && <IconComponent />}
                    </View>
                </Swipeable>
            </View>
        </>
    )
}

export default SideLabelDrawer

const styles = StyleSheet.create({
    container: {
        zIndex: 1,
        top: 60,
        position: "absolute",
    },
    creditBalance: {
        fontSize: 30,
        color: colors.white,
        fontWeight: "bold",
        alignSelf: "center",
    },
    drawer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        width: 265,
        left: -210,
        paddingRight: 10,
        paddingVertical: 10,
        paddingLeft: 5,
        marginVertical: 10,
        backgroundColor: colors.secondary,
        borderRadius: 50,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderColor: colors.white,
        borderWidth: 3,
        borderLeftWidth: 0,
        shadowColor: colors.black,
        shadowOffset: {
            width: 100,
            height: 12,
        },
        shadowOpacity: 0.7,
        shadowRadius: 82,
        elevation: 12,
    },
    modalContent: {
        padding: 10,
        height: "100%",
        backgroundColor: colors.black,
        opacity: 1
    },
    modalHeader: {

    },
    modalTitle: {
        fontSize: 35,
        fontWeight: "bold",
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
