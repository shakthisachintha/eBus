import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import NFC, { NfcDataType, NdefRecordType } from "react-native-nfc";
import { ToastAndroid, ActivityIndicator, View, ViewBase, Modal, AppRegistry } from "react-native";
import { EventRegister } from 'react-native-event-listeners'
import Location from 'react-native-location';
import LottieView from 'lottie-react-native';

import AuthNavigator from './navigations/AuthNavigator';
import DashboardNavigator from './navigations/DashboardNavigator';
import navigationTheme from './navigations/navigationTheme';

import AuthContext from './auth/context';
import authStorage from './auth/storage';

import tripAPI from './api/trip';
import AppText from './components/AppText';
import colors from './utils/colors';
import animations from './utils/animations';

let bus = null;
let hash = null;
const { ActiveTripContext } = tripAPI;

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
  const [activeTrip, setActiveTrip] = useState(null);
  const [tripCreating, setTripCreating] = useState(false);
  const [tripCompleting, setTripCompleting] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  }

  const createTrip = async (bus) => {
    setTripCreating(true);
    const granted = await Location.requestPermission({ android: { detail: "fine" } });
    if (!granted) return;
    const { latitude, longitude } = await Location.getLatestLocation();

    try {
      const trip = await tripAPI.create({ bus, start: { lat: latitude, lng: longitude } });
      if (!trip.ok) alert("Error occured");
      setActiveTrip(trip.data);
      // console.log(trip.data);
      ToastAndroid.show("New trip created.", ToastAndroid.SHORT);
    } catch (error) {
      alert("Error occured");
    }
    // console.log({ location: { latitude, longitude }, bus });
  }

  const completeTrip = () => {
    // bus = null;
    setActiveTrip(null);
    setTripCompleting(true);
  }

  useEffect(() => {

    restoreUser();

    if (bus != null) {
      createTrip(bus);
    };

    EventRegister.addEventListener("tagScanned", bus => {
      console.log(activeTrip);
      if (activeTrip == null) {
        createTrip(bus);
      } else {
        completeTrip()
      }
    });

    return () => {
      EventRegister.removeAllListeners();
    }

  }, [])


  return (
    <>
      <Modal animationType="fade" visible={tripCreating} >
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator size="large" color={colors.primary} />
          <LottieView speed={1.5} style={{ width: "100%" }} source={animations.TRIP_START} loop={false} autoPlay onAnimationFinish={() => setTripCreating(false)} />
          <AppText style={{ margin: 15 }}>Creating Trip ...</AppText>
        </View>
      </Modal>

      <Modal animationType="fade" visible={tripCompleting}>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator size="large" color={colors.primary} />
          <LottieView speed={0.5} style={{ width: "100%" }} source={animations.TRIP_COMPLETE} loop={false} autoPlay onAnimationFinish={() => setTripCompleting(false)} />
          <AppText style={{ margin: 15 }}>Trip Completed!</AppText>
        </View>
      </Modal>

      <AuthContext.Provider value={{ user, setUser }}>
        <NavigationContainer theme={navigationTheme}>
          <ActiveTripContext.Provider value={{ activeTrip, setActiveTrip }}>
            {user ? <DashboardNavigator /> : <AuthNavigator />}
          </ActiveTripContext.Provider>
        </NavigationContainer>
      </AuthContext.Provider>
    </>
  )
}

export default App
