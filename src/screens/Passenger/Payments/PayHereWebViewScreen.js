import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import WebViewModal from '../../../components/WebViewModal'
import { AppForm, AppFormInput, SubmitButton } from '../../../components/forms';
import { Button, Modal } from 'react-native-paper';
import { WebView } from 'react-native-webview';
import config from '../../../utils/config';

const AddPaymentMethodScreen = ({ route, navigation, URL, method }) => {

    const postParams = {
        merchant_id: config.PAYHERE_MERCHANT_ID,
        return_url: config.PAYHERE_RETURN_URL,
        cancel_url: config.PAYHERE_CANCEL_URL,
        notify_url: config.PAYHERE_RETURN_URL,
        first_name: route.params.first_name,
        last_name: route.params.last_name,
        email: route.params.email,
        phone: route.params.phone,
        address: route.params.address,
        city: config.APP_CITY,
        country: config.APP_COUNTRY,
        order_id: "ORDERID1",
        items: "ITEM1",
        currency: config.APP_CURRENCY
    }

    const params = new URLSearchParams(postParams).toString();

    return (
        <>
            <WebView
                source={{ uri: URL, method: method, body: params }}
            />
        </>

    )
}

export default AddPaymentMethodScreen

const styles = StyleSheet.create({})
