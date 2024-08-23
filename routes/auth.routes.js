const authController=require('../controllers/auth.controller')

module.exports=(app)=>{
app.post('/crm/api/v1/auth/signUp',authController.signUp)
app.post('/crm/api/v1/auth/signIn',authController.signIn)
}