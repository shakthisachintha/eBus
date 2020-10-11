import client from "./client";

const getPaymentMethods = () => client.post("/payment/methods");
const getWallet = () => client.get("/payment/wallet");

export default {
    getPaymentMethods,
    getWallet
}