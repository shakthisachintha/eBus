import React from 'react';
import {View, StyleSheet} from 'react-native';

const Card = props => {
    return (
        <View style={{...styles.card, ...props.style}}>{props.children}</View>
    );
};

const styles = StyleSheet.create({
    card: {
        shadowColor: 'rgb(0,0,0)',
        shadowOpacity: 0.26,
        shadowOffset: {width:0, height:2},
        shadowRadius: 6,
        elevation: 5, //elevation only in android, because shadow props only works with ios
        backgroundColor: 'white', 
        padding: 20,
        borderRadius: 10,
    }
});

export default Card;