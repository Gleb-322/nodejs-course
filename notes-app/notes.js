const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
	const notes = loadNotes()
	const dublicateNote = notes.find(note => note.title === title)

	if (!dublicateNote) {
		notes.push({
			title,
			body,
		})
		saveNotes(
			notes,
			chalk.inverse.green(`Add note with title: ${chalk.blue(title)}`)
		)
	} else {
		console.log(chalk.inverse.red('This title is taken!'))
	}
}
// my solution - не правильно (я фильтрую дважды массив!!!!!!)
// const removeNote = title => {
// 	const notes = loadNotes()
// 	const titleCorrect = notes.filter(note => note.title === title)

// 	if (titleCorrect.length === 1) {
// 		const filteredNotes = notes.filter(note => note.title !== title)
// 		saveNotes(
// 			filteredNotes,
// 			chalk.inverse.green(`Remove note with title: ${chalk.blue(title)}`)
// 		)
// 	} else {
// 		console.log(chalk.inverse.red('This title is missing!'))
// 	}
// }

// Andrew solution
const removeNote = title => {
	const notes = loadNotes()
	const filteredNotes = notes.filter(note => note.title !== title)

	if (notes.length > filteredNotes.length) {
		saveNotes(
			filteredNotes,
			chalk.inverse.green(`Remove note with title: ${chalk.blue(title)}`)
		)
	} else {
		console.log(chalk.inverse.red('This title is missing!'))
	}
}

const listNotes = () => {
	const notes = loadNotes()
	if (notes.length === 0) {
		console.log(chalk.inverse.red('Dont have notes'))
	} else {
		console.log(chalk.inverse.cyanBright('Your notes'))
		notes.forEach(note => {
			console.log('--------------')
			console.log(
				chalk.green.inverse(`Title: ${chalk.inverse.blue(note.title)}`)
			)
			console.log(
				chalk.green.inverse(`Body: ${chalk.inverse.magenta(note.body)}`)
			)
		})
	}
}

const readOneNote = title => {
	const notes = loadNotes()
	// лучше использовать метод find вместо filter, для оптимизации
	const selectedNote = notes.find(note => note.title === title)
	if (selectedNote) {
		console.log(chalk.inverse.cyanBright('Your selected note'))
		console.log(
			chalk.green.inverse(`Title: ${chalk.inverse.blue(selectedNote.title)}`)
		)
		console.log(
			chalk.green.inverse(`Body: ${chalk.inverse.magenta(selectedNote.body)}`)
		)
	} else {
		console.log(chalk.inverse.red('Dont have note with this title'))
	}
}

const saveNotes = (notes, successMessage = null) => {
	fs.writeFileSync('notes.json', JSON.stringify(notes))
	console.log(successMessage)
}

const loadNotes = () => {
	try {
		const noteBuffer = fs.readFileSync('notes.json')
		const note = noteBuffer.toString()
		return JSON.parse(note)
	} catch (e) {
		return []
	}
}

module.exports = {
	addNote,
	removeNote,
	listNotes,
	readOneNote,
}
