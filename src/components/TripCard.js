import React from 'react'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import colors from '../utils/colors'
import AppText from './AppText'


const TripCard = ({ from, to ,fare,bus}) => {
    return (
        <TouchableHighlight style={{ borderRadius: 15 ,paddingVertical:5}} onPress={() => alert("Pressed")}>
            <View style={styles.container}>
                <View style={{justifyContent:"center",alignItems:"center"}}>
                    <Text style={{fontSize:18}}>{bus}</Text>
                </View>
                <View style={{ flexDirection: "column", paddingHorizontal: 10 }}>
                    <AppText>From : {from}</AppText>
                    <AppText>To : {to}</AppText>
                </View>
                <View style={{justifyContent:"center",alignItems:"center"}}>
                    <Text style={{fontSize:18}}>
                        LKR {fare}
                    </Text>
                </View>

            </View>
        </TouchableHighlight>

    )
}

export default TripCard

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingTop: 15,
        paddingBottom: 15,
        paddingHorizontal: 15,
        borderRadius: 15,
        backgroundColor: "dodgerblue",
        justifyContent:"space-between",
    },
})
