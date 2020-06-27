import React from 'react';
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native';
import {Appbar,Button,TextInput,Card} from 'react-native-paper';
import {Actions} from 'react-native-router-flux';

export default class VerifyPassword extends React.Component{

     sendEmail(){
         Actions.replace('reset');
     }
     submitButton(){
         Actions.replace('submit');
     }

    render(){
    return (
        <View style={styles.container}>
        <Appbar.Header style={{backgroundColor:'purple'}}>
            <Appbar.BackAction onPress={()=>this.sendEmail()} />
            <Appbar.Content 
                title="Verify Password"
            />
         </Appbar.Header>
         <View>
             <Text style={{...styles.text,marginTop:20}}>You've received an Email</Text>
             <Text style={styles.text}>Containing verification code on</Text>
             <Text style={styles.text}>Email@gmail.com</Text>
             <TextInput 
                style={{marginTop:20,marginHorizontal:20,borderColor:'white'}}
                placeholder= 'Enter Verification Code'
                 mode="flat"
             />
             <TouchableOpacity onPress={() => this.submitButton()}>
                <Button icon="forward" mode="contained" style={{width:300,alignSelf:'center',marginTop:20,backgroundColor:'purple'}}>Submit</Button>
            </TouchableOpacity>
         </View>
    </View>
  );
}
}

const styles = StyleSheet.create({
    container:{
        flex:1
     },
     text:{
        fontSize:16,
        justifyContent:'center',
        alignSelf:'center',
        color:'grey'
     }
});