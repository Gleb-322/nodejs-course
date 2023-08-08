// CRUD create read update delete
const { MongoClient, ObjectId } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const client = new MongoClient(connectionURL)

// create
// const insertTasks = async () => {
// 	try {
// 		console.log('connected...')

// 		const tasksArray = [
// 			{
// 				description: 'descr1',
// 				completed: true,
// 			},
// 			{
// 				description: 'descr2',
// 				completed: false,
// 			},
// 			{
// 				description: 'descr3',
// 				completed: false,
// 			},
// 		]

// 		const db = client.db(databaseName)
// 		await db
// 			.collection('tasks')
// 			.insertMany(tasksArray)
// 			.then(res => console.log(res))
// 			.catch(error => error)
// 	} catch (e) {
// 		console.log(e.message)
// 	}
// }

// insertTasks()

// read

// const readTasks = async () => {
// 	try {
// 		const db = client.db(databaseName)

// 		await db
// 			.collection('tasks')
// 			.findOne({ _id: new ObjectId('64d120628a69c298372bfc2c') })
// 			.then(res => console.log(res))
// 			.catch(e => e)

// 		await db
// 			.collection('tasks')
// 			.find({ completed: false })
// 			.toArray()
// 			// .countDocuments({ completed: false })
// 			.then(res => console.log(res))
// 			.catch(e => e)
// 	} catch (e) {
// 		console.log(e.message)
// 	}
// }

// readTasks()

// update

// const updateTasks = async () => {
// 	try {
// 		const db = client.db(databaseName)
// 		await db
// 			.collection('tasks')
// 			.updateMany(
// 				{
// 					completed: false,
// 				},
// 				{
// 					$set: {
// 						completed: true,
// 					},
// 				}
// 			)
// 			.then(() => {
// 				db.collection('tasks')
// 					.countDocuments({ completed: true })
// 					.then(res => console.log(res))
// 					.catch(e => e)
// 			})
// 			.catch(e => e)
// 	} catch (e) {
// 		console.log(e.message)
// 	}
// }

// updateTasks()

// delete

const deleteTasks = async () => {
	try {
		const db = client.db(databaseName)
		await db
			.collection('tasks')
			.deleteOne({
				description: 'descr1',
			})
			.then(() => {
				db.collection('tasks')
					.countDocuments()
					.then(res => console.log(res))
					.catch(e => e)
			})
			.catch(e => e)
	} catch (e) {
		console.log(e.message)
	}
}

deleteTasks()
