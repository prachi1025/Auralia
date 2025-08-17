import express from "express"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const PORT = 5000 || process.env.PORT

app.listen(PORT, () => {
    console.log(`server live on ${PORT}`)
})