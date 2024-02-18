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

// Read profile

router.get('/users/me', auth, async (req, res) => {
	res.send(req.user)
})

// Update Profile by id

router.patch('/users/me', auth, async (req, res) => {
	const updates = Object.keys(req.body)
	const allowKeysForUpdate = ['name', 'email', 'age', 'password']
	const isValidUpdate = updates.every(el => allowKeysForUpdate.includes(el))
	if (!isValidUpdate) {
		res.status(400).send({ error: 'Invalid update!' })
	}

	try {
		updates.forEach(update => (req.user[update] = req.body[update]))
		await req.user.save()
		res.send(req.user)
	} catch (e) {
		res.status(400).send(e)
	}
})

// Delete profile

router.delete('/users/me', auth, async (req, res) => {
	try {
		await req.user.deleteOne({ _id: req.user._id })
		res.send(req.user)
	} catch (e) {
		res.status(500).send()
	}
})

module.exports = router
