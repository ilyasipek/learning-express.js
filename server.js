import express from 'express'
import bodyParser from 'body-parser'

const app = express()
const PORT = 3000

// Adds a middleware to parse every request/respose with json
app.use(bodyParser.json())

app.listen(PORT, () => {
    return console.log(`Our server is working on http://localhost:${PORT}`)
})

app.get('/', (req, res) => {
    res.status(200).send("Cool stuff")
})