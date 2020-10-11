import React, { useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import AppModal from '../../../components/AppModal'
import AppText from '../../../components/AppText'


const RechargeWalletScreen = ({ route, navigation }) => {
    const [visible, setVisible] = useState(false)
    const payMethods = [
        { id: 1, label: "Primary (xxxx...2147 VISA)" },
        { id: 2, label: "(xxxx...2156 MASTER)" },
        { id: 25, label: "Credit/Debit Card" },
    ]
    return (
        <>
            <AppModal visible={visible} position="top" onRequestClose={() => setVisible(false)} onOutTouch={() => setVisible(false)}>

            </AppModal>
            <View>
                <View>
                    <AppText>Current Credit Balance</AppText>
                </View>
                <View style={{ borderWidth: 2, width: 100, height: 50, justifyContent: "center", alignItems: "center" }}>
                    <AppText>145</AppText>
                </View>
                <Button title="Recharge Credit" onPress={() => setVisible(true)}></Button>
            </View>

        </>
    )
}

export default RechargeWalletScreen

const styles = StyleSheet.create({})
