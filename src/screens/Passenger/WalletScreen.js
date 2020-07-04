import React, { Component } from 'react'
import { View, Text, StyleSheet, Vibration } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';

import AppCard from '../../components/AppCard'
import AppText from '../../components/AppText';
import { Button } from 'react-native-paper';
import colors from '../../utils/colors';
import AppIcon from '../../components/AppIcon';


import Swipeable from 'react-native-gesture-handler/Swipeable';
import SideLabelDrawer from '../../components/SideLabelDrawer';

// import colors from '../../utils/colors'
// import AppIcon from '../../components/AppIcon'
// import { Button } from 'react-native-paper'


export class WalletScreen extends Component {
    state = {
        name: String,
        email: String,
        image: String,
        due: Number
    }

    constructor(props) {
        super(props);
        this.state = { due: 0, name: "Shakthi Sachintha", email: "shakthisachintha@gmail.com", image: 'https://images.pexels.com/photos/556667/pexels-photo-556667.jpeg?' };
    }
    payMethods = [
        { id: 1, label: "Primary (xxxx...2147 VISA)" },
        { id: 2, label: "(xxxx...2156 MASTER)" },
        { id: 25, label: "Credit/Debit Card" },
    ]
    render({ name, email, image, due } = this.state, { navigation } = this.props) {
        return (
            <View style={{ minHeight: 100, position: "absolute" }}>
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
            </View>
        )
    }
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
