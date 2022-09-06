const path = require('path')
const fs = require('fs')
const {promisify} = require('util')
// npm package to create unique ids
const uniqid = require('uniqid')
const { del } = require('express/lib/application')

const router = require('express').Router()
const readFilePromise = promisify(fs.readFile)
const writeFilePromise = promisify(fs.writeFile)

// read the db.json file and return saved notes as json
router.get('/notes', (req, res) => {
    readDb().then(value => {
        res.json(JSON.parse(value));
    }).catch(err => {
        console.log(err);
    })
})

// receive a new note, add it to db.json, and return it to the client
router.post('/notes', (req, res) => {
    console.log("Req body:", req.body)
    readDb().then(value => {
        const notes = JSON.parse(value);
        // // create notes body
    let createNote = {
        title: req.body.title,
        text: req.body.text,
        // unique id for the note
        id: uniqid()
    }
    notes.push(createNote)
    updateDb(JSON.stringify(notes)).then(() => {
        res.sendStatus(200)
    })
    })
})

// delete a note by using its id
router.delete('/notes/:id', (req, res) => {
    readDb().then(value => {
        const notes = JSON.parse(value)
    let deleteNotes = notes.filter(item => item.id !== req.params.id)
    // updateDb()
    // console.log("Deleted note with id: " + req.params.id);
    updateDb(JSON.stringify(deleteNotes)).then(() => {
        res.sendStatus(200)
    })
    })
})

function updateDb(data) {
    return writeFilePromise(path.join(__dirname, '../db/db.json'), data)
}

function readDb() {
    return readFilePromise(path.join(__dirname, '../db/db.json')) 
}

module.exports = router