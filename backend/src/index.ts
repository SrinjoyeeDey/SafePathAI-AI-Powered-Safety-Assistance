import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';

import authRoutes from './routes/authRoutes'
import userRoutes from './routes/userRoutes'
import placesRoutes from './routes/placesRoutes'
import aiRoutes from './routes/aiRoutes'
import sosRoutes from './routes/sosRoutes'
import communityRoutes from './routes/communityRoutes'
import faqRoutes from "./routes/faqRoutes";
import qnaRoutes from "./routes/qnaRoutes";
import favoriteRoutes from "./routes/favoriteRoutes"; 


import { errorHandler, notFound } from './middleware/errorHandler'
import { seedFAQs } from './services/seedService'

dotenv.config()

const PORT = process.env.PORT || 4000
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000"

const app = express()

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [FRONTEND_URL, "http://localhost:5173"],
    credentials: true,
  })
)

// API Routes
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/places", placesRoutes)
app.use("/api/ai", aiRoutes)
app.use("/api/sos", sosRoutes)
app.use("/api/faqs", faqRoutes);
app.use("/api/qna", qnaRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/community", communityRoutes)


// Global error handling middleware - must be the last middleware
app.use(errorHandler)

// 404 handler - must be placed after all routes
app.use(notFound)

// Global error handling middleware - must be the last middleware
app.use(errorHandler)
app.get("/api/health", (req, res) => res.json({ ok: true, ts: Date.now() }));

async function start() {
  try {
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI not set in .env")
    await mongoose.connect(process.env.MONGO_URI)

    console.log("Connected to MongoDB")
    
    // Seed FAQs if enabled
    if (process.env.SEED_FAQS === 'true') {
      console.log("Seeding FAQs...")
      await seedFAQs()
    }
    
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`)
    })
  } catch (err) {
    console.log("Failed to start server: ", err)
    process.exit(1)
  }
}

start();
