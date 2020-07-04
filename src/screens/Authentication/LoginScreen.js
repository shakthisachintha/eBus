import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { CommonActions } from '@react-navigation/native';


import colors from '../../utils/colors';
import images from '../../utils/images';
import FaceBookLogin from '../../components/FaceBookLogin';

export default class LoginScreen extends React.Component {

  constructor(props) {
    super();
    this.state = {
      isLogged: false,
      name: null,
      email: null,
      image: null,
    };
  }

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
          <Text style={styles.headText}>LOGIN</Text>
          <View style={{ flexDirection: 'column', marginTop: 0 }}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
              placeholder="Email"
              label="Email"
              mode="outlined"
            />
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
              style={styles.input}
              placeholder="Password"
              label="Password"
              mode="outlined"
            />
            <Button
              contentStyle={styles.buttonContent}
              style={styles.button}
              color={colors.primary}
              mode="contained"
              onPress={() => navigation.navigate('Dashboard')} >
              Sign In
            </Button>

          </View>

          <Text style={styles.textSocial}>or Via Social Media</Text>
          <View style={styles.icon}>

            <FaceBookLogin loginSuccessCallback={(user) => {
              alert(`Logged In ${user.name} (${user.email})`)
            }} />

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
  backgroundImage: {
    resizeMode: 'contain', // or 'stretch'
    width: '100%',
    height: '100%',
    justifyContent: "center",
    alignItems: 'center'
  },
  button: {
    marginVertical: 20,
    alignSelf: 'center',
  },
  buttonContent: {
    height: 40,
    width: 150,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  facebookButton: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  facebookButtonLabel: {
    color: colors.white
  },
  icon: {
    flexDirection: 'row',
    margin: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    marginLeft: 20
  },
  input: {
    height: 45,
    marginTop: 10,
    width: 300
  },
  headText: {
    fontSize: 30,
    justifyContent: 'center',
    alignSelf: 'center',
    color: 'purple'
  },
  image: {
    paddingHorizontal: 10,
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
  textUnder: {
    fontSize: 15,
    justifyContent: 'center',
    alignSelf: 'center',
    color: 'grey'
  }
});