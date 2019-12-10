const fs = require('fs')
const chalk = require('chalk')

//Get the list of notes
const getNotesList = () => {
    const Notes = loadNotes()

    console.log(chalk.blue('Your Notes....'))

    //Using forEach loop to fetch all the notes
    Notes.forEach(note => {
        console.log("Note Title: ",note.title)
    });
}

//Fetching a single note on bases of title
const getNote = (title) => {
    //loading existing notes
    const Notes = loadNotes()

    //Using find method to find the note and break loop after that
    const note = Notes.find((note) => note.title === title)

    if(note){
        console.log(chalk.green.bold('Title: ',note.title))
        console.log('body: ',note.body)
    }else{
        console.log(chalk.red.bold('Note doesnt exist'))
    }
}

const addNotes = (title, body) => {
    //loading existing notes
    const notes = loadNotes()

    /*
    check whether object with same title exist before or not
    */
    //find returns the first match while filter gets all the matches
    const duplicate = notes.find((note) => note.title === title)

    if (!duplicate) {
        //pushing notes to object array
        notes.push({
            title: title,
            body: body
        })

        //saving the object array
        saveNotes(notes)

        console.log(chalk.green('Note Saved'))
    }else{
        console.log(chalk.red('Note with same title already exist'))
    }

}

const removeNote = (title) => {
    //loading existing notes
    const notes = loadNotes()

    /*
    check whether object with same title exist before or not and save all notes except matched,
    filter function gives the subset of array. 
    */
    const duplicate = notes.filter((note) => {

        //return all items except object with same title
        return note.title !== title
    })

    if (duplicate.length !== notes.length) {
        
        //saving the object array after note removed
        saveNotes(duplicate)

        console.log(chalk.green('Note Removed'))
    }else if(duplicate.length === notes.length){
        console.log(chalk.red('Note with same title doesnt exist'))
    }
}


/*
 method take notes from file and convert it from buffer to string and then string to object,
 if no file found then return empty array
*/
const loadNotes = () => {
    try {
        const bufferData = fs.readFileSync('notes.json')
        const stringData = bufferData.toString()
        const notes = JSON.parse(stringData)
        return notes
    } catch (e) {
        return []
    }
}

//method converts notes to json string and saves in file
const saveNotes = (notes) => {
    const noteString = JSON.stringify(notes)
    fs.writeFileSync('notes.json', noteString)
}

module.exports = {
    getNotesList: getNotesList,
    addNotes: addNotes,
    removeNote: removeNote,
    getNote: getNote
}