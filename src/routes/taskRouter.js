const Router = require("express")
const router = new Router()
const taksController = require("../controllers/taskController")

router.post('/task', taksController.createTask)
router.get('/task', taksController.getAllTasks)
router.get('/task/:id', taksController.getTasksFromCurrentProject)
router.put('/task/:id', taksController.updateTask)
router.delete('/task/:id', taksController.deleteTask)

module.exports = router