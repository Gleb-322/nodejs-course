const yargs = require('yargs')
const { addNote, removeNote, listNotes, readOneNote } = require('./notes')

yargs.version('1.3.0')

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
	handler(argv) {
		addNote(argv.title, argv.body)
	},
})

yargs.command({
	command: 'remove',
	describe: 'Remove a note',
	builder: {
		title: {
			describe: 'Title note',
			demandOption: true,
			type: 'string',
		},
	},
	handler(argv) {
		removeNote(argv.title)
	},
})

yargs.command({
	command: 'list',
	describe: 'Show list of notes',
	handler() {
		listNotes()
	},
})

yargs.command({
	command: 'read',
	describe: 'Read selected note',
	builder: {
		title: {
			describe: 'Title note',
			demandOption: true,
			type: 'string',
		},
	},
	handler(argv) {
		readOneNote(argv.title)
	},
})

yargs.parse()
