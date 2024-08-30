
//This file will contain the logic to fetch all users
// 1.is a valid user 
// 2. he should be admin
const userModel = require('../model/user.model');
const User = require('../model/user.model');
const objectConverter=require('../utils/ObjectConverter')
exports.findAll=async(req,res)=>{
try{
    //read the query params if any 
    const queryObj={}
    const userTypeQ=req.query.userType;
    if(userTypeQ){
        queryObj.userType=userTypeQ
    }
    const userStatusQ=req.query.userStatus;
    if(userStatusQ){
        queryObj.userStatus=userStatusQ;
    }
    const users=await User.find(queryObj)
   
res.status(200).send(objectConverter.userResponse(users))

}
catch(err){
console.log('Error while fetching the users',err.message)
res.status(500).send({
    message:"Internal server error while fetching the users"
})
}
}
exports.update=async(req,res)=>{
    //fetch the user object if its present 
    try{
        if(!user){
            return res.status(404).send({message:"user with the given id is not present"})
        }
    const user=await userModel.findOne({userId:req.params.id})
   // update the user object based on the req
   user.name=req.body.name!=undefined?req.body.name:userModel.name;
   user.userStatus=req.body.userStatus!=undefined?req.body.userStatus:user.userStatus;
  user.userType=req.body.userType!=undefined?req.body.userType:userModel.userType;

  // save the user object and return the updated object
  const updatedUser=await user.save()
  res.status(200).send({
    name:updatedUser.name,
    userId:updatedUser.userId,
    userStatus:updatedUser.userStatus,
    email:updatedUser.email,
    userType:updatedUser.userType
  })
 }
    catch(err){
console.log('error while updating the user',err.message)
res.status(500).send({
    message:'internal server erroe while updating the user'
})
    }
}
