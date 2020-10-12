import React from 'react'
import { StyleSheet, Text, TouchableNativeFeedback, TouchableWithoutFeedback, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppText from './AppText';

const TouchableIcon = ({ label, iconColor = "#fff", size = 40, name, backgroundColor = '#000', onPress = null }) => {
    return (

        <View style={{ alignItems: "center", marginRight: 25, }}>
            <TouchableWithoutFeedback style={{
                width: size,
                height: size, borderRadius: size / 2,

            }} onPress={onPress}>
                <View style={{

                    backgroundColor,
                    width: size,
                    height: size,
                    padding: 4,
                    justifyContent: 'center',
                    alignItems: "center",
                    borderRadius: size / 2,
                    shadowColor: "white",
                    shadowOffset: 100,
                    elevation: 10
                }}>
                    <Icon name={name} size={size / 2} color={iconColor} />

                </View>
            </TouchableWithoutFeedback>
            <AppText style={{ fontSize: 16, marginTop: 5 }}>{label}</AppText>

        </View>



    )
}

export default TouchableIcon

const styles = StyleSheet.create({})
