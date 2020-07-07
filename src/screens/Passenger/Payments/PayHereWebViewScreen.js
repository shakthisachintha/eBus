import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AppForm, AppFormInput, SubmitButton } from '../../../components/forms';
import { Button, Modal, ActivityIndicator } from 'react-native-paper';
import { WebView } from 'react-native-webview';
import config from '../../../utils/config';
import colors from '../../../utils/colors';

const PayHereWebViewScreen = ({ route, navigation }) => {

    const postParams = {
        merchant_id: config.PAYHERE_MERCHANT_ID,
        return_url: config.PAYHERE_RETURN_URL,
        cancel_url: config.PAYHERE_CANCEL_URL,
        notify_url: config.PAYHERE_NOTIFY_URL,
        first_name: route.params.first_name,
        last_name: route.params.last_name,
        email: route.params.email,
        phone: route.params.phone,
        address: route.params.address,
        city: config.APP_CITY,
        country: config.APP_COUNTRY,
        order_id: "ORDERID1",
        items: "ITEM1",
        custom_1: route.params.userID,
        currency: config.APP_CURRENCY
    }

    const params = new URLSearchParams(postParams).toString();
    console.log(params);

    const handleRedirect = (event) => {
        const { data } = event.nativeEvent;
        navigation.goBack();
        alert(data);
    }

    return (
        <WebView
            onMessage={handleRedirect}
            scalesPageToFit={true}
            containerStyle={{ paddingVertical: 35 }}
            startInLoadingState={true}
            renderLoading={() => <ActivityIndicator size="large" />}
            source={{ uri: route.params.URL, method: "post", body: params }}
        />
    )
}

export default PayHereWebViewScreen

const styles = StyleSheet.create({

})
