const router = require('express').Router()

// read the db.json file and return saved notes as json
router.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../db/db.json'))
})

module.exports = router