const db = require('../db')

class EmployeeController {
    async createEmployee(req, res) {
        const {employeeId, employeeName, employeePosition} = req.body
        console.log(req.body)
        const newEmployee = await db.query(`INSERT INTO "employee" ("employee_id", "employee_name", "employee_position") values ($1, $2) RETURNING *`,
            [employeeId, employeeName, employeePosition])
        res.json(newEmployee.rows[0])
    }

    async getAllEmployees(req, res) {
        const employees = await db.query(`SELECT * FROM "employee"`)
        res.json(employees.rows)
    }
}

module.exports = new EmployeeController()