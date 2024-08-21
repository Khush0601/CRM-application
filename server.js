const serverconfig=require('./configs/server.configs')
const express=require('express')
const dbConfig=require('./configs/db.config')
const app=express()
const mongoose=require('mongoose')


// need to connect to database
mongoose.connect(dbConfig.DB_URL)

const db=mongoose.connection
db.on('error',()=>{
    console.log('error while connecting to DB')
})

db.once('open',()=>{
    console.log('DB got connected')
})
app.listen(serverconfig.PORT,()=>{
    console.log('server started on port:',serverconfig.PORT)
})