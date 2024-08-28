const Room = require('../model/RoomDetails');
const User = require("../model/User") ;
const Admin = require("../model/Admin")

exports.createRoom = async (req, res) => {
    try {
        const { type, rent, additionalDetails } = req.body;

        const newRoom = new Room({
            type,
            rent,
            additionalDetails
        });

        const savedRoom = await newRoom.save();
        res.status(201).json(savedRoom);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



exports.updateRoom = async (req, res) => {
    try {
        const { type, rent, additionalDetails  , id} = req.body;

        const updatedRoom = await Room.findByIdAndUpdate(
            id,
            { type, rent, additionalDetails },
            { new: true } 
        );

        if (!updatedRoom) {
            return res.status(404).json({ message: "Room not found" });
        }

        res.status(200).json({
            success:true ,
            message:"Room Details Updatedd Successfully"
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.addTenantToRoom = async (req, res) => {
    try {
        const { roomId, tenantId, numberOfPeople} = req.body;

        const tenant = await User.findById(tenantId);
        if (!tenant) {
            return res.status(404).json({ message: "Tenant not found" });
        }

        const updatedRoom = await Room.findByIdAndUpdate(
            roomId,
            {
                tenant: tenant._id,
                numberOfPeople: numberOfPeople
            },
            { new: true } 
        );

        if (!updatedRoom) {
            return res.status(404).json({ message: "Room not found" });
        }

        res.status(200).json(updatedRoom);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.removeTenantFromRoom = async (req, res) => {
    try {
        const { roomId } = req.body;

        const updatedRoom = await Room.findByIdAndUpdate(
            roomId,
            {
                tenant: null,           
                numberOfPeople: 0        
            },
            { new: true } 
        );

        if (!updatedRoom) {
            return res.status(404).json({ message: "Room not found" });
        }

        res.status(200).json({ message: "Tenant removed successfully", updatedRoom });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteRoom = async (req, res) => {
    try {
        const { roomId } = req.body;

        const deletedRoom = await Room.findByIdAndDelete(roomId);

        if (!deletedRoom) {
            return res.status(404).json({ message: "Room not found" });
        }

        res.status(200).json({ message: "Room deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.sendRequest = async (req, res) => {
    const { adminId, userId, roomId } = req.body; 
    if (!adminId || !userId || !roomId) {
        return res.status(400).json({
            success: false,
            message: "Missing Parameters"
        });
    }

    try {
        const admin = await Admin.findById(adminId);

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin not found"
            });
        }

        const existingRequest = admin.requests.find(req => 
            (req.reqModel === "User" && req._id.toString() === userId) ||
            (req.reqModel === "RoomDetails" && req._id.toString() === roomId)
        );

        if (existingRequest) {
            return res.status(400).json({
                success: false,
                message: "Request already exists"
            });
        }

        admin.requests.push({
            _id: userId,
            reqModel: "User"
        });

        admin.requests.push({
            _id: roomId,
            reqModel: "RoomDetails"
        });

        await admin.save();

        res.status(200).json({
            success: true,
            message: "Request added successfully",
            data: admin
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}






