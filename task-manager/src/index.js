const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const Task = require('./models/task')
const User = require('./models/user')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
	console.log(`Server is up on port ${port}`)
})

// const main = async () => {
// 	const task = await Task.findOne({ _id: '65d21baf638a2e397a15cef9' })
// 	await task.populate({ path: 'owner', model: User })
// 	// console.log(task.owner)

// 	const user = await User.findOne({ _id: '65d21b2f638a2e397a15cef3' })
// 	await user.populate({ path: 'tasks', model: Task })
// 	// console.log(user.tasks)
// }
// main()
