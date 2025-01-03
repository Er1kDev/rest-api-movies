const z = require('zod');

const movieSchema = z.object({
    title: z.string({
        invalid_type_error: 'Title must be a string',
        required_error: 'Title is required'
    }),
    year: z.number().int().min(1900).max(2025),
    director: z.string(),
    duration: z.number().min(1).max(300),
    poster: z.string().url({
        message: 'Poster must be a valid URL'
    }),
    genre: z.array(
        z.enum(['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Sci-Fi', 'Thriller', 'Crime']),
        {
            required_error: 'Genre is required',
            invalid_type_error: 'Genre must be an array of strings',
        }
    ),
    rate: z.number().min(0).max(10).default(5),
});

function validateMovie(object) {
    return movieSchema.safeParse(object);
}

function validatePartialMovie(object) {
    return movieSchema.partial().safeParse(object);
}

module.exports = {
    validateMovie,
    validatePartialMovie
};