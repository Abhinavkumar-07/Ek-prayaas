# Ek-Prayas MERN Stack Website - Complete Guide

## 🎯 Project Overview
A professional, production-ready MERN stack website for Ek-Prayas college club - a student-led NGO initiative.

### Technology Stack
- **Frontend**: React.js, Framer Motion, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Styling**: Custom CSS with modern design patterns

---

## 📁 Project Structure
```
ek-prayas-website/
├── frontend/               # React application
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.png     # Your Ek-Prayas logo
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   │   ├── Navbar.js
│   │   │   └── Footer.js
│   │   ├── pages/          # Page components
│   │   │   ├── Home.js
│   │   │   ├── About.js
│   │   │   ├── Initiatives.js
│   │   │   ├── Events.js
│   │   │   ├── Team.js
│   │   │   ├── Gallery.js
│   │   │   └── Contact.js
│   │   ├── services/       # API service layer
│   │   │   └── api.js
│   │   ├── styles/         # CSS files
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── backend/                # Node.js + Express API
│   ├── config/
│   ├── models/             # MongoDB schemas
│   │   ├── Initiative.js
│   │   ├── Event.js
│   │   ├── Team.js
│   │   └── index.js        # Gallery, Contact, Newsletter, Admin
│   ├── routes/             # API routes
│   ├── controllers/        # Business logic
│   ├── middleware/         # Auth & validation
│   │   └── auth.js
│   ├── server.js
│   └── package.json
│
└── database/
    └── seed.js             # Seed data script
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js v16+ ([Download](https://nodejs.org/))
- MongoDB ([Local](https://www.mongodb.com/try/download/community) or [Atlas](https://www.mongodb.com/cloud/atlas))
- Git

### Step 1: Database Setup

#### Option A: Local MongoDB
1. Install MongoDB on your system
2. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS/Linux
   sudo systemctl start mongod
   ```

#### Option B: MongoDB Atlas (Recommended for Cloud)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster (free tier available)
3. Click "Connect" → "Connect your application"
4. Copy the connection string

### Step 2: Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```bash
   # Copy the example file
   cp .env.example .env
   ```

4. **Edit `.env` with your values:**
   ```env
   PORT=5000
   
   # For local MongoDB:
   MONGODB_URI=mongodb://localhost:27017/ekprayas
   
   # For MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ekprayas
   
   JWT_SECRET=your_super_secret_jwt_key_change_this
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   
   # Email Configuration (Optional - for contact form)
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_TO=ekprayas@example.com
   ```

5. **Seed the database with initial data:**
   ```bash
   npm run seed
   ```
   
   This will create:
   - Sample initiatives (Kitabi Udaan, Old Age Home, Blood Donation)
   - Sample events
   - Team members
   - Admin user (username: `admin`, password: `admin123`)

6. **Start the backend server:**
   ```bash
   npm run dev
   ```
   
   Backend will run on http://localhost:5000

### Step 3: Frontend Setup

1. **Open a new terminal and navigate to frontend:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```bash
   cp .env.example .env
   ```

4. **Edit `.env`:**
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_SITE_NAME=Ek-Prayas
   ```

5. **Start the frontend:**
   ```bash
   npm start
   ```
   
   Frontend will run on http://localhost:3000

---

## 📋 Features

### Pages
✅ **Home** - Hero section with mission statement and statistics  
✅ **About Us** - Club story and mission  
✅ **Initiatives** - List of all social programs  
✅ **Initiative Detail** - Detailed view of each initiative  
✅ **Events** - Upcoming and past events  
✅ **Event Detail** - Event details and registration  
✅ **Team** - Core team members  
✅ **Gallery** - Photo gallery  
✅ **Contact** - Contact form and newsletter subscription  

### Key Features
- 🎨 Beautiful, modern UI design
- 📱 Fully responsive for all devices
- ⚡ Fast loading with optimized assets
- 🔒 Secure JWT authentication for admin
- 📧 Email notifications for contact form
- 🖼️ Image upload support
- 🔍 SEO optimized

---

## 🔧 API Endpoints

### Public Routes
```
GET    /api/initiatives          - Get all initiatives
GET    /api/initiatives/:slug    - Get single initiative
GET    /api/events               - Get all events
GET    /api/events/:slug         - Get single event
GET    /api/team                 - Get team members
GET    /api/gallery              - Get gallery images
POST   /api/contact              - Submit contact form
POST   /api/newsletter           - Subscribe to newsletter
```

### Protected Routes (Admin Only)
```
POST   /api/auth/login           - Admin login
POST   /api/auth/register        - Create admin user
POST   /api/initiatives          - Create initiative
PUT    /api/initiatives/:id      - Update initiative
DELETE /api/initiatives/:id      - Delete initiative
POST   /api/events               - Create event
PUT    /api/events/:id           - Update event
DELETE /api/events/:id           - Delete event
POST   /api/gallery              - Upload images
```

---

## 🎨 Customization

### Update Logo
Replace `/frontend/public/favicon.png` with your Ek-Prayas logo

### Change Colors
Edit `/frontend/src/styles/App.css` and `/frontend/src/styles/Home.css`

Primary colors used:
- Turquoise: `#00BFA5`
- Yellow: `#FFD600`
- Coral: `#FF5252`

### Add More Pages
1. Create new component in `/frontend/src/pages/`
2. Add route in `/frontend/src/App.js`
3. Add link in `/frontend/src/components/Navbar.js`

---

## 🚢 Deployment

### Frontend Deployment (Netlify/Vercel)

#### Netlify
1. Build the project:
   ```bash
   cd frontend
   npm run build
   ```
2. Go to https://www.netlify.com/
3. Drag & drop the `build` folder
4. Set environment variables in Netlify dashboard

#### Vercel
1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Deploy:
   ```bash
   cd frontend
   vercel
   ```

### Backend Deployment (Render/Railway)

#### Render
1. Push code to GitHub
2. Go to https://render.com/
3. Create new Web Service
4. Connect GitHub repository
5. Set environment variables
6. Deploy

#### Railway
1. Go to https://railway.app/
2. Click "New Project" → "Deploy from GitHub"
3. Select repository
4. Add environment variables
5. Deploy

### Database
If using MongoDB Atlas, no additional deployment needed - it's already cloud-based!

---

## 🔐 Security Best Practices

1. **Never commit `.env` files** - They're in `.gitignore`
2. **Change default admin password** immediately after first login
3. **Use strong JWT secret** in production
4. **Enable HTTPS** in production
5. **Set up CORS** properly for your domain
6. **Use environment variables** for all sensitive data

---

## 📝 Common Tasks

### Add New Initiative
```bash
# Login as admin (POST /api/auth/login)
# Then POST to /api/initiatives with:
{
  "title": "New Initiative",
  "shortDescription": "Brief description",
  "description": "Full description",
  "category": "education",
  "impact": {
    "beneficiaries": 100,
    "volunteers": 20
  }
}
```

### Update Team Member
```bash
# POST to /api/team with:
{
  "name": "Member Name",
  "role": "Role Title",
  "designation": "president",
  "department": "Computer Science",
  "year": "Final Year"
}
```

---

## 🐛 Troubleshooting

### MongoDB Connection Error
- Check if MongoDB is running: `mongod --version`
- Verify connection string in `.env`
- For Atlas: Check IP whitelist and credentials

### Frontend Can't Connect to Backend
- Ensure backend is running on port 5000
- Check `REACT_APP_API_URL` in frontend `.env`
- Clear browser cache and restart

### CORS Errors
- Update `FRONTEND_URL` in backend `.env`
- Check CORS configuration in `server.js`

---

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Manual](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)

---

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the code comments
3. Contact the Ek-Prayas tech team

---

## 📄 License

This project is created for Ek-Prayas college club.

---

**Built with ❤️ for Ek-Prayas**

*Making a difference, one step at a time*
