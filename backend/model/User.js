const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    }, 
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    aadharImage: {
        type: String,
    },
    aadharNumber: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
    },
    roomDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RoomDetails"
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    relative: {
        type: String,
    },
    relativeNumber: {
        type: String
    },
    relation: {
        type: String
    },
    work: {
        type: String
    },
    occupation: {
        type: String
    },
    noOfPeople: {
        type: Number
    }
});

module.exports = mongoose.model("User", UserSchema);
