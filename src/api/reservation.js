import client from "./client";

const findBus = (locations) => client.post("/booking/findBus", locations);
const freeSeats = (busId,bookingDate) => client.get("/booking/getBusSeat/"+busId+"/"+bookingDate);

export default {
    findBus,
    freeSeats,
}