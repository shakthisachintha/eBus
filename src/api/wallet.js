import client from "./client";

const endpoint = '/wallet';

const getPaymentMethods = () => client.get(endpoint);

export default {
    getPaymentMethods
}