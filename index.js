// 1) import dotenv
// Loads .env file contents into process.env by default
require('dotenv').config()

// 2) import express - to create server we need express
const express = require('express')

// 3) import cors
const cors = require('cors')

// import router
const router = require('./Routes/router')

// import connection.js file
require('./DB/connections')

//import application specific middleware
// const appMiddleware =require('./MiddleWare/appMiddleware')

// 4) create server
// Creates an Express application. The express() function is a top-level function exported by the express module.
const pfServer = express()

// 5) use of cors by server 
pfServer.use(cors())

// 6) Returns middleware that only parses json and only looks at requests and converts into javascript object
pfServer.use(express.json())


//server use middleware
// pfServer.use(appMiddleware)

// server use router
pfServer.use(router) 

//pfserver should use uploads folder
//first arg -how the other application should use this file 
//sec arg -to export the export the uploads folder
pfServer.use('/uploads',express.static('./uploads'))


// custome(customize) the port why because by default server runs at - 3000
const PORT = 4000 || process.env.PORT 

// 8) run server
pfServer.listen(PORT,()=>{
    console.log(`SERVER RUNNING SUCCESSFULLY AT PORT NUMBER ${PORT}`);
})

// 9) get http request to base url - http://localhost:4000/
pfServer.get('/',(req,res)=>{
    res.send(`<h1 style="color:greenyellow">project fair server running successfully and waiting for client request</h1>`)
})
/* 
// post request
pfServer.post('/',(req,res)=>{
    res.send('post request')
})

// put request
pfServer.put('/',(req,res)=>{
    res.send('put request')
})
 */
