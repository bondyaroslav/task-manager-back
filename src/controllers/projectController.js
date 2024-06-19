const db = require('../db')

class ProjectController {
    async createProject(req, res) {
        try {
            const {id, name, description, startDate, endDate} = req.body
            console.log(req.body)
            const newProject = await db.query(
                `INSERT INTO "project" ("project_id", "project_name", "description", "start_date", "end_date") VALUES ($1, $2, $3, $4, $5) RETURNING *`,
                [id, name, description, startDate, endDate]
            )
            res.json(newProject.rows[0])
        } catch (err) {
            console.error(err)
            res.status(500).json({ error: 'Internal server error' })
        }
    }

    async getAllProjects(req, res) {
        try {
            const projects = await db.query(`SELECT * FROM "project"`)
            res.json(projects.rows)
        } catch (err) {
            console.error(err)
            res.status(500).json({ error: 'Internal server error' })
        }
    }

    async getTargetProject(req, res) {
        try {
            const {id} = req.params
            const projectId = id
            const targetProject = await db.query(`SELECT * FROM "project" WHERE "project_id" = $1`, [projectId])
            res.json(targetProject.rows)
        } catch (err) {
            console.error(err)
            res.status(500).json({ error: 'Internal server error' })
        }
    }

    async updateProject(req, res) {
        try {
            const { id } = req.params
            const { name, description, startDate, endDate } = req.body
            if (!name || !description || !startDate || !endDate) {
                return res.status(400).json({ error: 'Missing required fields' })
            }
            console.log("SQL parameters:", [id, name, description, startDate, endDate])
            const updatedProject = await db.query(
                `UPDATE "project" SET "project_name" = $2, "description" = $3, "start_date" = $4, "end_date" = $5 WHERE "project_id" = $1 RETURNING *`,
                [id, name, description, startDate, endDate]
            )
            console.log("SQL query result:", updatedProject)
            res.json(updatedProject.rows[0])
        } catch (err) {
            console.error(err)
            res.status(500).json({ error: 'Internal server error' })
        }
    }

    async deleteProject(req, res) {
        const id = req.params.id
        const projects = await db.query(`DELETE FROM "project" WHERE "project_id" = $1`, [id])
        res.json(projects.rows)
    }
}

module.exports = new ProjectController()