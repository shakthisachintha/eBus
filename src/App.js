import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import NFC, { NfcDataType, NdefRecordType } from "react-native-nfc";
import { ToastAndroid } from "react-native";


import AuthNavigator from './navigations/AuthNavigator';
import DashboardNavigator from './navigations/DashboardNavigator';
import navigationTheme from './navigations/navigationTheme';


import AuthContext from './auth/context';
import authStorage from './auth/storage';


let bus = null;
let hash = null;

NFC.addListener((payload) => {
  switch (payload.type) {
    case NfcDataType.NDEF:
      let messages = payload.data;
      for (let i in messages) {
        let records = messages[i];
        for (let j in records) {
          let r = records[j];
          if (r.type === NdefRecordType.TEXT) {
            const rec = r.data.split(" ");
            bus = rec[1];
            hash = rec[2];
            alert(bus);
            console.log(r);
          } else {
            ToastAndroid.show(
              `Non-TEXT tag of type ${r.type} with data ${r.data}`,
              ToastAndroid.SHORT
            );
          }
        }
      }
      break;
    case NfcDataType.TAG:
      ToastAndroid.show(
        `The TAG is non-NDEF:\n\n${payload.data.description}`,
        ToastAndroid.SHORT
      );
      break;
  }
});


const App = () => {

  const [user, setUser] = useState();

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  }

  useEffect(() => {
    restoreUser();
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer theme={navigationTheme}>
        {user ? <DashboardNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  )
}

export default App
