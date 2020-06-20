import React from 'react';
import {
  View,
  Text,
} from 'react-native';

import {Router , Scene} from 'react-native-router-flux';

import LoadingScreen from './screens/loadingScreen';
import IndexScreen from './screens/index';

class App extends React.Component{
  render(){
    return(
      <Router>
        <Scene key="root">
            <Scene key="loading" component={LoadingScreen} hideNavBar={true} initial={true}></Scene>
            <Scene key="index" component={IndexScreen} hideNavBar={true}></Scene>
        </Scene>
      </Router>
    );
  }
};

export default App;