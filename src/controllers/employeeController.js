const db = require('../db')

class EmployeeController {
    async createEmployee(req, res) {
        try {
            const { id, name, position } = req.body
            console.log(req.body)
            const newEmployee = await db.query(
                `INSERT INTO "employee" ("employee_id", "employee_name", "employee_position") VALUES ($1, $2, $3) RETURNING *`,
                [id, name, position]
            )
            res.json(newEmployee.rows[0])
        } catch (err) {
            console.error(err)
            res.status(500).json({ error: 'Internal server error' })
        }
    }

    async getAllEmployees(req, res) {
        try {
            const employees = await db.query(`SELECT * FROM "employee"`)
            res.json(employees.rows)
        } catch (err) {
            console.error(err)
            res.status(500).json({ error: 'Internal server error' })
        }
    }
}

module.exports = new EmployeeController()