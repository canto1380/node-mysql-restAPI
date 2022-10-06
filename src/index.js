import express from 'express'
import bodyParser from 'body-parser'

import { PORT } from './config.js'

import employesRoutes from './routes/employes.routes.js'
import indexRoute from './routes/index.routes.js'

const app = express()
app.use(express.json()) //Recibe los datos en formato JSON y los procesa

// Middlewares
app.use(bodyParser.urlencoded({extended: false}))

app.use(indexRoute)
app.use('/api/employes', employesRoutes)
app.use((req, res, next) => {
  res.status(404).json({ Mensaje: 'No existe la ruta ingresada'})
})

app.listen(PORT)
console.log(`Servidor corriendo en el puerto ${PORT}`)
