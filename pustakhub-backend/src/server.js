import express from 'express';
import { ENV } from './config/env.js';
import { testConnection } from './config/db.js';
const app = express();
const PORT = ENV.PORT ||8001;

app.use(express.json());
testConnection();

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to PustakHub Backend API",
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on PORT ${PORT}`);
});
