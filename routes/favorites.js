import express from 'express';
import Movie from '../models/movie.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  await req.user.populate('favorites');
  res.json(req.user.favorites);
});

router.post('/', authMiddleware, async (req, res) => {
  const { id, title, year, poster_path } = req.body;
  
  if (!id) {
    return res.status(400).json({ error: 'Movie ID is required' });
  }

  try {
    let movie = await Movie.findOne({ id });

    if (!movie) {
      const fullPosterUrl = poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : '';
      movie = new Movie({ id, title, year, poster: fullPosterUrl });
      await movie.save();
    }

    if (!req.user.favorites.includes(movie._id)) {
      req.user.favorites.push(movie._id);
      await req.user.save();
    }
    
    res.status(200).json({ message: 'Movie added to favorites' });
  } catch (err) {
    res.status(500).json({ error: 'Server error while adding movie' });
  }
});

router.delete('/:movieId', authMiddleware, async (req, res) => {
  req.user.favorites = req.user.favorites.filter(
    (favId) => favId.toString() !== req.params.movieId
  );
  await req.user.save();
  res.status(200).json({ message: 'Movie removed from favorites' });
});

export default router;