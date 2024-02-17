const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

// Create user
router.post('/users', async (req, res) => {
	const user = new User(req.body)
	try {
		await user.save()
		const token = await user.generateAuthToken()
		res.status(201).send({ user, token })
	} catch (e) {
		res.status(400).send(e)
	}
})

// User login

router.post('/users/login', async (req, res) => {
	try {
		const user = await User.findByCredentials(req.body.email, req.body.password)
		const token = await user.generateAuthToken()
		res.send({ user, token })
	} catch (e) {
		res.status(400).send()
	}
})

// User logout

router.post('/users/logout', auth, async (req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter(token => {
			return token.token !== req.token
		})
		await req.user.save()
		res.send('Succes logout!')
	} catch (e) {
		res.status(500).send()
	}
})

// User logoutAll

router.post('/users/logoutall', auth, async (req, res) => {
	try {
		req.user.tokens = []
		await req.user.save()
		res.send('Succes logout all of devices!')
	} catch (e) {
		res.status(500).send()
	}
})

// Read users

router.get('/users/me', auth, async (req, res) => {
	res.send(req.user)
})

// Read user

router.get('/users/:id', async (req, res) => {
	const _id = req.params.id

	try {
		const user = await User.findById(_id)
		if (!user) {
			return res.status(404).send()
		}
		res.send(user)
	} catch (e) {
		res.status(500).send()
	}
})

// Update user by id

router.patch('/users/:id', async (req, res) => {
	const updates = Object.keys(req.body)
	const allowKeysForUpdate = ['name', 'email', 'age', 'password']
	const isValidUpdate = updates.every(el => allowKeysForUpdate.includes(el))
	if (!isValidUpdate) {
		res.status(400).send({ error: 'Invalid update!' })
	}

	const _id = req.params.id
	try {
		const user = await User.findById(_id)

		updates.forEach(update => (user[update] = req.body[update]))

		await user.save()

		if (!user) {
			return res.status(404).send()
		}
		res.send(user)
	} catch (e) {
		res.status(400).send(e)
	}
})

// Delete user by id

router.delete('/users/:id', async (req, res) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id)
		if (!user) {
			res.status(404).send()
		}
		res.send(user)
	} catch (e) {
		res.status(500).send()
	}
})

module.exports = router
