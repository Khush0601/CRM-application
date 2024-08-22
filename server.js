const serverconfig=require('./configs/server.configs')
const express=require('express')
const dbConfig=require('./configs/db.config')
const app=express()
const mongoose=require('mongoose')
const bodyParser=require('body-parser')


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
})
app.listen(serverconfig.PORT,()=>{
    console.log('server started on port:',serverconfig.PORT)
})