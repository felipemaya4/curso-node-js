import { Router } from 'express'
import { MovieController } from '../controllers/movies.js'

export const createMovieRouter = ({movieModel}) =>{

  const moviesRouter = Router()

  const movieController = new MovieController({ movieModel}) // se le pasa el modelo con que vamos a trabjar el objeto 

  moviesRouter.get('/', movieController.getAll) 

  moviesRouter.post('/', movieController.create)

  moviesRouter.get('/:id', movieController.getById)

  moviesRouter.patch('/:id', movieController.update)

  moviesRouter.delete('/:id', movieController.delete)

  return moviesRouter

}