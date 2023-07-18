const fs = require('fs')

const fileName = 'notes.txt'
const fileData = 'Add new text in file with appendFileSync method help 2'

// fs.writeFileSync(fileName, 'This file is created by Node.js')
fs.appendFileSync(fileName, `\n${fileData}`)
