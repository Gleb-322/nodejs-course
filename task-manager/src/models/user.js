const validator = require('validator')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const shemaUser = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		unique: true,
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
	tokens: [
		{
			token: {
				type: String,
				required: true,
			},
		},
	],
})

shemaUser.virtual('tasks', {
	ref: 'Task',
	localField: '_id',
	foreignField: 'owner',
})

// Hiding private date

shemaUser.methods.toJSON = function () {
	const user = this
	const userObject = user.toObject()
	delete userObject.password
	delete userObject.tokens
	return userObject
}

// Generate tokens

shemaUser.methods.generateAuthToken = async function () {
	const user = this
	const token = jwt.sign({ _id: user._id.toString() }, 'secret')
	user.tokens = user.tokens.concat({ token })
	await user.save()
	return token
}

// Login functional

shemaUser.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email })
	if (!user) {
		throw new Error('Unable to login!')
	}

	const isMatch = await bcrypt.compare(password, user.password)

	if (!isMatch) {
		throw new Error('Unable to login!')
	}
	return user
}

// Hashing password
shemaUser.pre('save', async function (next) {
	const user = this

	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8)
	}

	next()
})

// Delete tasks when user is removed

shemaUser.pre(
	'deleteOne',
	{ document: true, query: false },
	async function (next) {
		const user = this
		await Task.deleteMany({ owner: user._id })
		next()
	}
)

const User = mongoose.model('User', shemaUser)

module.exports = User
