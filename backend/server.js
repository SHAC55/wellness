import express from "express";
import dotenv from 'dotenv';
import connectMongoDB from "./config/mongoDB.js";
import cors from 'cors';
import authRoute from "./routes/authRoutes.js";
import sessionRoute from "./routes/sessionRoute.js";

// Load env vars BEFORE anything else
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectMongoDB();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoute);
app.use('/api/session', sessionRoute)

// Test route
app.get('/', (req, res) => {
  res.send("✅ API is WORKING");
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
