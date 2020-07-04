import client from "./client";

const endpoint = '/user';

const getMyDetails = () => client.get(endpoint);

export default {
    getMyDetails
}