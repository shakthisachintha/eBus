import React from 'react'
import { StyleSheet, View } from 'react-native'
import AppCard from '../../components/AppCard'
import colors from '../../utils/colors'
import AppIcon from '../../components/AppIcon'



const UserAccountScreen = ({ name = "Siny Johns", email = "joohndoe@gmail.com", image = "https://lh3.googleusercontent.com/proxy/h8dgngv4d6XaK7gzjHb8EGXm3qZsWiHjpSqDtoQB2iwimdRE66Cg8r-uJbNubwd5dNcGymeqDHdr-zFv5JaRCzmy8NXiLwMfnUAEO9c3o-OK34wCC_BVoWgjysCCxDi6N4u1RuvV8uDoHA", navigation }) => {
    return (
        <View>
            <View>
                <AppCard
                    titleStyle={styles.name}
                    title={name}
                    subTitle={email}
                    image={image}
                    onPress={() => navigation.navigate("EditUserProfile")}
                />


            </View>

            <View style={styles.container}>
                <AppCard title="Wallet" IconComponent={<AppIcon name="credit-card-multiple" backgroundColor={colors.secondary} />} />
                <AppCard title="My Messages" IconComponent={<AppIcon name="forum-outline" backgroundColor={colors.primary} />} />
                <AppCard title="Settings" style={{ marginVertical: 30 }} IconComponent={<AppIcon name="settings" backgroundColor={'#5515ee'} />} />
                <AppCard title="Logout" style={{ marginVertical: 25 }} IconComponent={<AppIcon name="logout" backgroundColor={'#F5d529'} />} />

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
