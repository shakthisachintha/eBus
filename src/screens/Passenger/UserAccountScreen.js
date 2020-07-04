import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, View, Text } from 'react-native'

import AppCard from '../../components/AppCard'
import AppText from '../../components/AppText'
import AppIcon from '../../components/AppIcon'
import colors from '../../utils/colors'
import userAPI from '../../api/user';
import { Button } from 'react-native-paper'
import useAPI from '../../hooks/useAPI'
import AuthContext from '../../auth/context'
import authStorage from '../../auth/storage'



const UserAccountScreen = ({ navigation }) => {
    const { user, setUser } = useContext(AuthContext);

    const handleLogOut = () => {
        setUser(null);
        authStorage.removeToken();
    }

    return (
        <View>
            <AppCard
                titleStyle={styles.name}
                title={user.name}
                subTitle={user.email}
                // image={userDetails.image.url}
                onPress={() => navigation.navigate("EditUserProfile")}
            />
            <View style={styles.container}>
                <AppCard title="Wallet" onPress={() => navigation.navigate('Wallet')} IconComponent={<AppIcon name="credit-card-multiple" backgroundColor={colors.secondary} />} />
                <AppCard title="My Messages" IconComponent={<AppIcon name="forum-outline" backgroundColor={colors.primary} />} />
                <AppCard title="Settings" style={{ marginVertical: 30 }} IconComponent={<AppIcon name="settings" backgroundColor={'#5515ee'} />} />

                <AppCard title="Logout" onPress={() => handleLogOut()} IconComponent={<AppIcon name="logout" backgroundColor={'#F5d529'} />} />

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
