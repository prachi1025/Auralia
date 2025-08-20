import { Router } from "express";
import { createSong, deleteSong, createAlbum, deleteAlbum, checkAdmin } from "../controller/admin.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router()

// Middleware to protect routes and check for admin access
router.use(protectRoute, requireAdmin);

router.get("/check", checkAdmin)

router.post("/create-song", createSong)
router.delete("/delete-song/:id", deleteSong)

router.post("/create-album", createAlbum)
router.delete("/delete-album/:id", deleteAlbum)

export default router