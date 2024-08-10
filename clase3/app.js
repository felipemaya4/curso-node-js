const express = require('express')
const crypto = require('node:crypto')
const movies = require('./movies.json')
const { validateMovie } = require('./schemas/movies')

const app = express()
app.disable('x-powered-by')
app.use(express.json())

app.get('/movies',(req, res) => {
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

app.get('/movies/:id',(req, res) => { // si quieres pasar a regex utilizar la libreria path to regex
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

  const newMovie = { // si es correcto se crea el recurso
    id: crypto.randomUUID(), // uuid v4
    ...result.data
  }

  movies.push(newMovie)

  res.status(201).json(newMovie)
})

const port = process.env.PORT ?? 1234

app.listen(port, () => {
  console.log(`servidor escuchando en el puerto http://localhost:${port} `)
})