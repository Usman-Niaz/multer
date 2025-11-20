import 'dotenv/config'
import express from 'express'
const app =express()
import uploadRoute from "../src/route/multer.route.js";
import authRoutes from "./route/user.route.js";
import { errorHandler } from "./middleware/errorHandler.middleware.js";
app.use(express.json());
app.use('/api/v1',uploadRoute)
app.use("/api/v1", authRoutes);
// app.use(errorHandler);
export {app}
