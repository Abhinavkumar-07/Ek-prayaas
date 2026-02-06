# 🚀 Quick Start Guide - Ek-Prayas Website

## ⚡ Fast Setup (5 minutes)

### 1. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 2. Setup Environment Variables

**Backend** - Create `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ekprayas
JWT_SECRET=your_secret_key_here_change_this
NODE_ENV=development
```

**Frontend** - Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Start MongoDB

```bash
# Make sure MongoDB is running
sudo systemctl start mongod

# OR if using MongoDB Atlas, skip this step and use cloud URI in .env
```

### 4. Create Admin User

```bash
cd backend
npm run seed
```

**Default Admin Credentials:**
- Email: `admin@ekprayas.com`
- Password: `admin123`

⚠️ **Change this password immediately after first login!**

### 5. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Server: http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# Website: http://localhost:5173
```

### 6. Access the Website

Open your browser and go to: `http://localhost:5173`

---

## 📋 Project Structure

```
ek-prayas-website/
├── backend/                 # Express API
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API endpoints
│   ├── controllers/        # Business logic
│   ├── middleware/         # Auth & upload
│   └── server.js           # Entry point
│
├── frontend/               # React app
│   ├── src/
│   │   ├── pages/         # Route pages
│   │   ├── components/    # Reusable UI
│   │   └── services/      # API client
│   └── public/            # Static assets
│
└── README.md              # Full documentation
```

---

## 🎨 Features Included

✅ Responsive design with Tailwind CSS
✅ Smooth animations with Framer Motion
✅ Initiative management
✅ Event management
✅ Team member profiles
✅ Volunteer registration
✅ Contact form
✅ Admin authentication (JWT)
✅ File upload support
✅ MongoDB integration
✅ RESTful API

---

## 🔧 Common Commands

### Backend
```bash
npm start          # Production mode
npm run dev        # Development mode
npm run seed       # Create admin user
```

### Frontend
```bash
npm run dev        # Development server
npm run build      # Production build
npm run preview    # Preview production build
```

---

## 🐛 Troubleshooting

**Port already in use:**
```bash
lsof -i :5000
kill -9 <PID>
```

**MongoDB connection error:**
- Check if MongoDB is running: `sudo systemctl status mongod`
- Verify MONGODB_URI in backend/.env

**CORS errors:**
- Ensure frontend .env has correct backend URL
- Check CORS configuration in backend/server.js

---

## 📚 Next Steps

1. **Customize Colors**: Edit `frontend/tailwind.config.js`
2. **Add Logo**: Replace `frontend/public/logo.png`
3. **Update Content**: Modify text in components
4. **Add Images**: Upload to `backend/uploads/`
5. **Deploy**: See README.md for deployment guide

---

## 🤝 Need Help?

- Check the main README.md for detailed documentation
- Review the API documentation in backend/
- Look at the architecture diagrams

---

**Built with ❤️ for Ek-Prayas**
