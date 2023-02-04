const getAllTask = (req, res)=>{

    res.status(200).json({ tasks })
}
const createTask = (req, res) =>{
    res.status(201).json({ tasks })
}
const getSingleTask = (req, res) =>{
    res.status(200).json({ tasks })
}
const deleteTask = (req, res) =>{
    res.status(200).json({ tasks })
}
const updateTask = (req, res) =>{
    res.status(200).json({ tasks })
}

module.exports = {
    getAllTask,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask,
}