const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();

// Middleware

const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get('/', (req,res)=>{
    res.send("Task Management Backend Server is up and Running..... ")
})

app.listen(port, ()=>{
    console.log("The server is running on port", port)
})