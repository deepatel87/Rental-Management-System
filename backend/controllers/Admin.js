const Admin = require("../model/Admin")
const User = require("../model/User")
const Request = require("../model/Request")
const bcrypt= require("bcrypt") 
const Tenant = require("../model/Tenant")
const RoomDetails = require("../model/RoomDetails")



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
        console.log("Hiiiiiiiiiiiiii");

        if (!requestId) {
            return res.status(400).json({
                success: false,
                message: 'Request ID is required'
            });
        }

        const request = await Request.findByIdAndDelete(requestId)
            .populate('userId houseId');
        console.log(request);

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
        console.log(admin);

        const startDate = new Date();

        const tenant = new Tenant({
            user: request.userId._id,
            room: request.houseId._id,
            startDate: startDate,
            endDate: new Date(startDate.setMonth(startDate.getMonth() + 11)) // Set end date 11 months from the start date
        });

        if (!admin.tenants) {
            admin.tenants = [];
        }

        await tenant.save();

        admin.tenants.push(tenant._id);
        await admin.save();

        await RoomDetails.findByIdAndUpdate(
            request.houseId._id,
            { 
                isAvailable: "Not Available", 
                tenant: tenant._id // Add the tenant ID reference to the RoomDetails
            }
        );

        // Delete any other requests from the same user
        await Request.deleteMany({ userId: request.userId._id });

        await User.findByIdAndUpdate(
            request.userId._id,
            { roomDetails: request.houseId._id } // Pass the room ID to the user's room details
        );

        const populatedTenant = await Tenant.findById(tenant._id)
        .populate('user')
        .populate('room');

        return res.status(200).json({
            success: true,
            message: 'Request accepted and tenant added successfully, other requests from the same user deleted' ,
            populatedTenant:populatedTenant 

        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

exports.removeTenant = async (req, res) => {
    try {
        const { tenantId } = req.body;

        if (!tenantId) {
            return res.status(400).json({
                success: false,
                message: 'Tenant ID is required'
            });
        }

        const tenant = await Tenant.findById(tenantId).populate('user').populate('room');

        if (!tenant) {
            return res.status(404).json({
                success: false,
                message: 'Tenant not found'
            });
        }

        const { user, room } = tenant;

        await User.findByIdAndUpdate(user._id, {
            $unset: { roomDetails: "" }
        });

        await Admin.findOneAndUpdate(
            {},
            { $pull: { tenants: tenantId } },
            { new: true }
        );

        await RoomDetails.findByIdAndUpdate(room._id, {
            $set: { isAvailable: "Available" },
            $unset: { tenant: "" }
        });

        await Tenant.findByIdAndDelete(tenantId);

        res.status(200).json({
            success: true,
            message: 'Tenant removed successfully'
        });
    } catch (error) {
        console.error('Error removing tenant:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        });
    }
};

