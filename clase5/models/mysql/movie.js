import mysql from 'mysql2/promise'
import {randomUUID} from 'node:crypto'

const config = {
  host: 'localhost',
  port: '3333',
  user: 'root',
  password: 'root',
  database: 'moviesdb'
}
const connection = await mysql.createConnection(config)

export class MovieModel{
  static  async getAll ({genre}) {

    if(genre) {
      const upperCase = genre.toUpperCase()
      try {
        const [genreId] = await connection.query('SELECT id FROM genre WHERE nombre = ? ;', upperCase) // busca el id del genero
        if (genre.length === 0) return []

        const [movieListBygenre] = await connection.query( // se realiza una union con la tbla movie y genre_movie para selecionar las pelis que pertenecen a dicho genero
          'SELECT movie.* FROM movie JOIN movie_genre ON movie.id = movie_genre.movie_id WHERE movie_genre.genre_id = ? ;',[genreId[0].id])
        return movieListBygenre
      } catch (err) {
        console.log(err);
      }
    }

    try {
      const [movies, fields] = await connection.query(
        'SELECT * FROM movie;'
      );
      return movies
    } catch (err) {
      console.log(err);
    }
   
  }

  static async getById({id}) {

    try {
      const [movie, fields] = await connection.query(
        'SELECT * FROM movie WHERE id = ?;',[id]
      )

      if (movie.length === 0) return {message: 'not found'}

      return movie
      
    } catch (err) {
      console.log(err);
    }

    

  }
  static async create ({input}) {

    const uuid = randomUUID() // id de la pelicula

   // input.genre.forEach(element => {
    //  relacionarGenre.unshift(` INSERT INTO movie_genre (movie_id, genre_id) VALUES ('${uuid}',( select id from genre where nombre = '${element.toUpperCase()}'));`)
   // });
    try {
      const [movie, fields] = await connection.query(
        'INSERT INTO movie (id,title,Y,director,duration,poster,rate) values (?,?,?,?,?,?,?)',
        [uuid, input.title, input.year, input.director, input.duration, input.poster, input.rate]
      )

      if (movie.affectedRows === 0) throw new Error({message: 'the movie was not inserted'})

      for (const element of input.genre) {

        try {

          const sql = ` INSERT INTO movie_genre (movie_id, genre_id) VALUES (?,( select id from genre where nombre = ?));`
          const [genre, fields] = await connection.query(sql,[uuid,element.toUpperCase()])
          
          if (genre.affectedRows === 0) throw new Error({message: 'the genre was not inserted'});
          
      
        } catch (error) {
          console.log(error);
          throw error
        }
      }
    } catch (error) {
      console.log(error);
      return err
    }
    try {
      const [movie, fields] = await connection.query(`SELECT movie.* FROM movie WHERE id = ?`,[uuid])

      if(movie.affectedRows === 0) throw new Error({message: 'movie not found'})
      
      return movie

    } catch (error) {
      return error
    }
  }

  static async delete ({ id }) {

    try {
      const [movie, fields] = await connection.query(
        'DELETE FROM movie WHERE id = ?;',[id]
      );

      return movie.affectedRows

    } catch (err) {
      console.log(err);
    }
  
  }

  static async update ({id, input}) {

    try {
      if(input.hasOwnProperty('title')){
        const [update,fields] = await connection.query('UPDATE movie SET title = ? WHERE id = ? ;',[input.title,id])

        if(update.affectedRows === 0) throw new Error({message: 'title not updated'})
      }

      if (input.hasOwnProperty('year')){
        const [update,fields] = await connection.query('UPDATE movie SET Y = ? WHERE id = ? ;',[input.year,id])

        if(update.affectedRows === 0) throw new Error({message: 'year not updated'})
     
      }

      if (input.hasOwnProperty('director')){
        const [update,fields] = await connection.query('UPDATE movie SET director = ? WHERE id = ? ;',[input.director,id])

        if(update.affectedRows === 0) throw new Error({message: 'director not updated'})
     
      }

      if (input.hasOwnProperty('duration')){
        const [update,fields] = await connection.query('UPDATE movie SET duration = ? WHERE id = ? ;',[input.duration,id])

        if(update.affectedRows === 0) throw new Error({message: 'duration not updated'})
     
      }

      if (input.hasOwnProperty('poster')){
        const [update,fields] = await connection.query('UPDATE movie SET poster = ? WHERE id = ? ;',[input.poster,id])

        if(update.affectedRows === 0) throw new Error({message: 'poster not updated'})
     
      }

      if (input.hasOwnProperty('rate')){
        const [update,fields] = await connection.query('UPDATE movie SET rate = ? WHERE id = ? ;',[input.rate,id])

        if(update.affectedRows === 0) throw new Error({message: 'rate not updated'})
     }


     const [movie,fields] = await connection.query('SELECT * FROM movie WHERE id = ? ;',[id])

      if(movie.affectedRows === 0) throw new Error({message: 'not movie'})

      return movie
     

    } catch (error) {
      return error
    }
    
  }
}