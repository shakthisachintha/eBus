import React from 'react'
import { StyleSheet, Text } from 'react-native'


export default AppText = ({ children, style }) => {
    return (
        <Text style={[styles.text, style]}>{children}</Text>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 16
    }
})
