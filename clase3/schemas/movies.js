const z = require('zod')

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'movie title must be a string',
    required_error: 'title is required'
  }),
  year: z.number().int().min(1900).max(2050),
  director: z.string(),
  duration: z.number().int().positive(),
  poster: z.string().url({
    message: 'poster must be a valid url'
  }),
  rate: z.number().min(0).max(10),
  genre: z.array(
    z.enum(["Action","Crime", "Drama", "Adventure", "Sci-Fi", "Romance", "Animation", "Biography", "Fantasy"]),
    {
      required_error: "movie genre is required",
      invalid_type_error: "movie genre is must be an arry of enum gener"
    }
  )
})

function validateMovie (object){
  return movieSchema.safeParse(object)
}

module.exports = { validateMovie }