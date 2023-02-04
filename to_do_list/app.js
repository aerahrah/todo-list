const express = require('express')
const app = express()

app.use(express.static('/public'))

const port = 5000
try {
    app.listen(port, ()=>{
        console.log(`Server is listening to port ${port}....`)
    })
} catch (error) {
    console.log(error)
}

