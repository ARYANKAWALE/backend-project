// import mongoose from "mongoose"
// import {DB_NAME} from "../constants"
import dotenv from "dotenv"
dotenv.config()
import connectDB from "./db/index.js"

dotenv.config({
    path:'./env'
})

connectDB()




/* (async () => {
import express from "express"
const app = express()
IFEE
; ---> semi comma should be use to avoid any error....mostly used by professional people in thier code
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",(error) => {
            console.error("ERROR:",error)
            throw error
        })
        app.listen(process.env.PORT,()=>{
            console.log(`App is listeining on port ${process.env.PORT}`)
        })
    } catch (error) {
        console.error("ERROR:",error)
        throw err
    }
 })
 ()  */