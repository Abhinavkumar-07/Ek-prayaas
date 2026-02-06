# 🚀 Deployment Guide - Ek-Prayas Website

This guide covers deploying your MERN stack application to popular hosting platforms.

## 📋 Pre-Deployment Checklist

- [ ] Test application locally
- [ ] Set up MongoDB Atlas account (for cloud database)
- [ ] Prepare environment variables for production
- [ ] Update CORS settings for production URLs
- [ ] Build and test production bundles

---

## 🗄️ MongoDB Atlas Setup (Database)

### 1. Create MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Create a new cluster (free tier M0)
4. Wait 3-5 minutes for cluster creation

### 2. Configure Database Access

1. **Database Access** → Add New Database User
   - Username: `ekprayas`
   - Password: (generate secure password)
   - User Privileges: `Read and write to any database`

2. **Network Access** → Add IP Address
   - Click `Allow Access from Anywhere` (0.0.0.0/0)
   - Or add specific IPs for security

### 3. Get Connection String

1. Click **Connect** on your cluster
2. Choose **Connect your application**
3. Copy the connection string
4. Replace `<password>` with your database password

```
mongodb+srv://ekprayas:<password>@cluster0.xxxxx.mongodb.net/ekprayas?retryWrites=true&w=majority
```

---

## 🔧 Backend Deployment Options

### Option 1: Render (Recommended - Free Tier Available)

#### Step 1: Prepare Backend
```bash
cd backend

# Add start script in package.json (should already exist)
"scripts": {
  "start": "node server.js"
}
```

#### Step 2: Deploy to Render
1. Go to https://render.com
2. Sign up / Log in with GitHub
3. Click **New +** → **Web Service**
4. Connect your GitHub repository
5. Configure:
   - **Name**: `ekprayas-api`
   - **Root Directory**: `backend`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

#### Step 3: Add Environment Variables
In Render dashboard, add:
```
PORT=10000
MONGODB_URI=<your-mongodb-atlas-connection-string>
JWT_SECRET=<generate-secure-random-string>
NODE_ENV=production
```

#### Step 4: Deploy
- Click **Create Web Service**
- Wait for deployment (5-10 minutes)
- Your backend URL: `https://ekprayas-api.onrender.com`

---

### Option 2: Railway.app

1. Go to https://railway.app
2. Sign up with GitHub
3. Click **New Project** → **Deploy from GitHub**
4. Select repository → Select `backend` directory
5. Add environment variables (same as above)
6. Deploy

---

### Option 3: Heroku

```bash
cd backend

# Install Heroku CLI
curl https://cli-assets.heroku.com/install.sh | sh

# Login
heroku login

# Create app
heroku create ekprayas-api

# Set environment variables
heroku config:set MONGODB_URI=<your-connection-string>
heroku config:set JWT_SECRET=<your-secret>
heroku config:set NODE_ENV=production

# Deploy
git init
git add .
git commit -m "Deploy backend"
git push heroku main
```

---

## 🎨 Frontend Deployment Options

### Option 1: Vercel (Recommended)

#### Step 1: Update Frontend Environment
Create `frontend/.env.production`:
```env
VITE_API_URL=https://your-backend-url.com/api
```

Replace with your actual backend URL from Render/Railway/Heroku.

#### Step 2: Deploy to Vercel
1. Go to https://vercel.com
2. Sign up / Log in with GitHub
3. Click **Add New** → **Project**
4. Import your repository
5. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

6. Add Environment Variable:
   - `VITE_API_URL`: Your backend URL

7. Click **Deploy**

Your site will be live at: `https://ekprayas.vercel.app`

---

### Option 2: Netlify

```bash
cd frontend

# Install Netlify CLI
npm install -g netlify-cli

# Build project
npm run build

# Deploy
netlify deploy --prod

# Follow prompts and select 'dist' as publish directory
```

Or use Netlify's GitHub integration:
1. Go to https://netlify.com
2. New site from Git
3. Connect repository
4. Configure build settings
5. Add environment variables
6. Deploy

---

### Option 3: GitHub Pages

```bash
cd frontend

# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}

# Add homepage to package.json
"homepage": "https://yourusername.github.io/ek-prayas"

# Deploy
npm run deploy
```

---

## 🔒 Production Security Checklist

### Backend
- [ ] Use strong JWT_SECRET (32+ random characters)
- [ ] Enable MongoDB authentication
- [ ] Whitelist only necessary IPs in MongoDB
- [ ] Set NODE_ENV=production
- [ ] Enable HTTPS only
- [ ] Update CORS to allow only your frontend domain
- [ ] Hide sensitive error messages
- [ ] Rate limit API endpoints
- [ ] Validate and sanitize all inputs

### Frontend
- [ ] Remove console.logs
- [ ] Minify and optimize assets
- [ ] Enable gzip compression
- [ ] Use environment variables for API URLs
- [ ] Implement proper error boundaries
- [ ] Add meta tags for SEO
- [ ] Test on multiple devices

---

## 🔄 Update CORS for Production

In `backend/server.js`:

```javascript
const cors = require('cors');

const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.com']
    : ['http://localhost:5173'],
  credentials: true,
};

app.use(cors(corsOptions));
```

---

## 🧪 Testing Production Build

### Backend
```bash
cd backend
NODE_ENV=production node server.js
```

### Frontend
```bash
cd frontend
npm run build
npm run preview
# Visit http://localhost:4173
```

---

## 📊 Post-Deployment Steps

1. **Test All Features**
   - User registration/login
   - Initiative CRUD operations
   - Event management
   - Contact form
   - File uploads

2. **Monitor Performance**
   - Set up error logging (Sentry, LogRocket)
   - Monitor API response times
   - Check database query performance

3. **Set Up Analytics**
   - Google Analytics
   - Monitor user behavior
   - Track conversion rates

4. **Regular Backups**
   - MongoDB Atlas automatic backups
   - Export important data regularly
   - Document restore procedures

---

## 🐛 Common Deployment Issues

### Issue: API requests failing
**Solution**: Check CORS configuration and ensure frontend has correct API URL

### Issue: Environment variables not working
**Solution**: Restart service after adding variables, prefix with VITE_ for frontend

### Issue: Database connection timeout
**Solution**: Check MongoDB Atlas network access whitelist

### Issue: File uploads not working
**Solution**: Configure cloud storage (Cloudinary, AWS S3) for production

### Issue: Build fails
**Solution**: Check Node version compatibility, clear cache, reinstall dependencies

---

## 📞 Support Resources

- **Render**: https://render.com/docs
- **Vercel**: https://vercel.com/docs
- **MongoDB Atlas**: https://docs.atlas.mongodb.com
- **Railway**: https://docs.railway.app
- **Netlify**: https://docs.netlify.com

---

## 🔄 Continuous Deployment

Both Vercel and Render support automatic deployments:

1. **Connect GitHub repository**
2. **Enable auto-deploy** on push to main branch
3. **Every git push triggers new deployment**

```bash
git add .
git commit -m "Update feature"
git push origin main
# Automatic deployment triggered!
```

---

**Need Help?** Contact your hosting provider's support or check community forums!
