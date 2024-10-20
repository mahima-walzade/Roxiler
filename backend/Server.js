const express = require ('express')
const mongoose = require ('mongoose')
const cors = require('cors')

const routes =require('./routes/ToDoRoutes')
require('dotenv').config()

const app =express()
const PORT = process.env.port || 5700

app.use(express.json())
app.use(cors())

mongoose.connect('mongodb+srv://mrsmahimawalzade:nrDMbnTew5fTp0Hv@cluster0.n3ach.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
    console.log("Database Connected")
})
app.use(routes)

app.listen(PORT,()=>console.log(`Listening on:${PORT}`))
