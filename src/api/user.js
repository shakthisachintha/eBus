import client from "./client";

const register = (userInfo) => client.post("/user/register", userInfo);
const updateDetails = (userInfo) => client.post("/user/update", userInfo);
const updatePassword = (userInfo) => client.post("/user/changepassword", userInfo);

const facebookRegister = (userInfo) => client.post("/user/register/facebook", userInfo);

export default {
    register,
    facebookRegister,
    updateDetails,
    updatePassword
}