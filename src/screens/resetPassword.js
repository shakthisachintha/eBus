import React from 'react';
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native';
import {Appbar,Button,TextInput,Card, Paragraph} from 'react-native-paper';
import {Actions} from 'react-native-router-flux';
export default class ResetPassword extends React.Component{

    sendEmail(){
        Actions.replace('verify');
    }
    goBack(){
        Actions.replace('login');
    }

    render(){
    return (
        <View style={styles.container}>
        <Appbar.Header style={{backgroundColor:'purple'}}>
            <Appbar.BackAction onPress={()=>this.goBack()} />
            <Appbar.Content 
                title="Forgot Password"
            />
         </Appbar.Header>
         <Card>
                <Card.Cover source={require('../image/forgot.png') } />
            </Card>
                <Text style={{color:'grey',justifyContent:'center',fontSize:16,alignSelf:'center',marginTop:10}}>To recover your Password ,You need to Enter</Text>
                <Text style={{color:'grey',justifyContent:'center',fontSize:16,alignSelf:'center'}}>your registration Email address.We will sent the </Text>
                <Text style={{color:'grey',justifyContent:'center',fontSize:16,alignSelf:'center'}}>Recovery code to your Email</Text>
       
           <TextInput 
            style={{height: 40,marginTop:10,width:300,alignSelf:'center'}}
            placeholder="Email"
            label="Email" 
            mode="outlined"
           />
           <TouchableOpacity onPress={()=>this.sendEmail()}>
           <Button icon="share" mode="contained" style={{width:300,alignSelf:'center',marginTop:20,backgroundColor:'purple'}}>Send</Button>
           </TouchableOpacity>
 
    </View>
  );
}
}

const styles = StyleSheet.create({
    container:{
        flex:1
     }
});