import client from "./client";

const register = (userInfo) => client.post("/user/register", userInfo);

const facebookRegister = (userInfo) => client.post("/user/register/facebook", userInfo);

export default {
    register,
    facebookRegister
}