import { randomUUID } from 'node:crypto'
import { readJSON } from '../utils.js'
const movies = readJSON('./movies.json')

export class MovieModel{
  static  async getAll ({genre}) {
    // se filtra resultado por genero de peliculas en minusculas
    if (genre) {
      return movies.filter(
        movie => movie.genre.some(g => g.toLowerCase() == genre.toLowerCase())
      )
    }

    return movies 
  }

  static async getById({id}) {

    const movie = movies.find(movie => movie.id === id)
    return movie

  }

  static async create ({input}) {

    const newMovie = { // si es correcto se crea el recurso --- base de datos
      id: randomUUID(), // uuid v4
      ...input
    }
  
    movies.push(newMovie) // se inserta en la "db"

    return newMovie
    
  }

  static async delete ({ id }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)

    if (movieIndex === -1) return false

    movies.splice(movieIndex, 1)
    return true
  }

  static async update ({id, input}) {
    const movieIndex = movies.findIndex(movie => movie.id === id) // hallar el indice de la movie que se esta solicitando para modificar
    if (movieIndex === -1) return false  // si el id es incorrecto o no existe

    const updateMovie = { // conbina el objeto de la lista con el objeto que contiene los atributos a modificar
      ...movies[movieIndex],
      ...input.data
    }
    movies[movieIndex] = updateMovie // se actualiza la base de datos
    return updateMovie
  

  }
}