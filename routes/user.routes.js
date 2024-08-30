// this will be the routes files for the user resource :
const userController=require('../controllers/user.controller')
const auth=require('../middleware/auth.jwt')

module.exports=(app)=>{
    // app.get("/crm/api/v1/users",userController.findAll)
    // we r going to patch chained middleware blw route and controller
    app.get("/crm/api/v1/users",[auth.verifyToken,auth.isAdmin],userController.findAll)
    app.put('/crm/api/v1/users',[auth.verifyToken,auth.isAdminOrOwner],userController.update)
}