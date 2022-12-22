const mongoose = require('mongoose');

//Schema Design 
const tourSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Tour title is required!"],
        trim: true,
        minLength: [3, "Title must be at least 3 character"],
        maxLength: [150, "Title is too long"],
    },
    tourSpot: {
        type: String,
        required: [true, "Tour spot is required!"],
        trim: true,
        minLength: [3, "Tour spot must be at least 3 character"],
    },
    duration: {
        type: String,
        required: true,
        trim: true,
        minLength: [1, "Duration must be at least 1 character"],
        maxLength: [150, "Title is too long"],
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: [0, "Price can't be negetive"],
    },
    bookingStatus: {
        type: String,
        required: true,
        enum: {
            values: ["available", "closed"],
            message: "bookingStatus can't be {VALUE}"
        }
    },
    sitCapacity: Number,
    remainingSit: Number,
    tourStartTime: String,
    contact: [
        {
            contactName: String,
            phone: String
        }
    ],
    views: {
        type: Number,
        default: 0
    }

}, { timestamps: true });

// Tour model
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;