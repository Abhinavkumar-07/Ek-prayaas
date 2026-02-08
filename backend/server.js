require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

// 1. Connect to Database
connectDB();

const app = express();

// 2. Middleware (The "Security Guard")
// We allow BOTH localhost:5173 (Vite) and localhost:3000 (React) just in case.
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(express.json()); // Allows server to read JSON data

// 3. Routes (The "Map")
// Ensure these files exist in your 'routes' folder!
app.use('/api/auth', require('./routes/auth'));
app.use('/api/volunteers', require('./routes/volunteers'));
app.use('/api/contact', require('./routes/contact'));

// Root Route (Health Check)
app.get('/', (req, res) => {
  res.send('API is running... Backend is Healthy!');
});

// 4. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
