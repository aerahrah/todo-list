const mongoose = require('mongoose')


const connectionString = "mongodb+srv://Aerarah:Janedizon40@cluster0.2a76ezk.mongodb.net/?retryWrites=true&w=majority"


mongoose.connect(connectionString).then(()=> console.log("connected to database")).catch((err)=>console.log(err))
