const path = require('path')
const fs = require('fs')
// npm package to create unique ids
const uniqid = require('uniqid')

const router = require('express').Router()

// let db = fs.readFileSync('db/db.json')
// db = JSON.parse(db)
let db = JSON.parse(fs.readFileSync('db/db.json'))

// read the db.json file and return saved notes as json
router.get('api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../db/db.json'))
    res.json(db)
})

// receive a new note, add it to db.json, and return it to the client
router.post('api/notes', (req, res) => {
    console.log("Req body:", req.body)
    res.json(db)
    // // create notes body
    let createNote = {
        title: req.body.title,
        text: req.body.text,
        // unique id for the note
        id: uniqid()
    }
    db.push(createNote)
    updateDb()
    return console.log("New note added: " + createNote.title)
})

// delete a note by using its id
router.delete('api/notes/:id', (req, res) => {
    db.splice(req.params.id, 1)
    updateDb()
    console.log("Deleted note with id: " + req.params.id);
})

function updateDb() {
    fs.writeFile("db/db.json",json.stringify(db, '\t'),err => {
        if(err) throw err
        return true
    })
}

module.exports = router