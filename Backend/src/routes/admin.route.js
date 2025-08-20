import { Router } from "express";
import { createSong, deleteSong } from "../controller/admin.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router()

router.post("/create-song", protectRoute, requireAdmin, createSong)
router.delete("/delete-song/:id", protectRoute, requireAdmin, deleteSong)

export default router