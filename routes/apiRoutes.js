const path = require('path')
const fs = require('fs')
// npm package to create unique ids
const uniqid = require('uniqid')

const router = require('express').Router()

// read the db.json file and return saved notes as json
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../db/db.json'))
})

// receive a new note, add it to db.json, and return it to the client
router.post('/notes', (req, res) => {
    console.log("Req body:", req.body)
    let db = fs.readFileSync('../db/db.json')
    db = JSON.parse(db)
    res.json(db)
    // create notes body
    let createNote = {
        title: req.body.title,
        text: req.body.text,
        // unique id for the note
        id: uniqid()
    }
    // push the new note to db.json
    db.push(createNote)
    fs.writeFileSync('../db/db.json', JSON.stringify(db))
    res.json(db)
})

// delete a note by using its id
router.delete('/notes/:id', (req, res) => {
    // read notes from db.json
    let db = JSON.parse(fs.readFileSync('../db/db.json'))
    // delete note with id
    let deleteNote = db.filter(item => item.id !== req.params.id)
    // rewrite note to dn.json
    fs.writeFileSync('../db/db.json', json.stringify(deleteNote))
    res.join(deleteNote)
})

module.exports = router