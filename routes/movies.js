import express from "express";
import Movie from "../models/movie.js";
const router =express.Router();

router.get('/',async(req,res)=>{
    try{
        const movies=await Movie.find();
        res.json(movies);
    }catch(err){
        console.log("error");
    }
});
router.post('/', async (req, res) => {
  const { title, year, poster } = req.body;
  try {
    const newMovie = new Movie({ title, year, poster });
    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(400).json({ error: 'Error adding movie' });
  }
});

export default router;