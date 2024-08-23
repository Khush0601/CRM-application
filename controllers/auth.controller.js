// this file will have the logic to signup and signin the user
const bcrypt=require("bcryptjs")
const User=require('../model/user.model')
const jwt= require("jsonwebtoken")
const authconfig=require("../configs/auth.config")
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

exports.signIn=async(req,res)=>{
try{
    
    //read the userId and password from the req.
    const userIdFromReq=req.body.userId
    const password=req.body.password

    //ensure the userId is valid:
    const userSaved=await User.findOne({userId:userIdFromReq})
  if(!userSaved){
    return res.status(401).send({
    message:"Userid  is not correct"
    })
  }

  // ensure that the password passed is valid
//in db we have encrypted password

const isValidPassword=bcrypt.compareSync(password,userSaved.password)
if(!isValidPassword){
    return res.status(401).send({
        message:" password is not correct"
        })
}

// check if the user is in approved state :for engineer
if(userSaved.userStatus!=="APPROVED"){
    return res.status(403).send({
        message:"user is not approved for the login"
        })
}

 //generating access token
    const token=jwt.sign({
    id:userSaved.userId
   },authconfig.secret,{
    expiresIn:600
   })
 
   // send the response back

   res.status(200).send({
    name:userSaved.name,
    userId:userSaved.userId,
    email:userSaved.email,
    userType:userSaved.userType,
    userStatus:userSaved.userStatus,
    accessToken:token
   })

}
catch(err){
console.log('Error while login',err.message)
res.status(500).send({
    message:"Internal server error"
})
}
}