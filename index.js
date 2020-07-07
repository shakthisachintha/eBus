import * as React from 'react';
import { AppRegistry } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import App from './src/App';
import colors from './src/utils/colors';

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(["Picker has been extracted from react-native core and will be removed in a future release."]);


const theme = {
  ...DefaultTheme,
  dark: true,
  roundness: 15,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    // accent: colors.primary,
    // background: colors.gray,
    surface: colors.mediumGray,
    text: colors.darkGray,
    disabled: '#393e46',
    // placeholder: '#393e46',
    backdrop: colors.gray,
  },
};

export default function Main() {
  return (
    <PaperProvider theme={theme}>
      <App></App>
    </PaperProvider>
  );
};

AppRegistry.registerComponent(appName, () => Main);