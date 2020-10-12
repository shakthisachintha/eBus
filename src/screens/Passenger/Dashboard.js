import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';



import SideLabelDrawer from '../../components/SideLabelDrawer';
import colors from '../../utils/colors';
import AppText from '../../components/AppText';
import TripCard from '../../components/TripCard';
import images from '../../utils/images';
import TouchableIcon from '../../components/TouchableIcon';

export default Dashboard = ({ navigation }) => {

    return (

        <ImageBackground source={images.HOME_IMAGE} style={styles.backgroundImage}>
            <View style={styles.headerTitleContainer}>
                <AppText style={{ fontSize: 38, fontWeight: "bold" }}>Good Morning,</AppText>
                <AppText style={{ fontSize: 30, fontWeight: "bold" }}>Shakthi</AppText>
                <AppText style={{ fontSize: 24, color: colors.white, opacity: 0.8, marginTop: 10 }}>Looking for a bus ride?</AppText>
                {/* <AppText style={styles.title}>Recent Activities</AppText> */}

                {/* <View style={{ paddingHorizontal: 5 }}>
                        <TripCard bus="NB1023" from="Karapitiya Bus Station" to="Galle Bus Station" fare={16.00}></TripCard>
                        <TripCard bus="NB1023" from="Karapitiya Bus Station" to="Galle Bus Station" fare={16.00}></TripCard>
                        <TripCard bus="NB1023" from="Karapitiya Bus Station" to="Galle Bus Station" fare={16.00}></TripCard>
                        <TripCard bus="NB1023" from="Karapitiya Bus Station" to="Galle Bus Station" fare={16.00}></TripCard>
                    </View> */}
            </View>

            <View style={styles.iconContainer}>
                <View style={styles.iconBar}>
                    <TouchableIcon label="My Trips" onPress={() => navigation.navigate("myTrips")} name="bus-stop" iconColor="#FF339F" backgroundColor="white" size={70} />
                    <TouchableIcon label="Bookings" onPress={() => navigation.navigate("seatReservations")} name="bus-clock" iconColor="#5C83FF" backgroundColor="white" size={70} />
                    <TouchableIcon label="Wallet" onPress={() => navigation.navigate("userWallet")} name="wallet" iconColor="#3d3d3d" backgroundColor="white" size={70} />
                    <TouchableIcon label="Busses" name="bus-multiple" iconColor="#ff9f1a" backgroundColor="white" size={70} />
                </View>
            </View>

        </ImageBackground>

        /* <SideLabelDrawer
            rechargeSubmit={(method, amount) => alert(`${method}, ${amount}`)}
            payMethods={this.payMethods}
            credit={200}
            enableModal={true}
            backgroundColor={colors.danger}
            position={65}
            IconComponent={() => <Icon style={{ marginLeft: 10 }} name="coins" color={colors.white} size={35} />}>
        </SideLabelDrawer> */
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        width: '100%',
        height: '100%',
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
    },
    headerTitleContainer: {
        padding: 15,
    },
    iconContainer: {
        padding: 25,
        justifyContent: "center"
    },
    iconBar: {
        flexDirection: "row",
    },
    title: {
        fontSize: 30,
        marginBottom: 20,
        marginLeft: 5
    }
});