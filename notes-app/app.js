const validator = require('validator')
const chalk = require('chalk')
const getNotes = require('./notes')

const notes = getNotes()

console.log(notes)
console.log(validator.isEmail('foo@bar.com'))

console.log(chalk.inverse.bold.green('Success'))
console.log(chalk.inverse.underline.yellow('Warning'))
console.log(chalk.dim.inverse.strikethrough.red('Error'))
