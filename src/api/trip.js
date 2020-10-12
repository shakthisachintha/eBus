import React from 'react'

import client from "./client";

const ActiveTripContext = React.createContext();

const create = (data) => client.post("/trip/new", data);
const end = (data) => client.post("/trip/end", data);
const activeTrip = () => client.post("trip/active");
const tripSummary = (tripID) => client.post("trip/summary", { trip: tripID });
const recentTrips = () => client.get("trip/all-trips");

export default {
    ActiveTripContext,
    create,
    end,
    activeTrip,
    tripSummary,
    recentTrips
}