import { Router } from "express";
import { createSong, deleteSong, createAlbum, deleteAlbum } from "../controller/admin.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router()

router.post("/create-song", protectRoute, requireAdmin, createSong)
router.delete("/delete-song/:id", protectRoute, requireAdmin, deleteSong)

router.post("/create-album", protectRoute, requireAdmin, createAlbum)
router.delete("/delete-album/:id", protectRoute, requireAdmin, deleteAlbum)
export default router