import SecureStore from '@react-native-community/async-storage';
import ErrorHandler from '../components/ErrorHandler';

const key = "authToken";

const storeToken = async authToken => {
    try {
        await SecureStore.setItem(key, authToken)
    } catch (error) {
        <ErrorHandler error={error} />
    }
}

const getToken = async () => {
    try {
        return await SecureStore.getItem(key);
    } catch (error) {
        <ErrorHandler error={error} />
    }
}

const removeToken = async () => {
    try {
        return await SecureStore.removeItem(key);
    } catch (error) {
        <ErrorHandler error={error} />
    }
}

export default {
    storeToken,
    getToken,
    removeToken
}