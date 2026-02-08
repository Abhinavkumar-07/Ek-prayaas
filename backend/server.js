require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Connect to Database
connectDB();

const app = express();

// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://ek-prayaas-frontend.vercel.app', // Your Vercel Frontend
  // Add your Vercel Project domain if it differs (e.g. https://ek-prayaas.vercel.app)
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      // Optional: Allow all Vercel deployments for preview branches
      if (origin.endsWith('.vercel.app')) {
        return callback(null, true);
      }
      return callback(new Error('The CORS policy for this site does not allow access from the specified Origin.'), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/volunteers', require('./routes/volunteers'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/events', require('./routes/events'));         // Added back
app.use('/api/initiatives', require('./routes/initiatives')); // Added back
app.use('/api/gallery', require('./routes/gallery'));       // Added back
app.use('/api/team', require('./routes/team'));             // Added back
app.use('/api/newsletter', require('./routes/newsletter')); // Added back

// Health Check Route (Visible if you go to /api/health)
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Backend is running' });
});

// Root Route (Might be shadowed by Frontend in Monorepo, but good to keep)
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;