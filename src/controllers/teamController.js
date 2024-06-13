const db = require('../db')

class TeamController {
    async createTeam(req, res) {
        try {
            const {id, name, description} = req.body
            console.log(req.body)
            const newTeam = await db.query(
                `INSERT INTO "team" ("team_id", "team_name", "description") VALUES ($1, $2, $3) RETURNING *`,
                [id, name, description]
            )
            res.json(newTeam.rows[0])
        } catch (err) {
            console.error(err)
            res.status(500).json({ error: 'Internal server error' })
        }
    }

    async getTeams(req, res) {
        try {
            const teams = await db.query(`SELECT * FROM "team"`)
            res.json(teams.rows)
        } catch (err) {
            console.error(err)
            res.status(500).json({ error: 'Internal server error' })
        }
    }

    async updateTeam(req, res) {
        try {
            const {teamId} = req.params
            const {name, description} = req.body
            if (!name || !description) {
                return res.status(400).json({error: 'Missing required fields'})
            }
            console.log("SQL parameters:", [teamId, name, description])
            const updatedTeam = await db.query(
                `UPDATE "team" SET "team_name" = $2, "description" = $3 WHERE "team_id" = $1 RETURNING *`,
                [teamId, name, description]
            )
            console.log("SQL query result:", updatedTeam)
            res.json(updatedTeam.rows[0])
        } catch (err) {
            console.error(err)
            res.status(500).json({ error: 'Internal server error' })
        }
    }

    async deleteTeam(req, res) {
        try {
            const id = req.params.id
            const teams = await db.query(`DELETE FROM "team" WHERE "team_id" = $1`, [id])
            res.json({ message: 'Task deleted successfully' })
        } catch (err) {
            console.error(err)
            res.status(500).json({ error: 'Internal server error' })
        }
    }
}

module.exports = new TeamController()