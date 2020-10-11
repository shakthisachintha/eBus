import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AppForm, AppFormInput, SubmitButton } from '../../../components/forms';
import { Button, Modal, ActivityIndicator } from 'react-native-paper';
import { WebView } from 'react-native-webview';
import config from '../../../utils/config';
import colors from '../../../utils/colors';

const PayHereWebViewScreen = ({ navigation, route }) => {


    const user = route.params;
    const [first_name, last_name] = `${user.name} eBus`.split(" ", 2);
    const postParams = {
        merchant_id: config.PAYHERE_MERCHANT_ID,
        return_url: config.PAYHERE_RETURN_URL,
        cancel_url: config.PAYHERE_CANCEL_URL,
        notify_url: config.PAYHERE_NOTIFY_URL,
        first_name,
        last_name,
        email: user.email,
        phone: "0774345234",
        address: `${user.name},${config.APP_ADDRESS}`,
        city: config.APP_CITY,
        country: config.APP_COUNTRY,
        order_id: `ORDER_${user.id}`,
        items: " ",
        custom_1: user.id,
        currency: config.APP_CURRENCY
    }
    console.log(postParams);
    const params = new URLSearchParams(postParams).toString();

    const handleRedirect = (event) => {
        const { data } = event.nativeEvent;
        navigation.navigate("Wallet", { item: null });
        alert(data);
    }

    return (
        <WebView
            onMessage={handleRedirect}
            scalesPageToFit={true}
            containerStyle={{ paddingVertical: 35 }}
            startInLoadingState={true}
            renderLoading={() => <ActivityIndicator size="large" />}
            source={{ uri: config.PAYHERE_PREAPPROVE_URL, method: "post", body: params }}
        />
    )
}

export default PayHereWebViewScreen

const styles = StyleSheet.create({

})
