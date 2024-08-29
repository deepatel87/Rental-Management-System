const Admin = require("../model/Admin")
const Request = require("../model/Request")
const bcrypt= require("bcrypt") 



exports.addAdmin = async (req, res) => {
    try {
        const { name, password, email, roomDetails = null, requests = null, reqModel = null, tenants = null } = req.body;
        const hashedPassword = await  bcrypt.hash(password ,10) ;

        const newAdmin = new Admin({
            name,
            password:hashedPassword,
            email,
            roomDetails,
            requests :[],
            
            tenants
        });

        await newAdmin.save();

        res.status(201).json({
            success: true,
            message: 'Admin added successfully',
            admin: newAdmin
        });
    } catch (error) {
        console.error('Error adding admin:', error);

        res.status(500).json({
            success: false,
            message: 'Error adding admin',
            error: error.message
        });
    }
}; 


exports.rejectRequest = async (req, res) => {
    try {
        const { requestId } = req.body;
        console.log(requestId)


        if (!requestId) {
            return res.status(400).json({
                success: false,
                message: 'Request ID is required'
            });
        }

        // Find the request and remove it from the Request model
        const request = await Request.findByIdAndDelete(requestId);

        if (!request) {
            return res.status(404).json({
                success: false,
                message: 'Request not found'
            });
        }

        const admin = await Admin.findOneAndUpdate(
            {}, 
            { $pull: { 'requests': requestId } }, // Remove request ID from requests array
            { new: true } // Return the updated document
        );

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: 'Admin not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Request accepted and removed successfully',
            request
        });
    } catch (error) {
        console.error('Error accepting request:', error);

        res.status(500).json({
            success: false,
            message: 'Error accepting request',
            error: error.message
        });
    }
};

exports.acceptRequest = async (req, res) => {
    try {
        const { requestId } = req.body;

        if (!requestId) {
            return res.status(400).json({
                success: false,
                message: 'Request ID is required'
            });
        }

        const request = await Request.findByIdAndDelete(requestId)
            .populate('userId houseId');

        if (!request) {
            return res.status(404).json({
                success: false,
                message: 'Request not found'
            });
        }

        const admin = await Admin.findOneAndUpdate(
            {},
            { $pull: { requests: requestId } },
            { new: true }
        );

        const startDate = new Date();

        const tenant = new Tenant({
            user: request.userId._id,
            room: request.houseId._id,
            startDate: startDate,
            endDate: new Date(startDate.setMonth(startDate.getMonth() + 11)) // Set end date 11 months from the start date
        });

        await tenant.save();

        admin.tenants.push(tenant._id);
        await admin.save();

        await RoomDetails.findByIdAndUpdate(
            request.houseId._id,
            { isAvailable: "Not Available" }
        );

        return res.status(200).json({
            success: true,
            message: 'Request accepted and tenant added successfully'
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};