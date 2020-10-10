import client from "./client";

const findBus = (locations) => client.post("/booking/findBus", locations);
const freeSeats = (busId,bookingDate) => client.get("/booking/getBusSeat/"+busId+"/"+bookingDate);
const getBusNo = (busId) => client.get("/booking/findBusById/"+busId);
const bookSeats = (busId,bookingDate,numOfSeats) => client.get("/booking//bookSeat/"+busId+"/"+bookingDate+"/"+numOfSeats);
const getReservations = (userId) => client.get("/booking/viewreservations/"+userId);
const getResDetails = (resId) => client.get("/booking/viewreservationdetails/"+resId);
const deleteRes = (resId) => client.get("/booking/deleteres/"+resId);
export default {
    findBus,
    freeSeats,
    getBusNo,
    bookSeats,
    getReservations,
    getResDetails,
    deleteRes,
}