const http = require('node:http')
const fs = require('node:fs')
const desiredPort = process.env.PORT ?? 1234
const processRequest = (req, res) => {
  if (req.url === '/') {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end('<h1>hola mundo bienvenido a mi página</h1>')
  } else if (req.url === '/bebeLindo.jpg') {
    fs.readFile('./bebe lindo.jpg', (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('<h1>internal server error</h1>')
      } else {
        res.setHeader('Content-Type', 'image/jpg')
        res.end(data)
      }
    })
  } else if (req.url === '/contacto') {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end('<h1>Contacto</h1>')
  } else {
    res.statusCode = 404 // not found
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end('<h1>404</h1>')
  }
}
const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log(`server listening on port http://localhost:${desiredPort}`)
})
