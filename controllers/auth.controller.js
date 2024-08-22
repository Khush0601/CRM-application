// this file will have the logic to signup and signin the user
const bcrypt=require("bcryptjs")
const User=require('../model/user.model')
exports.signUp=async(req,res)=>{
    //inserting data into database
    try{
        const userObj={
            name:req.body.name,
            userId:req.body.userId,
            email:req.body.email,
            userType:req.body.userType,
            password:bcrypt.hashSync(req.body.password),
        }
        // need to use userstatus
        if(!userObj.userType || userObj.userType==='CUSTOMER'){
            userObj.userStatus='APPROVED'
        }
        else{
            userObj.userStatus='PENDING' 
        }
    
        const savedUser=await User.create(userObj)
        const postResponse={
            name:savedUser.name,
            userId:savedUser.userId,
            email:savedUser.email,
            userType:savedUser.userType,
            userStatus:savedUser.userStatus,
            createdAt:savedUser.createdAt,
            updatedAt:savedUser.updatedAt
        }

        res.status(201).send(postResponse)
        
    }
    catch(err){
     console.log('Error while registering user',err.message)
     res.status(500).send({
        message:'some internal server error'
     })
    }
}