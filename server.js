import express from 'express'
import bodyParser from 'body-parser'
import usersRoute from './routes/users.js'

const app = express()
const PORT = 3000

// Adds a middleware to parse every request/respose with json
app.use(bodyParser.json())

// add routes
app.use('/users', usersRoute)

app.listen(PORT, () => {
    return console.log(`Our server is working on http://localhost:${PORT}`)
})