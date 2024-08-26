const mongoose = require('mongoose')


const AdminSchema = new mongoose.Schema({
    name:{
        type:String , 
    }, 
    password:{
        type:String , 
    } ,
    email:{
        type:String , 
    } ,
    
    roomDetails:[{
        type:mongoose.Schema.Types.ObjectId 
    }] ,

    requests: [{
        type: mongoose.Schema.Types.ObjectId,
       
        refPath: 'reqModel'
    }],
    reqModel: {
        type: String,
        enum: ['User', 'RoomDetails']
    } ,
    tenants:[{
        type:mongoose.Schema.Types.ObjectId ,
        ref:"Tenant"
    }

    ]
    
    
   
    
})

module.exports = mongoose.model("User" ,AdminSchema )