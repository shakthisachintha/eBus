import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import colors from '../utils/colors'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TripButton = function ({ onPress }) {
    return (

        <View style={styles.container}>
            <TouchableOpacity onPress={onPress}>
                <Icon name="train-car" color={colors.primary} size={50} />
            </TouchableOpacity>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 40,
        borderColor: colors.primary,
        borderWidth: 10,
        bottom: 30,
        height: 80,
        justifyContent: 'center',
        width: 80,
    }
})

export default TripButton;

