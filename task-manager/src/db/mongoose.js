const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api')

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

const task = new Task({
	description: '         Eat my food  ',
})

task
	.save()
	.then(task => console.log(task))
	.catch(e => console.log(e))

// const shemaUser = {
// 	name: {
// 		type: String,
// 		required: true,
// 		trim: true,
// 	},
// 	email: {
// 		type: String,
// 		trim: true,
// 		lowercase: true,
// 		validate(value) {
// 			if (!validator.isEmail(value)) {
// 				throw new Error('Email address is invalid!')
// 			}
// 		},
// 	},
// 	age: {
// 		type: Number,
// 		default: 0,
// 		validate(value) {
// 			if (value < 0) {
// 				throw new Error('Age must be positive!')
// 			}
// 		},
// 	},
// 	password: {
// 		type: String,
// 		required: true,
// 		// minLength: 6,
// 		trim: true,
// 		validate(value) {
// 			if (value.length < 6) {
// 				throw new Error('Password must be greater than 6 characters!')
// 			} else if (value.toLowerCase().includes('password')) {
// 				throw new Error('Password cannot contain "password"!')
// 			}
// 		},
// 	},
// }

// const User = mongoose.model('User', shemaUser)

// const user = new User({
// 	name: '  Ivan',
// 	email: '   gyrra90@mail.ru          ',
// 	password: '     Password3443 ',
// })

// user
// 	.save()
// 	.then(user => console.log(user))
// 	.catch(error => console.log(error))
