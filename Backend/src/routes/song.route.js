import { Router } from "express";
import { getAllSongs } from "../controllers/song.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router()

router.get("/", protectRoute, requireAdmin, getAllSongs)

export default router