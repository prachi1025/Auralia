import { Song } from '../model/song.model.js';
import { Album } from '../model/album.model.js';

export const getAllSongs = async (req, res, next) => {
  try {
    const songs = await Song.find().sort({ createdAt: -1 }) // Fetch all songs sorted by creation date
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getFeaturedSongs = async (req, res, next) => {
  try {
    const featuredSongs = await Song.aggregate([
      { 
        $sample: { size: 6 } 
      }, // Randomly sample 6 songs
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        }
      }
    ]);

    res.status(200).json(featuredSongs);
  } catch (error) {
    next(error);
  }
}

export const getMadeForYou = async (req, res, next) => {
  try {
    const madeForYouSongsSongs = await Song.aggregate([
      { 
        $sample: { size: 4 } 
      }, // Randomly sample 4 songs
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        }
      }
    ]);

    res.status(200).json(madeForYouSongsSongs);
  } catch (error) {
    next(error);
  }
} 

export const getTrendingSongs = async (req, res, next) => {
  try {
    const trendingSongs = await Song.aggregate([
      { 
        $sample: { size: 4 } 
      }, // Randomly sample 4 songs
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        }
      }
    ]);

    res.status(200).json(trendingSongs);
  } catch (error) {
    next(error);
  }
} 