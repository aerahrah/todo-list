const express = require('express');
const app = express();
const connectionDB = require('./db/connect');
const tasks = require('./routes/Tasks');
require('./db/connect');
require('dotenv').config()

app.use(express.json());
app.use(express.static('./public'))
app.use('/api/v1/tasks', tasks);
const port = 3500


const start = async()=>{
    try {
        await connectionDB(process.env.MONGO_URI);
        app.listen(port, ()=>{
            console.log(`Server is listening to port ${port}....`)
        });
    } catch (error) {
        console.log(error)
    }
}

start();


