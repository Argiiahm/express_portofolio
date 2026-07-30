import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import { errorHandler } from './middlewares/error.middleware.js';
import projectRoutes from './routes/projectRoutes.js';
import articleRoutes from './routes/articleRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// AuthRoutes
app.use('/api/v1', authRoutes);
// ProjectRoutes
app.use('/api/v1', projectRoutes);
// ArticleRoutes
app.use('/api/v1', articleRoutes);

app.use(errorHandler);

export default app;
