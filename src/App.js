import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthNavigator from './navigations/AuthNavigator';
import navigationTheme from './navigations/navigationTheme';
import AppV2 from './screens/Passenger/AppV2';


class App extends React.Component {

  render() {
    return (
      <AppV2 />
      // {/* <NavigationContainer theme={navigationTheme}>
      //   <AuthNavigator />
      // </NavigationContainer> */}
    );
  }
};

export default App;