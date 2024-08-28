import { createApp } from "./app.js";
import { MovieModel } from "./models/local-file-system/movie.js"

createApp({movieModel: MovieModel}) // se llama a createApp y como propiedad se le pasa el modelo MovieModel de local json