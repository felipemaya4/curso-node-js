const http = require('node:http')
const fs = require('node:fs')
const dittoJSON = require('./pokemon/ditto.json')
const processRequest = (req, res) => {
  const { method, url } = req
  switch (method) {
    case 'GET':
      switch (url) {
        case '/':
          res.statusCode = 200
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          res.end('<h1>inicio</h1>')
          break
        case '/contacto':
          res.statusCode = 200
          res.setHeader('Content-Type', 'text/html; charset=utf-8')

          res.end('<h1>Contacto</h1>')
          break
        case '/bebelindo.jpg':
          fs.readFile('./bebe lindo.jpg', (err, data) => {
            if (err) {
              res.statusCode = 500
              res.end('<h1>internal server error</h1>')
            } else {
              res.setHeader('Content-Type', 'image/jpg')
              res.end(data)
            }
          })
          break
        case '/pokemon/ditto':
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          return res.end(JSON.stringify(dittoJSON))
        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return res.end('<h1>404</h1>')
      }
      break
    case 'POST':
      switch (url) {
        case '/pokemon': {
          let body = ''
          // escuchar el evento data
          req.on('data', chunk => {
            body += chunk.toString()
          })

          // manejar el evento
          req.on('end', () => {
            const data = JSON.parse(body)
            // llamar a una base de datos para guardar la info
            res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' })

            data.timestamp = Date.now()
            res.end(JSON.stringify(data))
          })
        }
          break
        default:
          // en caso de solicitar una direccion que no existe en este metodo se mostrará este mensaje
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/plain; charset=utf-8')
          return res.end('404 not found')
      }
      break
    default :
      // en caso de solicitar una direccion que no existe en este metodo se mostrará este mensaje
      res.statusCode = 404
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      return res.end('<h1>404 metodo no configurado</h1>')
  }
}
const server = http.createServer(processRequest)
server.listen(1234, () => {

})
