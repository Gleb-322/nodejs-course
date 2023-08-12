const mongoose = require('mongoose')

const shemaTask = {
	description: {
		type: String,
		required: true,
		trim: true,
	},
	completed: {
		type: Boolean,
		default: false,
	},
}

const Task = mongoose.model('Task', shemaTask)

module.exports = Task
