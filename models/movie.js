import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  poster: String,
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;