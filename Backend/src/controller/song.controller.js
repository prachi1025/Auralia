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

