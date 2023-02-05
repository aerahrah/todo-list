const express = require('express');
const app = express();
const connectionDB = require('./db/connect');
const tasks = require('./routes/Tasks');
require('./db/connect');

app.use(express.static('./public'))
app.use('/api/v1/tasks', tasks);
const port = 3500

const connectionString = "mongodb+srv://Aerarah:Janedizon40@cluster0.2a76ezk.mongodb.net/?retryWrites=true&w=majority"

const start = async()=>{
    try {
        await connectionDB(connectionString);
        app.listen(port, ()=>{
            console.log(`Server is listening to port ${port}....`)
        });
    } catch (error) {
        console.log(error)
    }
}

start();


