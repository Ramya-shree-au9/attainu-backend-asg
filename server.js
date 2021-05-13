
import express from "express"
import ConnectDB from "./db.js"
import bodyParser from "body-parser"
import Routes from './routes.js'
import cors from "cors"

import dotenv from 'dotenv'
dotenv.config();

ConnectDB()
const app= express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())

app.use("/api",Routes)

const port = process.env.PORT 

app.listen(port,(err)=>{
    if (err) throw err
    console.log(`server is up and running...${port}`);
})

