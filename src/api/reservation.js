import client from "./client";

const findBus = (locations) => client.post("/booking/findBus", locations);
const freeSeats = (busId,bookingDate) => client.get("/booking/getBusSeat/"+busId+"/"+bookingDate);
const getBusNo = (busId) => client.get("/booking/findBusById/"+busId);
const bookSeats = (busId,bookingDate,numOfSeats) => client.get("/booking//bookSeat/"+busId+"/"+bookingDate+"/"+numOfSeats);
export default {
    findBus,
    freeSeats,
    getBusNo,
    bookSeats,
}