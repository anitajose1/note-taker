const path = require('path')
const router = require('express').Router()

// route to serve notes.html page
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
})

// route to serve index.html page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

// wildcard route to catch an error request for a route that doesn't exist
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

module.exports = router