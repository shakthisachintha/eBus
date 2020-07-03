import React, { useState } from 'react'
import { StyleSheet, Text, View, Modal, TouchableWithoutFeedback } from 'react-native'
import colors from '../utils/colors';


const AppModal = ({ position, size = 50, visible = true, onRequestClose, children, modalContentStyle, onOutTouch }) => {

    let { topHeight, bottomHeight } = "0%";
    let middleHeight = size.toString() + "%"
    switch (position) {
        case "top":
            topHeight = "0%";
            bottomHeight = (100 - size).toString() + "%"
            break;
        case "middle":
            topHeight = bottomHeight = ((100 - size) / 2).toString() + "%"
            break;
        case "bottom":
            bottomHeight = "0%"
            topHeight = (100 - size).toString() + "%"
            break;

        default:
            throw new Error("Invalid argument supplied for position");
            break;
    }



    return (
        <Modal transparent={true} animated={true} animationType="fade" visible={visible} onRequestClose={() => onRequestClose()}>
            <View>
                <TouchableWithoutFeedback onPress={() => onOutTouch()}>
                    <View style={{ ...styles.modalSpacer, height: topHeight }}></View>
                </TouchableWithoutFeedback>

                <View style={{ height: middleHeight, modalContentStyle }}>
                    {children}
                </View>

                <TouchableWithoutFeedback onPress={() => onOutTouch()}>
                    <View style={{ ...styles.modalSpacer, height: bottomHeight }}></View>
                </TouchableWithoutFeedback>

            </View>
        </Modal>
    )
}

export default AppModal

const styles = StyleSheet.create({
    modalSpacer: {
        backgroundColor: colors.white,
        opacity: 0.8,
    },
})
