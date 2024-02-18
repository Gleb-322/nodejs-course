const mongoose = require('mongoose')

const shemaTask = mongoose.Schema({
	description: {
		type: String,
		required: true,
		trim: true,
	},
	completed: {
		type: Boolean,
		default: false,
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
})

const Task = mongoose.model('Task', shemaTask)

module.exports = Task
