import client from "./client";

const findBus = (locations) => client.post("/booking/findBus", locations);
const freeSeats = (busId,bookingDate) => client.get("/booking/getBusSeat/"+busId+"/"+bookingDate);
const getBusNo = (busId) => client.get("/booking/findBusById/"+busId);
export default {
    findBus,
    freeSeats,
    getBusNo,
}