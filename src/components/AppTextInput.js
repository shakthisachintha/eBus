import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import defaultStyles from '../utils/styles';
import AppText from './AppText';
import colors from '../utils/colors';

const AppTextInput = ({ backgroundColor, append, icon, ...otherProps }) => {
    return (
        <View style={[styles.container, { backgroundColor }]}>

            {icon && <Icon style={styles.icon} size={20} color={defaultStyles.darkGray} name={icon} />}
            <TextInput style={[defaultStyles.text, { flex: 1 }]} {...otherProps} />
            {append && <AppText style={{ fontWeight: "bold", fontSize: 18, color: colors.darkGray, paddingRight: 10 }}>{append}</AppText>}
        </View>
    )
}

export default AppTextInput

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: defaultStyles.colors.white,
        borderRadius: 25,
        flexDirection: "row",
        width: '100%',
        paddingHorizontal: 15,
        marginVertical: 10,
        opacity: 0.98
    },
    icon: {
        marginRight: 6,
    },
})
