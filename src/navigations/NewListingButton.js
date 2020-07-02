import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import colors from '../utils/colors'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const NewListingButton = function ({ onPress }) {
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
        borderRadius: 40,
        borderColor: colors.primary,
        borderWidth: 15,
        bottom: 25,
        height: 80,
        justifyContent: 'center',
        width: 80,

    }
})

export default NewListingButton;

