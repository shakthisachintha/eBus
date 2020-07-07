import client from "./client";

const getPaymentMethods = () => client.post("/payment/methods");

export default {
    getPaymentMethods,
}