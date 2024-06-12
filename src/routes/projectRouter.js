const Router = require("express")
const router = new Router()
const projectController = require("../controllers/projectController")

router.post('/project', projectController.createProject)
router.get('/project', projectController.getAllProjects)
router.put('/project/:id', projectController.updateProject)
router.delete('/project/:id', projectController.deleteProject)


module.exports = router