import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Modal } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { CommonActions } from '@react-navigation/native';

import colors from '../../utils/colors';
import images from '../../utils/images';

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

        <ImageBackground source={images.LOGING_BACKGROUND} style={styles.backgroundImage} >

          <Image
            style={styles.topImage}
            source={images.LOGO}
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

            <Button style={styles.button} mode="contained" onPress={() => navigation.navigate('Dashboard')} >
              Sign In
            </Button>

          </View>

          <Text style={styles.textSocial}>or Via Social Media</Text>
          <View style={styles.icon}>
            <TouchableOpacity style={styles.image}>
              <Image
                style={styles.socialIcon}
                source={images.FACEBOOK_ICON}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.image}>
              <Image
                style={styles.image}
                source={images.GOOGLE_ICON}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.image}>
              <Image
                style={styles.image}
                source={images.TWITTER_ICON}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.textUnder}>Don't Have an Account ? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
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
    height: 40,
    backgroundColor: colors.primary,
    marginVertical: 20,
    alignSelf: 'center',
    width: 150,
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