const fs = require('fs')
const chalk = require('chalk')

/* loadNotes is a function which will load the notes in to the operation function 
   if the file of the given name exists the data from that file is fetched and loaded
   else an empty array will be returned. 
   if file of the given name doesnt exist then it will throw an error which will be 
   handled by catch */

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }
    catch (e) {
        return []
    }
}
/* saveNotes will take notes as input and save them into json file*/

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

/* addNote Function takes title and body as input and add them in to notes file 
   only if there is no file with the same title otherwise it will log title taken*/

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNotes = notes.filter((note) => note.title === title)
    const duplicateNote = notes.find((note) => note.title === title)

    debugger

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
    } else {
        console.log(chalk.red.inverse('This Title Is Taken'))
    }
}

/* load notes in the memory find the note of the matching title and log it 
if no note if found with that name it will log that no not is found */
const removeNote = (title) => {
    const notes = loadNotes()
    const newData = notes.filter((note) => note.title !== title)
    if (notes.length > newData.length) {
        console.log(chalk.green.inverse('Notes Removed'))
        saveNotes(newData)
    } else {
        console.log(chalk.red.inverse("No Note Found"))
    }
}
/* list all the notes title in the json file*/

const list = () => {
    const notes = loadNotes()
    console.log(chalk.green.inverse('Your Notes'))
    notes.forEach((note) => {
        console.log(note.title)
    })
}
/* read the note whose title is provided*/
const read = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)
    if (note) {
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red.inverse('Note not found'))
    }
}
//list of modules which are to me exported to the other files
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    list: list,
    read: read
}