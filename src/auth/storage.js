import React from 'react'
import RNSecureKeyStore, { ACCESSIBLE } from "react-native-secure-key-store";
import ErrorHandler from '../components/ErrorHandler';
import jwtDecode from 'jwt-decode';


const key = "authToken";

const storeToken = async authToken => {
    try {
        return await RNSecureKeyStore.set(key, authToken, { accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY })
    } catch (error) {
        <ErrorHandler error={error} />
    }
}

const getToken = async () => {
    try {
        return await RNSecureKeyStore.get(key);
    } catch (error) {
        <ErrorHandler error={error} />
    }
}

const removeToken = async () => {
    try {
        return await RNSecureKeyStore.remove(key);
    } catch (error) {
        <ErrorHandler error={error} />
    }
}

const getUser = async () => {
    const token = await getToken();
    return (token) ? jwtDecode(token) : null;
}

export default {
    getUser,
    getToken,
    storeToken,
    removeToken
}