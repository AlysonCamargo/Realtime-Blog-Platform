const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const connectDB = require('./config/db');
const { errorHandler } = require('./middlewares/errorHandler');
const postRoutes = require('./routes/posts');

// Initialize App
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Security and Performance Middlewares
app.use(helmet()); // Set security HTTP headers
app.use(cors()); // Enable CORS
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // Request logging in dev environment
}

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use('/api/', limiter);

// Built-in Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/posts', postRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: '🚀 Real-Time Blog Platform API',
    version: '1.0.0'
  });
});

// 404 handler
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

// Global Error Handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`);
});
