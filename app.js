const chalk = require('chalk')
const notes = require('./notes.js')
const yargs = require('yargs')

// const command = process.argv[2] //grabbing the user input from the command line
// console.log(process.argv)


// console.log(process.argv)

//customize yargs version

yargs.version('4.0.0') // changes the version number of the yargs for this project

// add, remove, read, list
//  create add command
//calling command method on yargs
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder:{
        title :{
            describe:'Note Title', //will tell what '--title' will do
            demandOption:true,// make the argument passing for title necessary
            type: 'string' // if nothing is passed in title like '--title' the the default value passed will be a boolean true if we dont set this object and after setting this the default value will be an empty string
        
            
        },
        body:{
            describe: 'Note Body',
            demandOption:true,
            type:'string'
        }
    },
    // this code in handler will run when someone will run the add command
    handler: function(argv){
        notes.addNote(argv.title,argv.body)
    }
})


// create remove command
yargs.command({
    command:'remove',
    describe:'Remove a note',
    builder:{
        title:{
            describe:'Note title',
            demandOption:true,
            type:'string'
        }
    },
    handler:function(argv){
        notes.removeNote(argv.title)
    }
})

//list
yargs.command({
    command:'list',
    describe:'listing out all the notes',
    handler:function(){
        notes.list()
    }
})
//read
yargs.command({
    command:'read',
    describe:'read the notes',
    builder:{
        title:{
        describe:'Note Title',
        demandOption:true,
        type:'string'
    }
},
    handler:function(argv){
        notes.read(argv.title)
    }
})

// console.log(yargs.argv)
yargs.parse() // goes through the process of parsing the arguments with all of the configuration details we have proveded with yargs command calls.

