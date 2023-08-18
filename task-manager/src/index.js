const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
	console.log(`Server is up on port ${port}`)
})

const bcrypt = require('bcryptjs')

const F = async () => {
	const pass = 'Redfg123!'

	const hashedPass = await bcrypt.hash(pass, 8)

	console.log(pass)
	console.log(hashedPass)

	const isMatches = await bcrypt.compare(pass, hashedPass)
	console.log(isMatches)
}
