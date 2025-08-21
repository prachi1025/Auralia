import express from "express"
import dotenv from "dotenv"
import { clerkMiddleware } from "@clerk/express"
import fileUpload from "express-fileupload"
import path from "path"

import { connectDB } from "./lib/db.js"

import userRoutes from "./routes/user.route.js"
import authRoutes from "./routes/auth.route.js"
import adminRoutes from "./routes/admin.route.js"
import songRoutes from "./routes/song.route.js"
import albumRoutes from "./routes/album.route.js"
import statRoutes from "./routes/stat.route.js"
import { error } from "console"
import e from "express"

dotenv.config()

const __dirname = path.resolve()
const app = express()
const PORT = 5000 || process.env.PORT

app.use(express.json()) // to parse req.body
app.use(clerkMiddleware()) // Middleware for Clerk authentication (this will add auth to req object)
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "temp"),
    createParentPath: true,
    limits: { fileSize: 50 * 1024 * 1024 } // Limit file size to 50MB
}))

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

app.use((error, req, res, next) => {
    res.status(500).json({ message: process.env.NODE_ENV === "development" ? error.message : "Internal Server Error" });
});

app.listen(PORT, () => {
    console.log(`server live on ${PORT}`)
    console.log("http://localhost:5000/")
    connectDB()
})

//todo: socket.io integration