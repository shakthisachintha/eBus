import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Modal } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { CommonActions } from '@react-navigation/native';

export default class LoginScreen extends React.Component {

  state = {
    addPasswordVisible: false
  };

  render({ navigation } = this.props) {

    navigation.dispatch(state => {
      // Remove the Loading route from the stack
      const routes = state.routes.filter(r => r.name !== 'Loading');

      return CommonActions.reset({
        ...state,
        routes,
        index: routes.length - 1,
      });
    });

    return (
      <View style={StyleSheet.container}>

        <ImageBackground source={require('../image/screen.png')} style={styles.backgroundImage} >

          <Image
            style={styles.topImage}
            source={require('../image/G3.png')}
            resizeMode="contain"
          />
          <Text style={styles.headText}>Login</Text>

          <View style={{ flexDirection: 'column', marginTop: 0 }}>
            <TextInput
              style={{ height: 40, marginTop: 10, width: 300 }}
              placeholder="Email"
              label="Email"
              mode="outlined"
            />
            <TextInput
              style={{ height: 40, marginTop: 10, width: 300 }}
              placeholder="Password"
              label="Password"
              mode="outlined"
            />

            <Button onPress={() => navigation.navigate('Dashboard')} style={styles.button}>
              Sign In
            </Button>

          </View>

          <Text style={styles.textSocial}>or Via Social Media</Text>
          <View style={styles.icon}>
            <TouchableOpacity style={styles.image}>
              <Image
                style={styles.socialIcon}
                source={require('../image/facebook.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.image}>
              <Image
                style={styles.image}
                source={require('../image/google.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.image}>
              <Image
                style={styles.image}
                source={require('../image/twitter.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.textUnder}>Don't Have an Account ? </Text>
            <TouchableOpacity>
              <Text style={{ fontSize: 18, color: 'purple' }}>Sign up</Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
              <Text style={{ fontSize: 16, color: '#94076e', marginTop: 20 }}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: 'white',
    height: 35,
    marginHorizontal: 3,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    backgroundColor: '#a503fc',
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    width: 250
  },
  icon: {
    flexDirection: 'row',
    margin: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    marginLeft: 20

  },
  image: {
    paddingHorizontal: 10,
  },
  backgroundImage: {
    resizeMode: 'contain', // or 'stretch'
    width: '100%',
    height: '100%',
    justifyContent: "center",
    alignItems: 'center'
  },
  headText: {
    fontSize: 30,
    justifyContent: 'center',
    alignSelf: 'center',
    color: 'purple'
  },
  topImage: {
    width: 200, height: 100,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20
  },
  textSocial: {
    fontSize: 15,
    justifyContent: 'center',
    alignSelf: 'center',
    color: 'grey'
  },
  socialIcon: {
    width: 48,
    height: 48
  },
  textUnder: {
    fontSize: 15,
    justifyContent: 'center',
    alignSelf: 'center',
    color: 'grey'
  }
});