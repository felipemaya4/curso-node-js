const express = require('express')
const ditto = require('./pokemon/ditto.json')

const app = express()

app.disable('x-powered-by')
const PORT = process.env.PORT ?? 1234

app.use(express.json())

// app.use((req, res, next) => {
//   if (req.method !== 'POST' || req.headers['content-type'] !== 'application/json') return next()
//   // middleware solo para peticiones que sean post y contentype json
//   let body = ''
//   //  escuchar el evento capturar las porciones del mensaje
//   req.on('data', chunk => {
//     // junta las porciones del body
//     body += chunk.toString()
//   })
//
//   // manejar el evento
//   req.on('end', () => {
//     const data = JSON.parse(body)
//     data.timestamp = Date.now()
//     req.body = data
//     next()
//   })
// })

app.get('/', (req, res) => {
  res.send('<h1>Mi pagina</h1>')
})

app.get('/pokemon/ditto', (req, res) => {
  res.json(ditto)
})

app.post('/pokemon', (req, res) => {
  // le agregamos un nuevo item al json
  req.body.timestamp = Date.now()
  res.status(201).json(req.body)
})

app.use((req, res) => {
  res.status(404)
    .send('<h1>404</h1>')
})

app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT} !`)
})
