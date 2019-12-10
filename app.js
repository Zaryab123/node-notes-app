const Notes = require('./notes')
const yargs = require('yargs')

//updating yargs version
yargs.version('1.1.0')

//Create add command
yargs.command(
    //command
    'add',
    'Add a note',
    {
        title: {
            describe: 'title of Note',
            demandOption: true,
            type: 'String'
        },
        body: {
            describe: 'Body of note',
            demandOption: true,
            type: 'String'
        }
    },
    (argv) => {
        Notes.addNotes(argv.title,argv.body)
    }
)

//create remove command
yargs.command(
    'remove',
    'remove a note',
    {
        title: {
            describe: 'Title of note to remove',
            demandOption: true,
            type: 'String'
        }
    },
    (argv) => {
        Notes.removeNote(argv.title)
    }
)

//create list command
yargs.command(
    'list',
    'get list of notes',
    () => {
        Notes.getNotesList()
    }
)

//create show command
yargs.command(
    //command name
    'show',
    //description
    'show a note',
    //builder function
    {
        title: {
            describe: 'Fetching a note on bases of title',
            demandOption: true,
            type: String
        }
    },
    //handler function
    (argv) => {
        Notes.getNote(argv.title)
    }
)


//Yargs parse
yargs.parse()