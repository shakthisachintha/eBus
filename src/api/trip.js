import React from 'react'

import client from "./client";

const ActiveTripContext = React.createContext();

const create = (data) => client.post("/trip/new", data);
const update = (data) => client.post("/trip/update", data);
const end = (data) => client.post("/trip/end", data);
const currentTrip = () => client.get("trip/current");
const tripSummary = (tripID) => client.post("trip/summary", { trip: tripID });
const recentTrips = () => client.get("trip/recent");

export default {
    ActiveTripContext,
    create,
    update,
    end,
    currentTrip,
    tripSummary,
    recentTrips
}