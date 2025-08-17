import express from "express"
import dotenv from "dotenv"

import { connectDB } from "./lib/db.js"

import userRoutes from "./routes/user.route.js"
import authRoutes from "./routes/auth.route.js"
import adminRoutes from "./routes/admin.route.js"
import songRoutes from "./routes/song.route.js"
import albumRoutes from "./routes/album.route.js"
import statRoutes from "./routes/stat.route.js"

dotenv.config()

const app = express()
const PORT = 5000 || process.env.PORT

//Backend User Routes
app.use("/api/users", userRoutes)
//Backend Auth Routes
app.use("/api/auth", authRoutes)
//Backend Admin Routes
app.use("/api/admin", adminRoutes)
//Backend Songs Routes
app.use("/api/songs", songRoutes)
//Backend Albums Routes
app.use("/api/albums", albumRoutes)
//Backend Stats Routes
app.use("/api/stats", statRoutes)

app.listen(PORT, () => {
    console.log(`server live on ${PORT}`)
    console.log("http://localhost:5000/")
    connectDB()
})