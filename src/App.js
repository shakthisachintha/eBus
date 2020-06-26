import React from 'react';
import {
  View,
  Text,
} from 'react-native';

import {Router , Scene} from 'react-native-router-flux';

import LoadingScreen from './screens/loadingScreen';
import IndexScreen from './screens/index';
import Login from './components/Login';
import ResetPassword from './components/resetPassword';
import VerifyPassword from './components/verifyPassword';
import NewPassword from './components/NewPassword';
class App extends React.Component{
  render(){
    return(
      <Router>
        <Scene key="root">
            <Scene key="loading" component={LoadingScreen} hideNavBar={true} initial={true}></Scene>
            <Scene key="index" component={IndexScreen} hideNavBar={true}></Scene>
            <Scene key="login" component={Login} hideNavBar={true}></Scene>
            <Scene key="reset" component={ResetPassword} hideNavBar={true}></Scene>
            <Scene key="verify" component={VerifyPassword} hideNavBar={true}></Scene>
            <Scene key='submit' component={NewPassword} hideNavBar={true}></Scene>
        </Scene>
      </Router>
    );
  }
};

export default App;