const mongoose = require("mongoose");

const RentDetailsSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    dateOfPayment: {
        type: Date,
        default: null // Set to null if not paid yet
    },
    status: {
        type: String,
        enum: ['Paid', 'Unpaid'],
        default: 'Unpaid'
    }
});

module.exports = RentDetailsSchema;
