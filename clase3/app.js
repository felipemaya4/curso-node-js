const express = require('express')
const crypto = require('node:crypto')
const cors = require('cors') // cors permite la gestion de las paginas que consultan a la api rest si tiene todos los permisos para consulta o realizar modificaciones
const movies = require('./movies.json')
const { validateMovie, validatePartialMovie } = require('./schemas/movies') // modulo para manejar las validaciones
const { error } = require('node:console')

const app = express()
app.disable('x-powered-by') // deshabilitar este cobecero

app.use(cors({ // manejo de cors habilita las paginas que estan en la lista para realizar consultas y operaciones
              // si no está entonces no podra realizar ninguna accion
  origin: (origin, callback) => {
    const ACCEPTED_ORIGINS = [
      'http://localhost:8080',
      'http://localhost:1234',
      'https://movies.com',
      'https://midu.dev'
    ]

    if (ACCEPTED_ORIGINS.includes(origin)) return callback(null, true)
    
    if (!origin) return callback(null, true)

    return callback(new error('not allowed by CORS'))
  }
}))

app.use(express.json()) // valida si la request tiene datos json y tenga la etiqueta content type application/json y los parsea a un objeto y los incluye en el req.body para que se pueda leer



// metodos normales get/post/head
//metodos complejos put/patch/delete
// para estos ultimos se realiza un pre-fligth para preguntar a la api si se pueden utilizar los metodos put/patch/delete
// es necesario agregregar una cabecera options para poder habilitar estos metodos


app.get('/movies',(req, res) => { // obtener todas las peliculas
  /*
  const origin = req.header('origin')
  if (ACCEPTED_ORIGINS.includes(origin) || !(origin)) {  // se inserta header si el sitio está permitido
    res.header('Access-Control-Allow-Origin', origin )
  }
  */
  const { genre } = req.query
  // se filtra resultado por genero de peliculas en minusculas
  if (genre) {
    const filterMovieByGenre = movies.filter(
      movie => movie.genre.some(g => g.toLowerCase() == genre.toLowerCase())
    )
    return res.json(filterMovieByGenre)
  }

  res.json(movies)
})

app.get('/movies/:id',(req, res) => { // si quieres pasar a regex utilizar la libreria path to regex --- obtener solo una peli
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)
  if (movie) return res.json(movie)
  
  res.status(404).json({ message: 'movie not found'})
})

app.post('/movies', (req, res) => { // crear un nuevo recurso
 
  const result = validateMovie(req.body) // validar informacion sea completa y de formato correcto

  if (result.error) { // mensaje en caso de haber problemas con la validacion se envia mensaje especificando
    return res.status(400).json({ error:JSON.parse( result.error.message) })
  }

  const newMovie = { // si es correcto se crea el recurso --- base de datos
    id: crypto.randomUUID(), // uuid v4
    ...result.data
  }

  movies.push(newMovie)

  res.status(201).json(newMovie)
})

app.patch('/movies/:id', (req, res) => {
  const { id } = req.params // identificador de la movie a modificar
  const result = validatePartialMovie(req.body) // se valida el dato sea correcto

  if (!result.success) return res.status(404).json({ error: JSON.parse(result.error.message)}) // si la validacion es incorrecta muestra el mensaje con el posible error

  const movieIndex = movies.findIndex(movie => movie.id === id) // hallar el indice de la movie que se esta solicitando para modificar

  if (movieIndex === -1) return res.status(404).json({ message: 'movie not found' }) // si el id es incorrecto o no existe

  const updateMovie = { // conbina el objeto de la lista con el objeto que contiene los atributos a modificar
    ...movies[movieIndex],
    ...result.data
  }

  movies[movieIndex] = updateMovie // se actualiza la base de datos

  return res.status(200).json(updateMovie)
  

})

app.delete('/movies/:id', (req, res) => {
 /*
  const origin = req.header('origin')
  if (ACCEPTED_ORIGINS.includes(origin) || !(origin)) {
    res.header('Access-Control-Allow-Origin', origin )
   // res.header('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE') // metodos permitidos por el cors
    res.send(201)
  }
*/
  const { id }= req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(400).json({ message: 'movie not found'})
  }

  movies.splice(movieIndex, 1)

  return res.json({ message: 'movie deteted' })
})
/*
app.options('/movies/:id', (req, res) => {
  const origin = req.header('origin')
  if (ACCEPTED_ORIGINS.includes(origin) || !(origin)) {
    res.header('Access-Control-Allow-Origin', origin )
    res.header('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE')
  }
  res.send(200)

})
*/
app.use((req, res) => { // 404
  res.status(404)
    .json({ message: '404 not fund'})
})

const port = process.env.PORT ?? 1234

app.listen(port, () => {
  console.log(`servidor escuchando en el puerto http://localhost:${port} `)
})