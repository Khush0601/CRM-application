
const jwt=require("jsonwebtoken")
const config=require('../configs/auth.config')
const userModel = require("../model/user.model")

//middleware to validate the access token
const verifyToken=(req,res,next)=>{
//if the token is present
const token=req.headers['x-access-token']
if(!token){
    res.status(403).send({
        message:"no token provided"
    })
}
// if the token is valid
jwt.verifyToken,config.secret,(err,decoded)=>{
    if(err){
        return  res.status(410).send({
            message:"invalid token "
        })
     
    }
    console.log('Token is valid')
    req.userId=decoded.id
    next()
}

}

//middleware to go and check if the user is Admin

const isAdmin=async(req,res,next)=>{
    const user=await userModel.findOne({userId:req.userId})
    if(user && user.userType==='ADMIN'){
        next()
    }
    else{
        return res.status(403).send({
            message:"only ADMIN user allowed"
        })
    }
}

const isAdminOrOwner=async(req,res,next)=>{
    const callingUser=await userModel.findOne({userId:req.userId})
    if(callingUser.userType=='ADMIN' || callingUser.userId==req.params.id){
        if(req.body.userStatus && callingUser.userType!='ADMIN'){
            return res.status(403).send({
                message:"only Admin is allowed to change the status"
            })
        }
        next()
    }
    else{
        return res.status(403).send({
            message:'only admins or owner is allowed to update'
        })
    }

}
module.exports={
    verifyToken:verifyToken,
    isAdmin:isAdmin,
    isAdminOrOwner:isAdminOrOwner,

}