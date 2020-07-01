import React from 'react';

// import { Router, Scene } from 'react-native-router-flux';
import { NavigationContainer } from '@react-navigation/native';

// import LoadingScreen from './screens/loadingScreen';
// import IndexScreen from './screens/index';
// import LoginScreen from './screens/LoginScreen';
// import ResetPasswordScreen from './screens/ResetPasswordScreen';
// import VerifyPassword from './screens/verifyPassword';
// import NewPassword from './screens/NewPassword';
// import Dashboard from './screens/Dashboard';
import AuthNavigator from './navigations/AuthNavigator';


class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
      /* <Router>
        <Scene key="root">
            <Scene key="loading" component={LoadingScreen} hideNavBar={true} initial={true}></Scene>
            <Scene key="index" component={IndexScreen} hideNavBar={true}></Scene>
            <Scene key="login" component={LoginScreen} hideNavBar={true}></Scene>
            <Scene key="reset" component={ResetPassword} hideNavBar={true}></Scene>
            <Scene key="verify" component={VerifyPassword} hideNavBar={true}></Scene>
            <Scene key='submit' component={NewPassword} hideNavBar={true}></Scene>
            <Scene key='dashbord' component={Dashboard} hideNavBar={true}></Scene>
        </Scene>
      </Router> */
    );
  }
};

export default App;