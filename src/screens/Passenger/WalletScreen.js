import React from 'react'
import { View, Text, StyleSheet, Vibration } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';

import AppCard from '../../components/AppCard'
import AppText from '../../components/AppText';
import { Button } from 'react-native-paper';
import colors from '../../utils/colors';
import AppIcon from '../../components/AppIcon';

import SideLabelDrawer from '../../components/SideLabelDrawer';

const WalletScreen = ({ due, navigation }) => {
    payMethods = [
        { id: 1, label: "Primary (xxxx...2147 VISA)" },
        { id: 2, label: "(xxxx...2156 MASTER)" },
        { id: 25, label: "Credit/Debit Card" },
    ]
    return (
        <View>
            <SideLabelDrawer
                rechargeSubmit={(method, amount) => alert(`${method}, ${amount}`)}
                payMethods={this.payMethods}
                credit={200}
                enableModal={true}
                backgroundColor={colors.danger}
                position={65}
                IconComponent={() => <Icon style={{ marginLeft: 10 }} name="coins" color={colors.white} size={35} />}>
            </SideLabelDrawer>

            {due > 0 && (
                <View style={styles.columnTwo}>
                    <AppText style={styles.columnTitle}> Due Balance </AppText>
                </View>
            )}

            <AppCard title="Add Payment Method" onPress={() => navigation.navigate('AddPayment')} style={{ marginVertical: 30 }} IconComponent={<AppIcon name="card" backgroundColor={'#5415fe'} />} />
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