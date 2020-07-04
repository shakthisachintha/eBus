import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import colors from '../utils/colors'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TripButton = function ({ onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <Icon name="train-car" color={colors.primary} size={40} />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 45,
        borderColor: colors.primary,
        borderWidth: 15,
        bottom: 30,
        height: 90,
        justifyContent: 'center',
        width: 90,

    }
})

export default TripButton;

