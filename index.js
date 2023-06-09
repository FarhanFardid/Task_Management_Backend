const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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



const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Password}@cluster0.joz6qi9.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
     client.connect();

     const taskCollection = client.db("taskDB").collection("tasks");

    //  GET api
    app.get('/tasks', async(req,res)=>{
        const result = await taskCollection.find().toArray();
        res.send(result);
    })
// POST api
     app.post('/tasks', async(req,res)=>{
        const newTask = req.body;
        console.log(newTask);
        const result = await taskCollection.insertOne(newTask)
        res.send(result);
     })
// Delete api
     app.delete('/tasks/:id', async(req,res)=>{
        const id= req.params.id;
        const query = {_id : new ObjectId(id)}
        const result = await taskCollection.deleteOne(query)
        res.send(result)
     })

    // Update api
    
    app.patch('/tasks/:id', async(req,res)=>{
        const id = req.params.id;
        const filter = {_id : new ObjectId(id)}
        const updateTask = {
            $set: {
              status: "completed"
            },
          };
          const result = await taskCollection.updateOne(filter,updateTask)
          res.send(result);
    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, ()=>{
    console.log("The server is running on port", port)
})