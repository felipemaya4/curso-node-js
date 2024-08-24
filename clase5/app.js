import express, { json } from 'express'
// import movies  from './movies.json' with { type: 'json'} // for que sera oficial muy pronto
import { createMovieRouter } from './routes/movies.js' // gestor de la ruta /movies
import { corsMiddleware } from './middlewares/cors.js' // valida los datos de entrada sean correctos
import { MovieModel } from './models/mysql/movie.js'

export const createApp =({movieModel}) =>{
  const app = express()
  app.disable('x-powered-by') // deshabilitar este cabecero

  app.use(corsMiddleware()) // verifica si el origen está habilitado para consultar esta api

  app.use(json()) // valida si la request tiene datos json y tenga la etiqueta content type application/json y los parsea a un objeto y los incluye en el req.body para que se pueda leer

  app.use('/movies', createMovieRouter({ movieModel})) // maneja todas las consultas que se hagan a /movies y las redirige al modulo moviesRoutes para que sea gestionado

  app.use((req, res) => { // 404
    res.status(404)
      .json({ message: '404 not fund'})
  })

  const port = process.env.PORT ?? 1234

  app.listen(port, () => {
    console.log(`servidor escuchando en el puerto http://localhost:${port}/movies `)
  })
}

