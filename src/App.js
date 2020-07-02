import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthNavigator from './navigations/AuthNavigator';
import navigationTheme from './navigations/navigationTheme';
import Login from './screens/Authentication/Login';


class App extends React.Component {
  render() {
    return (
      // <Login />
      <NavigationContainer theme={navigationTheme}>
        <AuthNavigator />
      </NavigationContainer>
    );
  }
};

export default App;