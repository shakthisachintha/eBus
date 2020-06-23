import React from 'react';
import {View, Text , KeyboardAvoidingView,TouchableOpacity,StyleSheet} from 'react-native';
import {TextInput,Button} from 'react-native-paper';

export default class ResetPassword extends React.Component{
    render(){
    return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
        <TouchableOpacity style={styles.opacity} onPress={this.props.closeModal}>
            <Button icon="close" color='black' mode="contained" style={{backgroundColor:'purple'}} />
        </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    opacity:{
        position:'absolute',
        top:2,right:2
    }
});