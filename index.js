const express = require("express")
const employeeRouter = require("./src/routes/employeeRouter")
const projectRouter = require("./src/routes/projectRouter")
const taskRouter = require("./src/routes/taskRouter")
const teamRouter = require("./src/routes/teamRouter")

const PORT = 5000 //process.env.PORT ||
const app = express()

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
  next()
})

app.use(express.json())
app.use('/api', employeeRouter)
app.use('/api', projectRouter)
app.use('/api', taskRouter)
app.use('/api', teamRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})