import client from "./client";

const findBus = (locations) => client.post("/booking/findBus", locations);


export default {
    findBus,
}