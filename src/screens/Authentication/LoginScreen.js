import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Modal } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { CommonActions } from '@react-navigation/native';
import { LoginManager, LoginButton, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';


import colors from '../../utils/colors';
import images from '../../utils/images';

// Somewhere in your code
signIn = async () => {

};

export default class LoginScreen extends React.Component {


  constructor(props) {
    super();
    this.state = {
      isLogged: false,
      name: null,
      email: null,
      image: null,
    };
    this.loginWithFacebookAlt = this.loginWithFacebookAlt.bind(this);
  }


  loginWithFacebookAlt(that = this) {
    // Attempt a login using the Facebook login dialog asking for default permissions.
    LoginManager.logInWithPermissions(["public_profile", "email"]).then(
      function (result) {
        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          console.log("Login Success", result.grantedPermissions.toString())
          AccessToken.getCurrentAccessToken().then((accessToken) => {
            const request = new GraphRequest('/me', {
              accessToken: accessToken.accessToken, parameters: { fields: { string: 'id, name, email,picture.type(large)' } }, httpMethod: "POST"
            }, function (error: ?Object, result: ?Object) {
              if (error) {
                console.log('Error fetching data: ', error.toString());
              } else {
                console.log('Success fetching');
                that.setState({ isLogged: true });
                that.setState({ email: result.email });
                that.setState({ image: result.picture.data.url });
                that.setState({ name: result.name });
                console.log(result);
              }
            });
            new GraphRequestManager().addRequest(request).start();
          })
        }
      },
      function (error) {
        console.log("Login fail with error: " + error);
      }
    );
  }

  loginWithFacebook(accessToken) {
    const request = new GraphRequest('/me', {
      accessToken, parameters: { fields: { string: 'id, name, email, first_name, last_name, gender,picture' } }, httpMethod: "POST"
    }, function (error: ?Object, result: ?Object) {
      if (error) {
        console.log('Error fetching data: ', error.toString());
      } else {
        console.log('Success fetching data: ', result);
      }
    });

    new GraphRequestManager().addRequest(request).start();
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
          <LoginButton permissions={["public_profile", "email", "pages_show_list"]}
            onLoginFinished={
              (error, result) => {
                if (error) {
                  console.log("login has error: " + error);
                } else if (result.isCancelled) {
                  console.log("login is cancelled.");
                } else {
                  console.log(result);
                  AccessToken.getCurrentAccessToken().then(
                    (data) => {
                      console.log(data);
                      console.log(data.accessToken.toString())
                      this.loginWithFacebook(data.accessToken);
                    }
                  )
                }
              }
            }
            onLogoutFinished={() => console.log("logout.")} />


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
            <TouchableOpacity onPress={() => this.loginWithFacebookAlt()} style={styles.image}>
              <Image
                style={styles.socialIcon}
                source={images.FACEBOOK_ICON}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => signIn()} style={styles.image}>
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