import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import NFC, { NfcDataType, NdefRecordType } from "react-native-nfc";
import { ToastAndroid } from "react-native";
import { EventRegister } from 'react-native-event-listeners'
import Location from 'react-native-location';

import AuthNavigator from './navigations/AuthNavigator';
import DashboardNavigator from './navigations/DashboardNavigator';
import navigationTheme from './navigations/navigationTheme';


import AuthContext from './auth/context';
import authStorage from './auth/storage';
import useLocation from './hooks/useLocation';



let bus = null;
let hash = null;

NFC.addListener(async (payload) => {
  switch (payload.type) {
    case NfcDataType.NDEF:
      let messages = payload.data;
      for (let i in messages) {
        let records = messages[i];
        for (let j in records) {
          let r = records[j];
          if (r.type === NdefRecordType.TEXT) {
            const rec = r.data.split(" ");
            bus = rec[0];
            hash = rec[1];
            EventRegister.emit("tagScanned", bus);
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

  const createTrip = async (bus) => {
    const granted = await Location.requestPermission({ android: { detail: "fine" } });
    if (!granted) return;
    const { latitude, longitude } = await Location.getLatestLocation();
    console.log({ location: { latitude, longitude }, bus });
  }

  useEffect(() => {

    restoreUser();

    if (bus != null) {
      createTrip(bus);
    };

    EventRegister.addEventListener("tagScanned", bus => {
      createTrip(bus);
    });

    return () => {
      EventRegister.removeAllListeners();
    }

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
