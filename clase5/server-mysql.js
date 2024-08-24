import { createApp } from "./app.js";
import { MovieModel } from "./models/mysql/movie.js";

createApp({movieModel: MovieModel}) // se llama a createApp y como propiedad se le pasa el modelo MovieModel de mysql