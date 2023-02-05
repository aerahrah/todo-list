const Task = require('../models/Task')


const getAllTask = async(req, res) =>{
    try {
        const tasks = await Task.find({})
        res.status(200).json({ tasks })
    } catch (error) {
        console.log(error)
    }
  }
const createTask = async(req, res) =>{
    // res.status(201).json({ tasks })
    try {
        const task = await Task.create(req.body)
        res.status(201).json({ task })
    } catch (error) {
        console.log(error)
    }
}
const getSingleTask = (req, res) =>{
    // res.status(200).json({ tasks })
}
const deleteTask = (req, res) =>{
    // res.status(200).json({ tasks })
}
const updateTask = (req, res) =>{
    // res.status(200).json({ tasks })
}

module.exports = {
    getAllTask,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask,
}