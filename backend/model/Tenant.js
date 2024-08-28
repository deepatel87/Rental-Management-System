const mongoose = require('mongoose');
const RentDetailsSchema = require('./RentDetails'); // Adjust the path as needed

const TenantSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RoomDetails',
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    },
    rentDetails: {
        type: [RentDetailsSchema],
        default: function() {
            return [{
                amount: 0, 
                status: 'Unpaid'
            }];
        }
    }
});

module.exports = mongoose.model('Tenant', TenantSchema);
