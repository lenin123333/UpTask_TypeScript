import  express  from "express";
import dotenv from 'dotenv'
import { connectDB } from "./config/db";
import projectRoutes from './routes/projectRoutes'
import cors from 'cors'
import { corsConfig } from "./config/cors";
dotenv.config()
connectDB()
const app = express()
app.use(cors(corsConfig))
app.use(express.json())
//routes
app.use('/api/projects',projectRoutes);

export default app;