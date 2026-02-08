require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// 1. Connect to Database
connectDB();

const app = express();

// 2. Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://ek-prayaas-frontend.vercel.app', // Your specific frontend
  // Add any other Vercel domains you might use
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      // Allow any Vercel preview deployment to work
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

// 3. Routes (The "Map") - RESTORED MISSING ROUTES
app.use('/api/auth', require('./routes/auth'));
app.use('/api/volunteers', require('./routes/volunteers'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/events', require('./routes/events'));         // <--- Was missing
app.use('/api/initiatives', require('./routes/initiatives')); // <--- Was missing
app.use('/api/gallery', require('./routes/gallery'));       // <--- Was missing
app.use('/api/team', require('./routes/team'));             // <--- Was missing
app.use('/api/newsletter', require('./routes/newsletter')); // <--- Was missing

// Root Route (Health Check)
app.get('/', (req, res) => {
  res.send('API is running... Backend is Healthy!');
});

// Health Check specific for /api
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Backend is fully operational' });
});

// 4. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// 5. EXPORT THE APP FOR VERCEL
module.exports = app;