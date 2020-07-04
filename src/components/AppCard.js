import React from 'react'
import { StyleSheet, TouchableHighlight, Text, View, Image } from 'react-native'

import colors from '../utils/colors'


const AppCard = ({ IconComponent, title, image, subTitle, style, titleStyle, onPress }) => {
    return (
        <TouchableHighlight onPress={onPress} underlayColor={colors.mediumGray}>
            <View style={[styles.container, style]}>
                {IconComponent}
                {image && <Image source={{ uri: image }} style={styles.image} />}
                <View style={styles.detailsContainer}>
                    <Text style={[styles.title, titleStyle]}>{title}</Text>
                    {subTitle && <Text style={styles.subTitle}>{subTitle}</Text>}
                </View>
            </View>
        </TouchableHighlight>
    )
}

export default AppCard

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 10,
        backgroundColor: colors.white
    },
    detailsContainer: {
        justifyContent: "center",
        marginLeft: 10,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    title: {
        color: colors.black,
        fontWeight: "500",
        fontSize: 18
    },
    subTitle: {
        color: colors.darkGray,
        fontSize: 14
    }
})
