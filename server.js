import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import favoriteRoutes from './routes/favorites.js';
import movieRoutes from './routes/movies.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/movies', movieRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MONGODB CONNECTED'))
.catch((err) => console.error('MONGO ERROR:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});