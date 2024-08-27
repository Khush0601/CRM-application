
//need a fun. which take an array of user objects and remove the sensitive information (like password ) and then return the response

exports.userResponse=(users)=>{
    const userResult=[]
    users.forEach((user)=>{
    userResult.push({
        name:user.name,
        userId:user.userId,
        email:user.email,
        userType:user.userType,
        userStatus:user.userStatus,
    })

    })
    return userResult
}