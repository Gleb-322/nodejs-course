const validator = require('validator')
const mongoose = require('mongoose')

const shemaUser = {
	name: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		trim: true,
		lowercase: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error('Email address is invalid!')
			}
		},
	},
	age: {
		type: Number,
		default: 0,
		validate(value) {
			if (value < 0) {
				throw new Error('Age must be positive!')
			}
		},
	},
	password: {
		type: String,
		required: true,
		// minLength: 6,
		trim: true,
		validate(value) {
			if (value.length < 6) {
				throw new Error('Password must be greater than 6 characters!')
			} else if (value.toLowerCase().includes('password')) {
				throw new Error('Password cannot contain "password"!')
			}
		},
	},
}

const User = mongoose.model('User', shemaUser)

module.exports = User
