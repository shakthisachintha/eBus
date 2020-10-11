import client from "./client";

const getPaymentMethods = () => client.post("/payment/methods");
const getWallet = () => client.get("/payment/wallet");
const setPrimaryMethod = (methodID) => client.post("payment/set-primary-method", { methodID })
const removePaymentMethod = (methodID) => client.post("payment/remove-method", { methodID })

export default {
    getPaymentMethods,
    getWallet,
    setPrimaryMethod,
    removePaymentMethod
}