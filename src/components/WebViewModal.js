import React, { useState } from 'react'
import { StyleSheet, Text, View, Modal } from 'react-native'
import { WebView } from 'react-native-webview';
import { Button } from 'react-native-paper';

const WebViewModal = ({ isVisible, URL, method, bodyParams }) => {
    const params = new URLSearchParams(bodyParams).toString();
    return (
        <View>
            <Modal animated={true} animationType="slide" visible={isVisible}>
                <WebView
                    startInLoadingState={true}
                    source={{ uri: URL, method: method, body: params }}
                    style={{ marginTop: 20 }}
                />
                <Button onPress={() => setVisible(false)}>Dismiss</Button>
            </Modal>

        </View>
    )
}

export default WebViewModal

const styles = StyleSheet.create({})
