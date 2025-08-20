import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import cloudinary from "../lib/cloudinary.js";

// Function to upload files to Cloudinary
const uploadToCloudinary = async (file) => {
    try {       
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            resource_type: "auto",
        });
        return result.secure_url;
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        throw new Error("Cloudinary upload failed");
    }
}

export const checkAdmin = (req, res) => {
    res.status(200).json({ message: "Admin check successful" });        
}

export const createSong = async (req, res, next) => {
    try {
        if (!req.files || !req.files.audioFile || !req.files.imageFile) {
            return res.status(400).json({ message: "Bad Request: Missing audio or image file" });
        }

        const { title, artist, albumId, duration } = req.body;
        const audioFile = req.files.audioFile;
        const imageFile = req.files.imageFile;

        // upload files to Cloudinary
        const audioURL = await uploadToCloudinary(audioFile);
        const imageURL = await uploadToCloudinary(imageFile);

        const song = new Song({
            title,
            artist,
            audioURL,
            imageURL,
            duration,
            albumId: albumId || null
        });

        await song.save();

        // if song is associated with an album, update the album's songs array
        if (albumId) {
            const album = await Album.findByIdAndUpdate(albumId, {
                $push: { songs: song._id }
            }, { new: true });
        }
        res.status(201).json({ message: "Song created successfully", song });
    } catch (error) {
        console.log("Error creating song:", error);
        next(error);
    }
}

export const deleteSong = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Find the song by ID
        const song = await Song.findById(id);
        if (!song) {
            return res.status(404).json({ message: "Song not found" });
        }

        // Delete the song from Cloudinary
        const publicId = song.audioURL.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId, { resource_type: "video" });

        // Remove the song from the database
        await Song.findByIdAndDelete(id);

        // If the song is associated with an album, remove it from the album's songs array
        if (song.albumId) {
            await Album.findByIdAndUpdate(song.albumId, {
                $pull: { songs: song._id }
            });
        }

        res.status(200).json({ message: "Song deleted successfully" });
    } catch (error) {
        console.log("Error deleting song:", error);
        next(error);
    }
}

export const createAlbum = async (req, res, next) => {
    try {
        const { title, artist, releaseYear } = req.body;
        const { imageFile } = req.files;

        const imageURL = await uploadToCloudinary(imageFile); 
        if (!imageURL) {
            return res.status(400).json({ message: "Bad Request: Image upload failed" });
        }

        const album = new Album({ 
            title, 
            artist, 
            releaseYear, 
            imageURL 
        });

        await album.save();

        res.status(201).json({ message: "Album created successfully", album });
    } catch (error) {
        console.log("Error creating album:", error);
        next(error);
    }
}

export const deleteAlbum = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Find the album by ID
        const album = await Album.findById(id);
        if (!album) {
            return res.status(404).json({ message: "Album not found" });
        }       
        // Delete the album's image from Cloudinary
        const publicId = album.imageURL.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId, { resource_type: "image" });

        // Remove the album from the database
        await Album.findByIdAndDelete(id); 

        // Remove the album's songs from the database
        await Song.deleteMany({ albumId: id });

        res.status(200).json({ message: "Album deleted successfully" });
    } catch (error) {
        console.log("Error deleting album:", error);
        next(error);
    }
}