import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import mongoose from "mongoose"
dotenv.config()
const app = express()
const PORT = process.env.PORT || 4000
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
connectDB()
app.use((error, req, res, next)=>{
    error.statusCode = error.statusCode || 500
    error.message = error.message || "Something went wrong"
    res.status(error.statusCode).send(error.message)
})
app.listen(PORT, ()=>{
    console.log(`server running at port ${PORT}`)
})
const moviesSchema = new mongoose.Schema({movieName: {type :  String, required: true}})
const moviesModel = mongoose.model("movie", moviesSchema) 

app.get("/movies", async(req, res) => {
    const movies = await moviesModel.find()
    res.status(200).json({movies: movies})
})

app.post('/movies', async (req, res) => {
    
    const movie = await moviesModel.create({movieName: req.body.movieName})
    res.status(201).send('Movie added')
})
app.get("/", async(req, res) => {
    res.send("Reached backend")
})