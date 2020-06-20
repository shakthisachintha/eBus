import * as React from 'react';
import {AppRegistry} from 'react-native';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {name as appName} from './app.json';
import App from './src/App';

import PassegerRegistartion from './src/screens/passengerRegistration'

const theme = {
  ...DefaultTheme,
  dark: true,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    roundness: 10,
    primary: '#222831',
    accent: '#393e46',
    background: '#393e46',
    surface: '#393e46',
    text: '#393e46',
    disabled: '#393e46',
    placeholder: '#393e46',
    backdrop: '#393e46',
  },
};

export default function Main() {
  return (
    <PaperProvider theme={theme}>
      {/* <App /> */}
      <PassegerRegistartion />

    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => PassegerRegistartion);
