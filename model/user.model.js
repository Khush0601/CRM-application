// this file will contain the schema of the user model

const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    userId:{
        type:String,
        required:true,
        unique:true, 
    },
    email:{
        type:String,
        required:true,
        unique:true, 
        minLength:10,
        lowercase:true,

    },
    password:{
        type:String,
        required:true,
    },
    userType:{
        type:String,
        required:true,
      default:"CUSTOMER"
    },
    userStatus:{
        type:String,
        required:true,
       default:"APPROVED"
    },
    createdAt:{
        type:Date,
       
       default:()=>{
        return Date.now()
       },
       immutable:true
    },
    updatedAt:{
        type:Date,
       
       default:()=>{
        return Date.now()
       },
      
    }
})
module.exports=mongoose.model('User',userSchema);