# Ek-Prayas Website - Quick Start 🚀

## What You Got
A complete, production-ready MERN stack website for your Ek-Prayas NGO club with:
- Beautiful, modern design inspired by your mockup
- Full backend API with MongoDB database
- Admin authentication system
- Contact forms and newsletter subscription
- Responsive design for all devices

## Quick Start (5 minutes)

### 1. Install Node.js
Download from: https://nodejs.org/ (Choose LTS version)

### 2. Set Up Backend
```bash
# Open terminal in the 'backend' folder
cd backend

# Install packages
npm install

# Copy environment file
cp .env.example .env

# Edit .env file and set your MongoDB connection
# For beginners, use MongoDB Atlas (free cloud database):
# 1. Go to mongodb.com/cloud/atlas
# 2. Create free account
# 3. Create cluster
# 4. Get connection string
# 5. Paste in .env file

# Seed database with sample data
npm run seed

# Start backend
npm run dev
```

Backend running on http://localhost:5000 ✅

### 3. Set Up Frontend
```bash
# Open NEW terminal in the 'frontend' folder
cd frontend

# Install packages
npm install

# Copy environment file
cp .env.example .env

# Start frontend
npm start
```

Frontend running on http://localhost:3000 ✅

## Default Admin Credentials
- Username: `admin`
- Password: `admin123`

## What's Included

### Pages
- Home (with your design)
- About Us
- Initiatives (Kitabi Udaan, Old Age Home, Blood Donation)
- Events
- Team
- Gallery
- Contact

### Features
- Contact form with email notifications
- Newsletter subscription
- Admin panel (protected)
- Image gallery
- Event management
- Team member profiles

## Next Steps

1. **Update Your Logo**: Replace `frontend/public/favicon.png` with your logo
2. **Customize Content**: Edit the seed data in `backend/database/seed.js`
3. **Change Colors**: Update CSS files in `frontend/src/styles/`
4. **Add Your Photos**: Use the admin panel to upload images
5. **Update Contact Info**: Edit footer in `frontend/src/components/Footer.js`

## Need Help?

Read the `COMPLETE_GUIDE.md` file for:
- Detailed setup instructions
- How to deploy online
- API documentation
- Troubleshooting
- Security best practices

## File Structure
```
ek-prayas-website/
├── frontend/           # React app (your website)
├── backend/            # Express API server
├── database/           # Database setup
├── COMPLETE_GUIDE.md   # Detailed documentation
└── QUICK_START.md      # This file
```

---

**That's it! You're ready to go! 🎉**

Your website should now be running on http://localhost:3000

---

Built for Ek-Prayas with ❤️
