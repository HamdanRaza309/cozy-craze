import express from "express";
import cors from "cors";
import "dotenv/config";
import connectToDB from "./config/db.js";
import connectToCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

// App config
const app = express();
const port = process.env.PORT || 4000;
connectToDB();
connectToCloudinary();

// middlewares
app.use(express.json());
app.use(cors());

// api endpoints
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.listen(port, () => {
    console.log(`Server started: http://localhost:${port}`);
})