require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('64d7ab2d4caeb5805333ea15')
// 	.then(task => {
// 		console.log(task)
// 		return Task.countDocuments({ completed: false })
// 	})
// 	.then(count => console.log(count))
// 	.catch(e => console.log(e))

const deleteOneAndCount = async (id, completed) => {
	await Task.findByIdAndDelete(id)
	return await Task.countDocuments({ completed })
}

deleteOneAndCount('64d7ab364caeb5805333ea17', false)
	.then(count => console.log(count))
	.catch(e => console.log(e))
