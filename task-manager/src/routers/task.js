const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

// Read tasks

router.get('/tasks', auth, async (req, res) => {
	try {
		// const tasks = await Task.find({ owner: req.user._id })
		await req.user.populate('tasks')
		res.send(req.user.tasks)
	} catch (e) {
		res.status(500).send()
	}
})

// Read task

router.get('/tasks/:id', auth, async (req, res) => {
	try {
		const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
		if (!task) {
			return res.status(404).send()
		}
		res.send(task)
	} catch (e) {
		res.status(500).send()
	}
})

// Create task
router.post('/tasks', auth, async (req, res) => {
	const task = new Task({
		...req.body,
		owner: req.user._id,
	})
	try {
		await task.save()
		res.status(201).send(task)
	} catch (e) {
		res.status(400).send(e)
	}
})

// Update task by id

router.patch('/tasks/:id', auth, async (req, res) => {
	const updates = Object.keys(req.body)
	const allowUpdateKeys = ['description', 'completed']
	const isValidUpdate = updates.every(key => allowUpdateKeys.includes(key))

	if (!isValidUpdate) {
		return res.status(400).send({ error: 'Invalid updates!' })
	}

	try {
		const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })

		if (!task) {
			return res.status(404).send()
		}

		updates.forEach(update => (task[update] = req.body[update]))
		await task.save()
		res.send(task)
	} catch (e) {
		res.status(400).send(e)
	}
})

// Delete task by id

router.delete('/tasks/:id', auth, async (req, res) => {
	try {
		const task = await Task.findOneAndDelete({
			_id: req.params.id,
			owner: req.user._id,
		})
		if (!task) {
			res.status(404).send()
		}
		res.send(task)
	} catch (e) {
		res.status(500).send()
	}
})

module.exports = router
