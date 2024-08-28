const mongoose = require('mongoose');

const TenantSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RoomDetails',
        required: true
    },
    startDate: {
        type: Date,
        default: Date.now()
    },
    endDate: {
        type: Date
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    }
});

module.exports = mongoose.model('Tenant', TenantSchema);
