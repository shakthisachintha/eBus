import client from "./client";

const endpoint = '/user';

const getMyDetails = () => client.get("/user/me");

export default {
    getMyDetails
}