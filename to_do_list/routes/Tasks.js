const express = require("express")
const router = express.Router()

const {
    getAllTask,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask,
} = require('../controllers/tasks')

router.route('/hello').get(getAllTask)

module.exports = router