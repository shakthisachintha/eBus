import NFC, { NfcDataType, NdefRecordType } from "react-native-nfc";
import React, { Component } from "react";
import { ToastAndroid, Text } from "react-native";


NFC.addListener((payload) => {

    switch (payload.type) {

        case NfcDataType.NDEF:
            let messages = payload.data;
            for (let i in messages) {
                let records = messages[i];
                for (let j in records) {
                    let r = records[j];
                    if (r.type === NdefRecordType.TEXT) {
                        alert(r.data);
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
export default class AppV2 extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Text>NFC APP</Text>
            </>
        );
    }
}