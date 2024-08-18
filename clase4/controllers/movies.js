import { MovieModel } from "../models/movie.js"
import { validateMovie, validatePartialMovie } from "../schemas/movies.js" // validar las entradas de usuario
export class MovieController {
  static async getAll  (req, res) {
    const { genre } = req.query
    const movies = await MovieModel.getAll({ genre })
    
    res.json(movies)
  }

  static async getById  (req, res) {
    const { id } = req.params
  
    const movie = await MovieModel.getById({ id })
  
    if (movie) return res.json(movie)
  
    res.status(404).json({ message: 'not found'})
    
  }

  static async create (req, res) {
    const result = validateMovie(req.body) // validar informacion sea completa y de formato correcto
  
    if (!result.success) { // mensaje en caso de haber problemas con la validacion se envia mensaje especificando
      return res.status(400).json({ error:JSON.parse( result.error.message) })
    }
  
    const newMovie = await MovieModel.create({input: result.data})
    
    res.status(201).json(newMovie)
  }

  static async update  (req, res ) {

    const { id } = req.params // identificador de la movie a modificar
    const result = validatePartialMovie(req.body) // se valida el dato sea correcto
  
    if (!result.success) return res.status(404).json({ error: JSON.parse(result.error.message)}) // si la validacion es incorrecta muestra el mensaje con el posible error
  
    const updatedMovie = await MovieModel.update({id, input: result.data})
    
    if (!updatedMovie) return res.status(404).json({ message: 'movie not found' }) // si el id es incorrecto o no existe
    
    return res.status(200).json(updatedMovie) // si es verdadero se espera la movie modificada
  }

  static async delete (req, res) {
    const { id }= req.params
    const result = await MovieModel.delete({id})
  
    if (!result) return res.status(400).json({ message: 'movie not found'})
  
    return res.json({ message: 'movie deleted' })
  }
}