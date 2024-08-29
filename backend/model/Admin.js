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
        type:mongoose.Schema.Types.ObjectId  ,
        ref:"RoomDetails"
    }] ,

    requests: [{
        type: mongoose.Schema.Types.ObjectId,
       
        ref: 'Request'
    }],
    
    tenants:[{
        type:mongoose.Schema.Types.ObjectId ,
        ref:"Tenant"
    }

    ]
    
    
   
    
})

module.exports = mongoose.model("Admin" ,AdminSchema )