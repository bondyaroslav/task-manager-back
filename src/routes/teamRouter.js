const Router = require("express")
const router = new Router()
const teamController = require("../controllers/teamController")

router.post('/team', teamController.createTeam)
router.get('/team', teamController.getTeams)
router.put('/team/:teamId', teamController.updateTeam)
router.delete('/team/:id', teamController.deleteTeam)

module.exports = router