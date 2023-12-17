import mongoose from "mongoose";


// Define the schema for the launches collection
const launchesSchema = new mongoose.Schema({
    flightNumber: {
        type: Number,
        required: true,
    },
    launchDate: {
        type: Date,
        required: true,
    },
    mission: {
        type: String,
        required: true,
    },
    rocket: {
        type: String,
        required: true,
    },
    target: {
        type: String,
        required: true,
    },
    customer: [String],
    upcoming: {
        type: Boolean,
        required: true,
    },
    success: {
        type: Boolean,
        required: true,
        default: true,
    },
});

// Connenct the launchesSchema with the "launches" collection
export const launches = mongoose.model('Launch', launchesSchema);