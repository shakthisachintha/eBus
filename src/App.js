import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import NFC, { NfcDataType, NdefRecordType } from "react-native-nfc";
import { ToastAndroid, ActivityIndicator, View, Modal } from "react-native";
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
            // EventRegister.removeAllListeners();
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
})

const App = () => {

  const [user, setUser] = useState();
  const [activeTrip, setActiveTrip] = useState(null);
  const [tripCreating, setTripCreating] = useState(false);
  const [tripCompleting, setTripCompleting] = useState(false);
  const [mostRecentTrip, setMostRecentTrip] = useState(null);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  }

  const handleTrip = async (bus) => {
    const granted = await Location.requestPermission({ android: { detail: "fine" } });
    if (!granted) return;

    let at = await getActiveTrip();
    setActiveTrip(at);

    // If there is no any active trips we will create a new trip
    if (at == null) {
      setTripCompleting(false);
      setTripCreating(true);
      const { latitude, longitude } = { latitude: 6.9026259, longitude: 79.8621308 }; //colombo campus bus station
      // const { latitude, longitude } = { latitude: 6.8790514, longitude: 79.8735455 }; //kirulapone bus halt
      // const { latitude, longitude } = { latitude: 6.8690311, longitude: 79.890053 }; //Nugegoda bus halt
      // const { latitude, longitude } = await Location.getLatestLocation();

      console.log("creating trip")
      const new_trip = await tripAPI.create({ bus, start: { lat: latitude, lng: longitude } });
      if (!new_trip.ok) alert("Error occured when creating trip");
      setActiveTrip(new_trip.data);
      ToastAndroid.show("New trip created.", ToastAndroid.SHORT);
      bus = null;
    }

    // If there is an active trip we end the active trip
    if (at != null) {
      setTripCreating(false);
      setTripCompleting(true);

      // const { latitude, longitude } = await Location.getLatestLocation();
      // const { latitude, longitude } = { latitude: 6.9026259, longitude: 79.8621308 }; //colombo campus bus station
      const { latitude, longitude } = { latitude: 6.8572709, longitude: 79.9088819 }; //Wijerama bus station
      // const { latitude, longitude } = { latitude: 6.8790514, longitude: 79.8735455 }; //kirulapone bus halt

      const end_trip = await tripAPI.end({ tripID: at._id, location: { lat: latitude, lng: longitude } });
      if (!end_trip.ok) return alert("Error occured while completing the trip");
      setMostRecentTrip(end_trip.data);
      setActiveTrip(null);
      ToastAndroid.show("Trip Completed Successfully.", ToastAndroid.SHORT);
      bus = null;
    }

  }

  const getActiveTrip = async () => {
    const result = await tripAPI.activeTrip();
    if (!result.ok) return;
    setActiveTrip(result.data);
    return result.data;
  }

  useEffect(() => {
    restoreUser();
    getActiveTrip();

    if (bus != null) {
      handleTrip(bus);
    };

    const x = EventRegister.addEventListener("tagScanned", bus => {
      if (tripCreating || tripCompleting) return;
      handleTrip(bus);
      bus = null;
    });
    return () => {
      EventRegister.removeEventListener(x);
    }
  }, []);


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
