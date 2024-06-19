const db = require('../db')

class TaskController {
    async createTask(req, res) {
        try {
            const {taskId, taskName, description, startDate, endDate, taskStatus, projectId, teamId} = req.body
            console.log(req.body)
            const newTask = await db.query(
                `INSERT INTO "task" ("task_id", "task_name", "description", "start_date", "end_date", "task_status", "project_id", "team_id") VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
                [taskId, taskName, description, startDate, endDate, taskStatus, projectId, teamId]
            )
            res.json(newTask.rows[0])
        } catch (err) {
            console.error(err)
            res.status(500).json({ error: 'Internal server error' })
        }
    }

    async getAllTasks(req, res) {
        try {
            const tasks = await db.query(`SELECT * FROM "task"`)
            res.json(tasks.rows)
        } catch (err) {
            console.error(err)
            res.status(500).json({ error: 'Internal server error' })
        }
    }

    async getTasksFromCurrentProject(req, res) {
        try {
            const {id} = req.params
            const projectId = id
            const targetTask = await db.query(`SELECT * FROM "task" WHERE "project_id" = $1`, [projectId])
            res.json(targetTask.rows)
        } catch (err) {
            console.error(err)
            res.status(500).json({ error: 'Internal server error' })
        }
    }

    async updateTask(req, res) {
        try {
            const { id } = req.params
            const { taskId, taskName, description, startDate, endDate, taskStatus, projectId, teamId } = req.body
            if (!taskName || !description || !startDate || !endDate) {
                return res.status(400).json({ error: 'Missing required fields' })
            }
            console.log("SQL parameters:", [id, taskName, description, startDate, endDate, taskStatus, projectId, teamId])
            const updatedTasks = await db.query(
                `UPDATE "task" SET "task_name" = $2, "description" = $3, "start_date" = $4, "end_date" = $5, "task_status" = $6, "project_id" = $7, "team_id" = $8 WHERE "task_id" = $1 RETURNING *`,
                [id, taskName, description, startDate, endDate, taskStatus, projectId, teamId]
            )
            console.log("SQL query result:", updatedTasks)
            res.json(updatedTasks.rows[0])
        } catch (err) {
            console.error(err)
            res.status(500).json({ error: 'Internal server error' })
        }
    }

    async deleteTask(req, res) {
        try {
            const id = req.params.id
            const tasks = await db.query(`DELETE FROM "task" WHERE "task_id" = $1`, [id])
            res.json({ message: 'Task deleted successfully' })
        } catch (err) {
            console.error(err)
            res.status(500).json({ error: 'Internal server error' })
        }
    }
}

module.exports = new TaskController()