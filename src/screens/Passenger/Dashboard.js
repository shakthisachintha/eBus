import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';



import SideLabelDrawer from '../../components/SideLabelDrawer';
import colors from '../../utils/colors';

export default class Dashboard extends React.Component {
    payMethods = [
        { id: 1, label: "Primary (xxxx...2147 VISA)" },
        { id: 2, label: "(xxxx...2156 MASTER)" },
        { id: 25, label: "Credit/Debit Card" },
    ]
    render() {
        return (
            <View style={StyleSheet.container}>

                <SideLabelDrawer
                    rechargeSubmit={(method, amount) => alert(`${method}, ${amount}`)}
                    payMethods={this.payMethods}
                    credit={200}
                    enableModal={true}
                    backgroundColor={colors.danger}
                    position={65}
                    IconComponent={() => <Icon style={{ marginLeft: 10 }} name="coins" color={colors.white} size={35} />}>
                </SideLabelDrawer>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardContainer: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.30,
        elevation: 10,
        padding: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 120,
        height: 120,
        marginTop: 20,
        marginHorizontal: 20,
        marginVertical: 10
    }
});