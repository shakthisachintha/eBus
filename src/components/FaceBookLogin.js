import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk'
import ErrorHandler from './ErrorHandler'

const FaceBookLogin = ({ loginSuccessCallback, loading }) => {

    return (
        <Button icon="facebook"
            contentStyle={styles.facebookButton}
            labelStyle={styles.facebookButtonLabel}
            mode="contained"
            color="dodgerblue"
            loading={loading}
            onPress={() => { loginWithFacebook(loginSuccessCallback) }}
        >
            Facebook
        </Button>
    )
}

function loginWithFacebook(successCallback) {

    LoginManager.logInWithPermissions(["public_profile", "email"]).then(
        function (result) {
            if (result.isCancelled) {
                ErrorHandler(new Error("Login Cancelled!"))
                console.log("Login cancelled");
            } else {
                AccessToken.getCurrentAccessToken().then((accessToken) => {
                    const request = new GraphRequest('/me', {
                        accessToken: accessToken.accessToken, parameters: { fields: { string: 'id, name, email,picture.type(large)' } }, httpMethod: "POST"
                    }, function (error, result) {

                        if (error) {
                            ErrorHandler(error);
                        } else {
                            // console.log(result);
                            const user = {
                                name: result.name,
                                email: result.email,
                                image: result.picture.data.url,
                                authProvider: 'facebook'
                            }
                            successCallback(user)
                        }
                    });
                    new GraphRequestManager().addRequest(request).start();
                }).catch((reson) => {
                    ErrorHandler(reason);
                })
            }
        },
        function (error) {
            ErrorHandler(error);
        }
    ).catch(reason => {
        ErrorHandler(reason)
    });
}


export default FaceBookLogin

const styles = StyleSheet.create({})
