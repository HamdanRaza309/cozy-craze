import express from "express";
import cors from "cors";
import "dotenv/config";
import connectToDB from "./config/db.js";
import connectToCloudinary from "./config/cloudinary.js";

// App config
const app = express();
const port = process.env.PORT || 4000;
connectToDB();
connectToCloudinary();

// middlewares
app.use(express.json());
app.use(cors());

// api endpoints
app.get('/', (req, res) => {
    res.send('API Working...')
})

app.listen(port, () => {
    console.log(`Server started: http://localhost:${port}`);
})