const serverconfig=require('./configs/server.configs')
const express=require('express')
const dbConfig=require('./configs/db.config')
const app=express()
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const User=require("./model/user.model")
const bcrypt=require('bcryptjs')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

// plugging the routes
require("./routes/auth.routes")(app)

// need to connect to database
mongoose.connect(dbConfig.DB_URL)

const db=mongoose.connection;
db.on('error',()=>{
    console.log('error while connecting to DB')
})

db.once('open',()=>{
    console.log('connected to database')
    init()
})

//delete user collection if its already present
async function init(){
 await User.collection.drop()
  // we should create one Admin user ready from the back
  const user=await User.create({
    name:"vishwa",
    userId:"admin",
    password:bcrypt.hashSync('welcome1',8),
    email:"vishwamohan@gamil.com",
    userType:"ADMIN"
  })
  console.log(user)
}

app.listen(serverconfig.PORT,()=>{
    console.log('server started on port:',serverconfig.PORT)
})