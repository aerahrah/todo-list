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
const getSingleTask = async (req, res) =>{
    try {
        const {id:taskId} = req.params
        const task = await Task.findOne({_id:taskId})
        if (!task) {
            return console.log(`No task with id : ${taskId}`, 404)
          }
         res.status(200).json({ task })
    } catch (error) {
        console.log(error)
    }
 
}
const deleteTask = async(req, res) =>{
    try {
        const {id:taskId} = req.params
        const task = await Task.findOneAndDelete({_id:taskId})
        res.status(200).json({ task})  
        if(!task){
            return console.log(`No task with id : ${taskId}`, 404)
        }
        res.status(200).json({ task })
    } catch (error) {
        console.log(error)
    }
    
}
const updateTask = async (req, res) =>{
    try {
        const {id:taskId} = req.params
        const task = await Task.findOneAndUpdate({_id:taskId}, req.body,{
        new:true, 
        runValidators: true,
    })
    if(!task){
        return console.log(`No task with id : ${taskId}`, 404)
    }    
        res.status(200).json({ task })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getAllTask,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask,
}