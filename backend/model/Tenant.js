const mongoose = require('mongoose');
const RentDetailsSchema = require('./RentDetails'); 

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
        default: Date.now()
    },
    endDate: {
        type: Date
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    },
    rentHistory:[{
        type:mongoose.Schema.Types.ObjectId ,
        ref:"RentDetails" ,
        default:[]
    }] ,
   
});

module.exports = mongoose.model('Tenant', TenantSchema);
