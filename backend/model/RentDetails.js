const mongoose = require("mongoose");

const RentDetailsSchema = new mongoose.Schema({
    tenantId: { // Change userId to tenantId
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tenant', // Reference to Tenant instead of User
        required: true
    },
    amount: {
        type: String,
    },
    forMonth: {
        type: Date,
        required: true
    },
    dateOfPayment: {
        type: Date,
        default: null
    },
    status: {
        type: String,
        enum: ['Paid', 'Unpaid'],
        default: 'Unpaid'
    }
});

module.exports = mongoose.model('RentDetails', RentDetailsSchema);
