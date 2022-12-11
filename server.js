const express = require('express')
// const routerProductos = require('./routers/productos')

// Configuraciones
const app = express()
require('dotenv').config()

// Middleware (Use, toda mi aplicación está afectada por estos middlewares)
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// Routeo de mi aplicación
// app.use('/api/productos' , routerProductos) // (1)
app.use('/api/productos' , require('./routers/productos')) // (2)
app.use('/api/carrito' , require('./routers/carrito')) // (2)
app.use('/api/upload' , require('./routers/upload')) // (2)



const PORT = process.env.PORT
app.listen(PORT, (err) => {
    if ( err ) throw new Error(`Sucedió un error ${err}`)

    console.log(`Servidor arriba, escuchando en le puerto: ${PORT}`)
})