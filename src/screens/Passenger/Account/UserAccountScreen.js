import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

import AppCard from '../../../components/AppCard'
import AppIcon from '../../../components/AppIcon'
import colors from '../../../utils/colors'
import useAuth from '../../../auth/useAuth'

const UserAccountScreen = ({ navigation }) => {
    const { user, logOut } = useAuth();

    return (
        <View>
            <AppCard
                titleStyle={styles.name}
                title={user.name}
                subTitle={user.email}
                image={user.image}
                onPress={() => navigation.navigate('Profile')}
            />
            <View style={styles.container}>
                <AppCard title="Wallet" onPress={() => navigation.navigate('userWallet')} IconComponent={<AppIcon name="credit-card-multiple" backgroundColor={colors.secondary} />} />
                <AppCard title="Seat Reservation" onPress={() => navigation.navigate('SelectRouteScreen')} IconComponent={<AppIcon name="seat-recline-normal" backgroundColor={'#4455ee'} />} />
                <AppCard title="My Reservations" onPress={() => navigation.navigate('ViewReservationsScreen')} IconComponent={<AppIcon name="seatbelt" backgroundColor={'#669900'} />} />
                {/* <AppCard title="My Messages" IconComponent={<AppIcon name="forum-outline" backgroundColor={colors.primary} />} /> */}
                {/* <AppCard title="Settings" style={{ marginVertical: 30 }} IconComponent={<AppIcon name="settings" backgroundColor={'#5515ee'} />} /> */}

                <AppCard title="Logout" style={{ marginVertical: 30 }} onPress={() => logOut()} IconComponent={<AppIcon name="logout" backgroundColor={'#F5d529'} />} />

            </View>
        </View>
    )
}

export default UserAccountScreen

const styles = StyleSheet.create({
    container: {
        marginVertical: 30
    },
    name: {
        fontWeight: "bold",
        fontSize: 24,
        fontFamily: 'Arial',
        textTransform: "uppercase"
    }
})
