const Router = require("express")
const router = new Router()
const chatController = require("../controllers/employeeController")

router.post('/employee', chatController.createEmployee)
router.get('/employee', chatController.getAllEmployees)

module.exports = router