import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Appbar, TextInput, Button } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';

export default class SetNewPasswordScreen extends React.Component {

    sendBack() {
        Actions.replace('verify');
    }
    success() {
        Actions.replace('login');
    }
    render() {
        return (
            <View style={styles.container}>
                <Appbar.Header style={{ backgroundColor: 'purple' }}>
                    <Appbar.BackAction onPress={() => this.sendBack()} />
                    <Appbar.Content
                        title="New Password"
                    />
                </Appbar.Header>
                <View>
                    <Text style={{ alignSelf: 'center', marginTop: 10, fontSize: 16, color: 'grey' }}>Please Enter new Password</Text>
                    <TextInput
                        style={{ marginTop: 20, marginHorizontal: 20, borderColor: 'white' }}
                        placeholder='Enter New Password'
                        mode="flat"
                    />
                    <TextInput
                        style={{ marginTop: 20, marginHorizontal: 20, borderColor: 'white' }}
                        placeholder='Re-enter Password'
                        mode="flat"
                    />
                    <TouchableOpacity onPress={() => this.success()}>
                        <Button icon="forward" mode="contained" style={{ width: 300, alignSelf: 'center', marginTop: 20, backgroundColor: 'purple' }}>Submit</Button>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});