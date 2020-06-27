import React from 'react';
import {View, Text,StyleSheet} from 'react-native';

import {Appbar} from 'react-native-paper';

export default class Dashboard extends React.Component{

    render(){
        return(
            <View style={StyleSheet.container}>
                <Appbar.Header style={{backgroundColor:'purple'}}>
                        <Appbar.Content 
                        title="Dashboard"
                        style={{alignItems: 'center',justifyContent: 'center'}}
                        />
                </Appbar.Header>
                <Text>Dashboard</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
     }
});