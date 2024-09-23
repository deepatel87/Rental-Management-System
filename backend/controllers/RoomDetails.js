const Room = require('../model/RoomDetails');
const User = require("../model/User") ;
const Admin = require("../model/Admin")
const {uploadImageToCloudinary} = require("../utils/imageUploader")
const Request = require("../model/Request")
const RentDetails = require('../model/RentDetails'); 


exports.createRoom = async (req, res) => {
    try {
        const { type, price, additionalDetails  , details , address} = req.body;
        console.log(req.files)

        const image = req.files.image ;
        console.log(image)
        const roomImage = await uploadImageToCloudinary(image , process.env.FOLDER_NAME) ;
        console.log(roomImage)
        const roomUrl = roomImage.secure_url;

        const newRoom = new Room({
            type,
            rent:price,
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

        await admin.save();

        res.status(200).json({
            data:newRoom ,
            success:true , 
            message:"Done"

        });
    } catch (err) {
        console.log(err)
        res.status(500).json({ 
            success:false ,
            error: err.message 
        });
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
            return res.status(404).json({
                 success:false ,
                 message: "Room not found" });
        }

        res.status(200).json(updatedRoom);
    } catch (err) {
        res.status(500).json({
            success:false , 
            error: err.message
         });
    }
};


exports.removeTenantFromRoom = async (req, res) => {
    try {
        const { roomId } = req.body;

        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({ message: "Room not found"  , success:false});
        }
        console.log(room)

        const tenantId = room.tenant;
        console.log(tenantId)


        await RentDetails.deleteMany({ tenantId: tenantId });

        const updatedRoom = await Room.findByIdAndUpdate(
            roomId,
            {
                tenant: null,
            },
            { new: true } 
        );

        res.status(200).json({ message: "Tenant removed successfully", updatedRoom , success:true });
    } catch (err) {
        res.status(500).json({ error: err.message  , success:false});
    }
};

exports.deleteRoom = async (req, res) => {
    try {
        const { roomId } = req.body;
        console.log(roomId)

        const deletedRoom = await Room.findByIdAndDelete(roomId);

        if (!deletedRoom) {
            return res.status(404).json({ message: "Room not found" , success:false });
        }

        await Request.deleteMany({ houseId: roomId });




        res.status(200).json({ message: "Room deleted successfully"  , success:true});
    } catch (err) {
        res.status(500).json({ error: err.message , success:false });
    }
};






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

