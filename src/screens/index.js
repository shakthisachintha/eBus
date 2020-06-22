import React from 'react';
import {View, Text} from 'react-native';

import {TextInput} from 'react-native-paper';

const IndexScreen = () => {
  return (
    <View style={{padding: 10}}>
      <Text style={{fontSize: 18, alignSelf: 'center'}}>Welcome to eBus</Text>
      <TextInput label="Name" mode="outlined" />
    </View>
  );
};

export default IndexScreen;
