import express from 'express';
import { ENV } from './config/env.js';
import { testConnection } from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import booksRoutes from './routes/books.routes.js';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';


const app = express();
const PORT = ENV.PORT ||8001;

app.use(express.json());
app.use(cors());
app.use(helmet()); // Helmet is a middleware that helps to secure the app by setting various HTTP headers

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/books", booksRoutes);

testConnection();

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to PustakHub Backend API",
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on PORT ${PORT}`);
});
