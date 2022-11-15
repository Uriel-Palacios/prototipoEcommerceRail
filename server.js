const express = require('express')

// Configuraciones
const app = express()
require('dotenv').config()

// Middleware
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// Routeo de mi aplicación
app.get('/', (req, res) => {
    res.send('Holaaa')
})


const PORT = process.env.PORT
app.listen(PORT, (err) => {
    if ( err ) throw new Error(`Sucedió un error ${err}`)

    console.log(`Servidor arriba, escuchando en le puerto: ${PORT}`)
})