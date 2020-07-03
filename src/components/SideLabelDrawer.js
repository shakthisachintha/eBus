import React, { useState } from 'react'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { StyleSheet, Text, Vibration, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper';

import colors from '../utils/colors';
import AppText from './AppText';
import AppModal from './AppModal';
import AppTextInput from './AppTextInput';


const SideLabelDrawer = ({ credit, IconComponent, enableModal = false, titleColor = "white", backgroundColor, position }) => {
    const [modalVisible, setModalVisible] = useState(false)

    return (
        <>
            {enableModal && (
                <AppModal onOutTouch={() => setModalVisible(false)} modalContentStyle={styles.modalLower} position="bottom" size={50} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <AppText style={{ fontSize: 35, fontWeight: "bold", alignSelf: "center", color: "dodgerblue" }}>CREDIT RECHARGE</AppText>
                            <View style={{ opacity: 1, flexDirection: "row", justifyContent: "space-between", marginVertical: 15 }}>
                                <Text style={{ fontSize: 20, textTransform: "uppercase", color: colors.darkGray }}>
                                    available balance
                                </Text>
                                <Text style={{ fontSize: 20, fontWeight: "bold", alignSelf: "flex-start", textTransform: "uppercase", color: colors.darkGray }}>
                                    LKR {credit}
                                </Text>
                            </View>
                        </View>
                        {/* Modal Body */}
                        <View>
                            <AppTextInput placeholderTextColor="purple" placeholder="Amount to recharge" icon="coin" keyboardType="decimal-pad" append="LKR" backgroundColor={colors.white}></AppTextInput>
                        </View>

                        <View style={{ ...styles.modalActionButtons, opacity: 1, marginVertical: 20 }}>
                            <Button color={colors.success} icon="cash" mode="contained">Recharge Now</Button>
                            <Button color={colors.danger} icon="close" mode="contained" onPress={() => setModalVisible(false)}>Cancel</Button>
                        </View>
                    </View>
                </AppModal>
            )}


            <View style={[styles.container, { top: position }]}>
                <Swipeable
                    friction={3.6}
                    overshootFriction={4}
                    renderLeftActions={() => { return (<View style={{ width: 1 }}><Text style={styles.creditBalance}> 1500</Text></View>) }}
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
        marginBottom: 10,

    },
    modalActionButtons: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
})
