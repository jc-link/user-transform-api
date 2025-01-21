const express = require('express')
//const cors = require('cors')
const controller = require('./src/controllers/userController')
const connectDB = require('./src/config/db')

const PORT = process.env.PORT || 3333

const app = express()

const base_url = '/api/v1'

app.disable('x-powered-by')
app.use(express.json())

connectDB()

app.use(`${base_url}/user`, controller)

app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})