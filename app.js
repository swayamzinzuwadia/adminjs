import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import authRoutes from './routes/auth.js';
import { adminRouter } from './admin/index.js';
import session from 'express-session';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(session({
  secret: process.env.JWT_SECRET || 'swayam',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 // 24 hours
  }
}));

// Routes
app.use('/api', authRoutes);
app.use(adminRouter);



// Database sync and server start
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.sync();
    console.log('Database synchronized successfully');
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`AdminJS dashboard is available at http://localhost:${PORT}/admin`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
  }
};

startServer(); 