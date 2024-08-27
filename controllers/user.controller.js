
//This file will contain the logic to fetch all users
// 1.is a valid user 
// 2. he should be admin
const objectConverter=require('../utils/ObjectConverter')
exports.findAll=async(req,res)=>{
try{
res.status(200).send(objectConverter.userResponse(users))

}
catch(err){
console.log('Error while fetching the users',err.message)
res.status(500).send({
    message:"Internal server error while fetching the users"
})
}
}

