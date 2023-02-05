const express = require('express')
const app = express()
const tasks = require('./routes/tasks');
require('./db/connect');

app.use(express.static('./public'))
app.use('/api/v1/tasks', tasks);
const port = 3500
try {
    app.listen(port, ()=>{
        console.log(`Server is listening to port ${port}....`)
    })
} catch (error) {
    console.log(error)
}

