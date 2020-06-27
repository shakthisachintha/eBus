import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';
import {TextInput, IconButton, Colors, Button} from 'react-native-paper';

import Card from '../components/Card';


const UserProfile = props => {
    return (
        <View style={styles.container}>
            <View style={styles.header}><Image style={{width:'100%', height:'100%'}} source={require('../shared/bg_profile.jpg')}/></View>
            <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
            <IconButton
                icon="camera"
                color={Colors.red500}
                size={30}
                onPress={() => console.log('Pressed')}
                name="Edit Profile"
                style={{position: 'absolute',marginTop:190, marginLeft:230}}
            />
            <View style={styles.body}>
                <View style={styles.bodyContent}>
                    <Text style={styles.name}>John Doe</Text>
                    <Text style={styles.info}>965550550V</Text>
                </View>
            </View>
            <Card style={styles.firstcard}>
                <View style={styles.item}>
                    <Text style={styles.label}>Email : </Text>
                    <Text style={styles.detail}>johndoe@gmail.com</Text>
                </View>
            </Card>
            <Card style={styles.card}>
                <View style={styles.item}>
                    <Text style={styles.label}>Address : </Text>
                    <Text style={styles.detail}>No 35, Reid avenue, Colombo 7</Text>
                </View>
            </Card>
            <Card style={styles.card}>
                <View style={styles.item}>
                    <Text style={styles.label}>Phone number : </Text>
                    <Text style={styles.detail}>0711234567</Text>
                </View>
            </Card>
            <View style={styles.buttonContainer}>
                <Button mode="outlined" icon="shield-key" labelStyle={{fontSize:13}} onPress={()=>{}} >Change Password</Button>
                <Button mode="outlined" icon="account-edit" labelStyle={{fontSize:13}} onPress={()=>{}} >Edit Details</Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    header:{
      backgroundColor: "#00BFFF",
      height:150,
    },
    avatar: {
      width: 130,
      height: 130,
      borderRadius: 63,
      borderWidth: 4,
      borderColor: "white",
      marginBottom:10,
      alignSelf:'center',
      position: 'absolute',
      marginTop:95
    },
    body:{
      marginTop:40,
    },
    bodyContent: {
      flex: 1,
      alignItems: 'center',
      padding:30,
    },
    name:{
      fontSize:28,
      color: "black",
      fontWeight: "600"
    },
    info:{
      fontSize:16,
      color: "#696969",
      marginTop:10
    },
    buttonContainer: {
        flexDirection:'row',
        justifyContent: 'space-around',
        padding:30
    },
    firstcard: {
        marginTop: 50,
        alignSelf:'center',
        width:'95%'
    },
    card:{
        marginTop: 15,
        alignSelf:'center',
        width:'95%'
    },
    item: {
        flexDirection:'row',
    },
    label: {
        fontSize: 15,
        fontStyle: 'italic'
    },
    detail: {
        fontSize: 15,
        fontWeight:'bold',
        width:'80%'
    }
  });

export default UserProfile;