const express = require('express')

// connect server to route files
const apiRoutes = require('./routes/apiRoutes')
const htmlRoutes = require('./routes/htmlRoutes')

// creates express server
const app = express()

// if port number is not available in an environment variable, run 3004
const PORT = process.env.PORT || 3004

// middleware to set "public" as a static folder
app.use(express.static('public'))
// middleware to parse incoming string or array data
app.use(express.urlencoded({extended: true}))
// middleware to parse incoming JSON data
app.use(express.json())

app.use('/api', apiRoutes)
app.use('/', htmlRoutes)

// starts the server
app.listen(PORT, () => console.log(`API server started on port ${PORT}!`))