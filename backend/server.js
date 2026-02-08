require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

// 1. Connect to Database
connectDB();

const app = express();

// 2. Middleware (The "Security Guard")
// Add your Vercel Frontend URL to the allowed origins list later
const allowedOrigins = [
  'http://localhost:5173', 
  'http://localhost:3000',
  'https://ek-prayaas-frontend.vercel.app' // <--- Add your future Frontend URL here
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(express.json()); 

// 3. Routes (The "Map")
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

// 5. EXPORT THE APP FOR VERCEL
module.exports = app; // <--- CRITICAL: This is required for Vercel!