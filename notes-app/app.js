const yargs = require('yargs')

yargs.command({
	command: 'add',
	describe: 'Add a note',
	builder: {
		title: {
			discribe: 'Title note',
			demandOption: true,
			type: 'string',
		},
		body: {
			discribe: 'Body note',
			demandOption: true,
			type: 'string',
		},
	},
	handler: () => {
		console.log(`Title: ${yargs.argv.title}\nBody: ${yargs.argv.body}`)
	},
})

yargs.command({
	command: 'remove',
	describe: 'Remove a note',
	handler: () => {
		console.log('Removing a note...')
	},
})

yargs.command({
	command: 'list',
	describe: 'Show list of notes',
	handler: () => {
		console.log('Showing list of notes...')
	},
})

yargs.command({
	command: 'read',
	describe: 'Read selected note',
	handler: () => {
		console.log('Open selected note to read it...')
	},
})

yargs.parse()
