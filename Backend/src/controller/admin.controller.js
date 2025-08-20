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

export const createSong = async (req, res) => {
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