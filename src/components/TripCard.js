import React from 'react'
import { StyleSheet, Text, TouchableHighlight, TouchableNativeFeedback, View } from 'react-native'
import colors from '../utils/colors'
import AppText from './AppText'
import moment from 'moment';

const TripCard = ({ from, to, fare, bus, date, onPress, duration }) => {
    return (
        <TouchableNativeFeedback style={{ borderRadius: 15, paddingVertical: 5 }} onPress={onPress}>
            <View style={styles.container}>
                <View style={{ marginBottom: 5, flexDirection: "row", justifyContent: "space-between" }}>
                    <View><AppText style={{ fontSize: 18, fontWeight: "bold" }}>{moment(date).format("YYYY.MM.DD | hh:mm A")}</AppText></View>
                    <View><AppText style={{ fontSize: 18, fontWeight: "bold" }}>{bus}</AppText></View>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>

                    <View style={{ flexDirection: "column", paddingHorizontal: 15 }}>
                        <AppText style={{ fontSize: 16, marginBottom: 3 }}>From : {from}</AppText>
                        <AppText style={{ fontSize: 16 }}>To : {to}</AppText>
                        {duration && <AppText style={{ fontSize: 16 }}>Time : {duration}</AppText>}
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <AppText style={{ fontSize: 18, color: colors.secondary, fontWeight: "bold" }}>
                            {fare}
                        </AppText>
                    </View>
                </View>
            </View>
        </TouchableNativeFeedback>

    )
}

export default TripCard

const styles = StyleSheet.create({
    container: {
        // flexDirection: "row",
        paddingTop: 15,
        paddingBottom: 15,
        paddingHorizontal: 15,
        borderRadius: 15,
        // backgroundColor: "dodgerblue",
        justifyContent: "space-between",
    },
})
