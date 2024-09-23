const User = require("../model/User") ;
const Tenant = require("../model/Tenant")
const Admin = require("../model/Admin") ;
const Request = require("../model/Request") ;
const OTP = require("../model/Otp") ;
const otpGenerator=require("otp-generator") ;
const bcrypt= require("bcrypt")
const jwt = require("jsonwebtoken") ;
const mailSender = require("../utils/mailSender");
const RoomDetails = require("../model/RoomDetails")
require("dotenv").config()
const {uploadImageToCloudinary} = require("../utils/imageUploader")
const RentDetails = require("../model/RentDetails")

 
exports.sendOTP=async(req, res)=>{
    try {
        const {email }= req.body;

        const checkUserPresent = await User.findOne({email:email}) ;

    if(checkUserPresent){
        return res.status(401).json({
            success:false,
            message:"User Already Exists"
        })
    }
    var otp = otpGenerator.generate(6 , { 
        upperCaseAlphabets:false ,
        lowerCaseAlphabets:false ,
        specialChars:false
    }
    )
    console.log("OTP generated : " , otp)


    let existing_otp = await OTP.findOne({otp:otp});
    while(existing_otp){
        otp = otpGenerator.generate(6 , {
            upperCaseAlphabets:false ,
            lowerCaseAlphabets:false ,
            specialChars:false
        }
        )
        existing_otp = await OTP.findOne({otp:otp});
     }
 
     const otpPayload={email , otp} ;
     const otpBody = await OTP.create(otpPayload)
     console.log(otpBody)

     return res.status(200).json({
        success:true ,
        message:"OTP has been sent successfully" ,
        otp ,
     })
        
    } catch (error) {
        console.log(error) 
        return res.status(500).json({
            success:false ,
            message:"Error While Sending Otp"
        })
        
    }
    
}
 
exports.signUp = async(req , res)=>{

    try {
        const {fullName , email   ,contactNumber , otp , password}=req.body ;
        console.log(email)

        if(!fullName || !email || !otp || !contactNumber ){
            return res.status(403).json({
                success:false ,
                message:"All fields are required"
            })
        }
    
      
    
        const existingUser = await  User.findOne({email})
        if(existingUser){
            return res.status(400).json({
                success:false ,
                message:"User is already registered"
            })
        }
        console.log("reached here" , email)
    
        const recentOtp = await OTP.findOne({email}).sort({createdAt:-1}).limit(1) ;
        console.log(recentOtp)
        if(!recentOtp){
            return res.status(400).json({
                success:false ,
                message:"OTP Not Found"
            })
        } else if(otp!==recentOtp.otp){
            console.log(recentOtp.otp)
            console.log(otp)
            return res.status(400).json({
                success:false ,
                message:"OTP doesn't match"
            })
        }

        console.log(password)
       

        const hashedPassword = await  bcrypt.hash(password ,10) ;

        const user = await User.create({
            fullName ,
            password ,
            email ,
            contactNumber , 
            password:hashedPassword ,
            aadharImage:"url" ,
            aadharNumber:Math.random()*10000 + Math.random()*20000 , 
            isAdmin:false , 
            roomDetails:null



        })

        const roomDetails = await RoomDetails.find();

        return res.status(200).json({
            success:true ,
            message:"Registration done" ,
            user: {
                ...user.toObject(),
                isAdmin: false 
            },
            roomDetails,
        })
       
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success:true ,
            message:"Error while signing Up"
        })

        
    }
   


}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(403).json({
                success: false,
                message: "Credentials Needed"
            });
        }

        const user = await User.findOne({ email }).populate("roomDetails");
        const admin = await Admin.findOne({ email })
            .populate({
                path: 'requests',
                populate: [
                    {
                        path: 'userId',
                        model: 'User',
                        select: '-password'
                    },
                    {
                        path: 'houseId',
                        model: 'RoomDetails'
                    }
                ]
            })
            .populate({
                path: 'tenants',
                populate: [
                    {
                        path: 'user',
                        model: 'User',
                        select: '-password'
                    },
                    {
                        path: 'room',
                        model: 'RoomDetails'
                    }
                ]
            });

        if (!user && !admin) {
            return res.status(403).json({
                success: false,
                message: "User Doesn't exist"
            });
        }

        if (user && await bcrypt.compare(password, user.password)) {
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h"
            });

            let roomDetails = await RoomDetails.find();
            let rentedRoom = null;

            user.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            };

            const tenant = await Tenant.findOne({ user: user._id });
            console.log(tenant)
            if (tenant) {
                rentedRoom = await RoomDetails.findOne({ tenant: tenant._id })
                    .populate('rentHistory'); 

                const currentDate = new Date();
                const currentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
                console.log(rentedRoom)

                if (rentedRoom) {
                    const existingRentEntry = await RentDetails.findOne({
                        tenantId: tenant._id,
                        forMonth: currentMonth
                    });
                    console.log(existingRentEntry)

                    if (!existingRentEntry) {
                        const newRentEntry = new RentDetails({
                            tenantId: tenant._id,
                            amount: rentedRoom.rent,
                            forMonth: currentMonth,
                            dateOfPayment: null,
                            status: 'Unpaid'
                        });

                        await newRentEntry.save();

                        if (!Array.isArray(rentedRoom.rentHistory)) {
                            rentedRoom.rentHistory = [];
                        }

                        await RoomDetails.findOneAndUpdate(
                            { _id: rentedRoom._id },
                            { $push: { rentHistory: newRentEntry._id } },
                            { new: true }
                        );
                        tenant.rentHistory.push(newRentEntry._id);
                        await tenant.save()
                        console.log(tenant)


                        rentedRoom = await RoomDetails.findOne({ tenant: tenant._id })
                            .populate('rentHistory');
                    }
                }
            }

            return res.cookie("cookie", token, options).status(200).json({
                success: true,
                token,
                user: {
                    ...user.toObject(),
                    isAdmin: false
                },
                roomDetails, 
                rentedRoom, 
                message: "Logged In Successfully"
            });
        } 
        else if (admin && await bcrypt.compare(password, admin.password)) {
            const payload = {
                email: admin.email,
                id: admin._id,
                accountType: 'admin'
            };
        
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h"
            });
        
            const roomDetails = await RoomDetails.find();
        
            const populatedTenants = await Tenant.find({ _id: { $in: admin.tenants } })
                .populate('rentHistory')
                .populate('user')
        
            admin.password = undefined;
        
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            };
        
            return res.cookie("cookie", token, options).status(200).json({
                success: true,
                token,
                user: {
                    ...admin.toObject(),
                    isAdmin: true
                },
                roomDetails,
                requests: admin.requests,
                tenants: populatedTenants, 
                message: "Logged In Successfully"
            });
        } 
        else {
            return res.status(400).json({
                success: false,
                message: "Password is Invalid"
            });
        }

    } catch (err) {
        console.log(err);
        return res.status(400).json({
            success: false,
            message: "Couldn't Login"
        });
    }
};


exports.getUser = async (req, res) => {
    try {
        const token = req.header('Authorization').split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        if (!decoded) {
            return res.status(404).json({
                success: false,
                message: "Authentication Failed. Kindly Log In."
            });
        }

        const id = req.user.userId || req.user.id;
        const email = req.user.email ;
        const user = await User.findOne({ email }).populate("roomDetails");
        const admin = await Admin.findOne({ email })
            .populate({
                path: 'requests',
                populate: [
                    {
                        path: 'userId',
                        model: 'User',
                        select: '-password'
                    },
                    {
                        path: 'houseId',
                        model: 'RoomDetails'
                    }
                ]
            })
            .populate({
                path: 'tenants',
                populate: [
                    {
                        path: 'user',
                        model: 'User',
                        select: '-password'
                    },
                    {
                        path: 'room',
                        model: 'RoomDetails'
                    }
                ]
            });

        if (!user && !admin) {
            return res.status(403).json({
                success: false,
                message: "User Doesn't exist"
            });
        }

        if (user) {
          

            
            let roomDetails = await RoomDetails.find();
            let rentedRoom = null;

            user.password = undefined;

         

            const tenant = await Tenant.findOne({ user: user._id });
            console.log(tenant)
            if (tenant) {
                rentedRoom = await RoomDetails.findOne({ tenant: tenant._id })
                    .populate('rentHistory'); 

                const currentDate = new Date();
                const currentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
                console.log(rentedRoom)

                if (rentedRoom) {
                    const existingRentEntry = await RentDetails.findOne({
                        tenantId: tenant._id,
                        forMonth: currentMonth
                    });
                    console.log(existingRentEntry)

                    if (!existingRentEntry) {
                        const newRentEntry = new RentDetails({
                            tenantId: tenant._id,
                            amount: rentedRoom.rent,
                            forMonth: currentMonth,
                            dateOfPayment: null,
                            status: 'Unpaid'
                        });

                        await newRentEntry.save();

                        if (!Array.isArray(rentedRoom.rentHistory)) {
                            rentedRoom.rentHistory = [];
                        }

                        await RoomDetails.findOneAndUpdate(
                            { _id: rentedRoom._id },
                            { $push: { rentHistory: newRentEntry._id } },
                            { new: true }
                        );
                        tenant.rentHistory.push(newRentEntry._id);
                        await tenant.save()
                        console.log(tenant)


                        rentedRoom = await RoomDetails.findOne({ tenant: tenant._id })
                            .populate('rentHistory');
                    }
                }
            }

            return res.status(200).json({
                success: true,
                user: {
                    ...user.toObject(),
                    isAdmin: false
                },
                roomDetails, 
                rentedRoom, 
                message: "Logged In Successfully"
            });
        } 
        else if (admin) {
           
        
          
        
            const roomDetails = await RoomDetails.find();
        
            const populatedTenants = await Tenant.find({ _id: { $in: admin.tenants } })
                .populate('rentHistory')
                .populate('user')
        
            admin.password = undefined;
        
            
        
            return res.status(200).json({
                success: true,
                user: {
                    ...admin.toObject(),
                    isAdmin: true
                },
                roomDetails, 
                requests: admin.requests,
                tenants: populatedTenants, 
                message: "Logged In Successfully"
            });
        } 
        else {
            return res.status(400).json({
                success: false,
                message: "couldnt Authenticate"
            });
        }

    
    
    }catch(err){
        console.log(err)

        return res.status(400).json({
            success:false ,
            message:"Token Expired "
        })

    }
};




exports.updateProfile = async (req, res) => {
    const { userId } = req.body;
    const {
        aadhaarNumber,
        relativeNumber,
        relation,
        work,
        occupation,
        noOfPeople,
        houseId,
       
    } = req.body;

    const aadharImage = req.files.aadhaarImage

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

      

        if (aadhaarNumber !== undefined) user.aadharNumber = aadhaarNumber;
        if (relativeNumber !== undefined) user.relativeNumber = relativeNumber;
        if (relation !== undefined) user.relation = relation;
        if (work !== undefined) user.work = work;
        if (occupation !== undefined) user.occupation = occupation;
        if (noOfPeople !== undefined) user.noOfPeople = noOfPeople;
        if (houseId !== undefined) user.houseId = houseId;
        // if (photo !== undefined) user.image = photo;

        const aadharUpdatedImage = await uploadImageToCloudinary(aadharImage , process.env.FOLDER_NAME) ;
        user.aadharImage = aadharUpdatedImage.secure_url;


        


        const updatedUser = await user.save();

        const admin = await Admin.findOne();
        console.log(admin)

        if (!admin) {
            return res.status(404).json({ success: false, message: 'Admin not found' });
        }

        const existingRequest = await Request.findOne({ houseId, userId });

        if (existingRequest) {
            return res.status(400).json({ success: false, message: 'Request already exists' });
        }





        const request = await Request.create({
            houseId , 
            userId ,
        })

        admin.requests.push(request._id)
        await admin.save()
      

      

        res.json({ success: true, data: updatedUser });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};









