import React, { Component } from 'react'
import { View, Text, StyleSheet, Vibration } from 'react-native'

import AppCard from '../../components/AppCard'
import AppText from '../../components/AppText';
import { Button } from 'react-native-paper';
import colors from '../../utils/colors';
import AppIcon from '../../components/AppIcon';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Swipeable from 'react-native-gesture-handler/Swipeable';

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

    com

    constructor(props) {
        super(props);
        this.state = { due: 0, name: "Shakthi Sachintha", email: "shakthisachintha@gmail.com", image: 'https://images.pexels.com/photos/556667/pexels-photo-556667.jpeg?' };
    }

    render({ name, email, image, due } = this.state, { navigation } = this.props) {
        return (
            <View style={{ minHeight: 100, position: "absolute" }}>
                {/* <AppCard
                    titleStyle={styles.name}
                    title={name}
                    subTitle={email}
                    image={image}
                /> */}
                <Swipeable friction={3} overshootFriction={2} onSwipeableWillOpen={() => Vibration.vibrate(15, false)} renderLeftActions={() => <Icon size={40} style={{ alignSelf: "center" }} name="plus-circle-multiple-outline" />}>
                    <View style={styles.columnOne}>
                        {/* <Icon name="diamond-stone" color={colors.white} size={30} /> */}
                        <AppText style={styles.creditBalance}>LKR 1500</AppText>
                    </View>
                </Swipeable>

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
