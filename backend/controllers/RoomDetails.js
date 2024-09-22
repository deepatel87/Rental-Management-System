const Room = require('../model/RoomDetails');
const User = require("../model/User") ;
const Admin = require("../model/Admin")
const {uploadImageToCloudinary} = require("../utils/imageUploader")

exports.createRoom = async (req, res) => {
    try {
        const { type, rent, additionalDetails  , details , address} = req.body;
        console.log(req.files)

        


        const image = req.files.image ;
        console.log(image)
        const roomImage = await uploadImageToCloudinary(image , process.env.FOLDER_NAME) ;
        console.log(roomImage)
        const roomUrl = roomImage.secure_url;

        const newRoom = new Room({
            type,
            rent,
            additionalDetails ,
            details , 
            address ,
            isAvailable:"Available" , 
            image:roomUrl
        });

        const savedRoom = await newRoom.save();
        const admin = await Admin.findOne();

        if(!admin.roomDetails){
            admin.roomDetails=[]
        }

        if (!admin) {
            return res.status(404).json({ success: false, message: 'Admin not found' });
        }

        admin.roomDetails.push(savedRoom._id);

        // Save the updated admin document
        await admin.save();

        res.status(200).json({
            data:newRoom ,
            success:true , 
            message:"Done"

        });
    } catch (err) {
        console.log(err)
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

        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }
        console.log(room)

        const tenantId = room.tenant; // Get the tenant ID from the room
        console.log(tenantId)


        await RentDetails.deleteMany({ tenantId: tenantId });

        // const updatedRoom = await Room.findByIdAndUpdate(
        //     roomId,
        //     {
        //         tenant: null,
        //         numberOfPeople: 0        
        //     },
        //     { new: true } 
        // );

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
    const { userId, roomId } = req.body;

    if (!userId || !roomId) {
        return res.status(400).json({
            success: false,
            message: "Missing Parameters"
        });
    }

    try {
        const admin = await Admin.findOne(); 
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


const RentDetails = require('../model/RentDetails'); // Assuming RentDetails is the model where rent entries are stored.

exports.updateRentStatus = async (req, res) => {
    try {
        const { rentHistoryId } = req.body;

        if (!rentHistoryId) {
            return res.status(400).json({ success: false, message: "Rent history ID is required" });
        }

        const rentEntry = await RentDetails.findById(rentHistoryId);

        if (!rentEntry) {
            return res.status(404).json({ success: false, message: "Rent entry not found" });
        }

        if (rentEntry.status === "Paid") {
            return res.status(400).json({ success: false, message: "Rent is already paid" });
        }

        rentEntry.status = "Paid";
        rentEntry.dateOfPayment = new Date();

        await rentEntry.save();

        res.status(200).json({
            success: true,
            message: "Rent status updated to Paid successfully",
            data: rentEntry
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

