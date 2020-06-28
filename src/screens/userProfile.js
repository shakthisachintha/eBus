import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogButton,
    ScaleAnimation,
  } from 'react-native-popup-dialog';
import {TextInput, IconButton, Colors, Button} from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ImagePicker from 'react-native-image-picker';

import Card from '../components/Card';
import ChangePassword from '../screens/changePassword';
import EditDeatils from '../screens/editDetails'


const UserProfile = ({navigation}) => {

    const [popvisibility, setPopvisibility] = useState(false);
    const [photo, setphoto] = useState(null);

    //choose a photo from storage
    const handleChoosePhoto = () => {
        const options = {
            noData: true,
        };
        ImagePicker.launchImageLibrary(options, response => {
        if (response.uri) {
            setPopvisibility(false);
            console.log("response", response);
            setphoto(response);
        }
        });
    };
    //take a photo
    const handleTakePhoto = () => {
        const options = {
            noData: true,
        };
        ImagePicker.launchCamera(options, response => {
        if (response.uri) {
            setPopvisibility(false);
            console.log("response", response);
            setphoto(response);
        }
        });
    };
    return (
        <ScrollView>
        <View style={styles.container}>
            <View style={styles.header}><Image style={{width:'100%', height:'100%'}} source={require('../shared/bg_profile.jpg')}/></View>
            <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
            <IconButton
                icon="camera-account"
                color={Colors.red500}
                size={30}
                onPress={() => setPopvisibility(true)}
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
                <Button mode="outlined" icon="shield-key" labelStyle={{fontSize:13}} onPress={()=>navigation.navigate('ChangePassword')}>Change Password</Button>
                <Button mode="outlined" icon="account-edit" labelStyle={{fontSize:13}} onPress={()=>navigation.navigate('EditDetails')} >Edit Details</Button>
            </View>
        </View>

        {/* popup window */}
        <Dialog
          onTouchOutside={() => {
            setPopvisibility(false);
          }}
          width={0.9}
          visible={popvisibility}
          dialogAnimation={new ScaleAnimation()}
          onHardwareBackPress={() => {
            setPopvisibility(false);
            return true;
          }}
          dialogTitle={
            <DialogTitle
              title="Change Profile Picture"
              hasTitleBar={false}
            />
          }>
          <DialogContent>
            <View style={styles.photobuttons}>
              <Button icon="camera-image" onPress={handleChoosePhoto}>Upload a photo</Button>
            </View>
            <View style={styles.photobuttons}>
              <Button icon="camera" onPress={handleTakePhoto}>Take a photo</Button>
            </View>
          </DialogContent>
        </Dialog>

        </ScrollView>
    );
};

const Stack = createStackNavigator();

const App = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions= {{
                headerStyle: {
                    backgroundColor: 'purple'
                },
                headerTintColor:'#fff',
                headerTitleStyle: {
                    fontWeight: 'bold'
                }
            }}>
                <Stack.Screen name="UserProfile" component={UserProfile} options={{headerTitleAlign: 'center', title: 'User Profile'}} />
                <Stack.Screen name="ChangePassword" component={ChangePassword} options={{headerTitleAlign: 'center', title: 'Change Password'}} />
                <Stack.Screen name="EditDetails" component={EditDeatils} options={{headerTitleAlign: 'center', title: 'Edit Details'}} />
            </Stack.Navigator>
        </NavigationContainer>
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
        padding:30,
        paddingBottom: 60
    },
    firstcard: {
        // marginTop: 10,
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
    },
    photobuttons: {
        paddingVertical: 7
    }
  });

export default App;