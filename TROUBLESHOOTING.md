# Troubleshooting Guide

## Common Issues and Solutions

### 1. MongoDB Connection Failed

**Error**: `MongoNetworkError: failed to connect to server`

**Solutions**:
- ✅ Check if MongoDB is running:
  ```bash
  # Windows
  mongod --version
  
  # macOS/Linux
  sudo systemctl status mongod
  ```
- ✅ For MongoDB Atlas:
  - Check your internet connection
  - Verify connection string in `.env`
  - Add your IP address to Atlas whitelist (use 0.0.0.0/0 for development)
  - Check username/password are correct

### 2. Backend Won't Start

**Error**: `Error: listen EADDRINUSE: address already in use :::5000`

**Solution**: Port 5000 is already in use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill -9
```

**Alternative**: Change port in `backend/.env`:
```env
PORT=5001
```
And update frontend `.env`:
```env
REACT_APP_API_URL=http://localhost:5001/api
```

### 3. Frontend Can't Connect to Backend

**Error**: `Network Error` or `CORS error`

**Solutions**:
- ✅ Make sure backend is running first
- ✅ Check `REACT_APP_API_URL` in `frontend/.env`
- ✅ Verify `FRONTEND_URL` in `backend/.env`
- ✅ Clear browser cache (Ctrl+Shift+Delete)
- ✅ Try in incognito/private browsing

### 4. npm install Fails

**Error**: Various installation errors

**Solutions**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install

# If still fails, try:
npm install --legacy-peer-deps
```

### 5. Module Not Found Errors

**Error**: `Cannot find module 'react'` or similar

**Solution**:
```bash
# Make sure you're in the correct directory
cd frontend  # or cd backend

# Reinstall dependencies
npm install

# Restart the dev server
npm start  # or npm run dev
```

### 6. Database Seed Fails

**Error**: `Error seeding database`

**Solutions**:
- ✅ Ensure MongoDB is running
- ✅ Check connection string in `.env`
- ✅ Try dropping the database first:
  ```javascript
  // In MongoDB shell or Compass
  use ekprayas
  db.dropDatabase()
  ```
- ✅ Run seed again:
  ```bash
  npm run seed
  ```

### 7. Images Not Showing

**Solutions**:
- ✅ Check image paths in database
- ✅ Verify `uploads` folder exists in backend
- ✅ Check file permissions
- ✅ Use placeholder images for testing:
  ```javascript
  image: '/api/placeholder/400/300'
  ```

### 8. JWT Authentication Issues

**Error**: `Invalid token` or `Not authorized`

**Solutions**:
- ✅ Clear localStorage:
  ```javascript
  // In browser console
  localStorage.clear()
  ```
- ✅ Check `JWT_SECRET` in backend `.env`
- ✅ Re-login with admin credentials
- ✅ Token might be expired - try logging in again

### 9. Email Not Sending

**Solutions for Gmail**:
1. Enable 2-Factor Authentication in Gmail
2. Generate App Password:
   - Go to Google Account → Security
   - 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Use app password in `.env`:
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=generated-app-password
   ```

### 10. React Build Errors

**Error**: Build fails during deployment

**Solutions**:
```bash
# Check for console.log statements (remove in production)
# Check for unused imports
# Fix any TypeScript/ESLint errors

# Build locally first
npm run build

# If build succeeds locally but fails on deployment:
# - Check Node version matches
# - Check environment variables are set on deployment platform
```

### 11. Styling Issues

**Problem**: CSS not applying or looking broken

**Solutions**:
- ✅ Clear browser cache
- ✅ Check CSS import paths
- ✅ Verify CSS files exist in `src/styles/`
- ✅ Check for typos in className
- ✅ Inspect element in browser DevTools

### 12. API Returns 404

**Error**: `Cannot GET /api/initiatives`

**Solutions**:
- ✅ Check route is registered in `server.js`
- ✅ Verify route file exists in `backend/routes/`
- ✅ Check for typos in route path
- ✅ Restart backend server

## Development Tips

### Hot Reload Not Working

**Frontend**:
```bash
# Kill all node processes
# Windows: taskkill /F /IM node.exe
# Mac/Linux: killall node

# Restart
npm start
```

**Backend**:
```bash
# Make sure nodemon is installed
npm install -g nodemon

# Use dev script
npm run dev
```

### Performance Issues

**Solutions**:
- Clear browser cache
- Check for memory leaks (too many event listeners)
- Optimize images before uploading
- Use pagination for large datasets
- Add loading states

### Database Too Slow

**Solutions**:
- Add indexes to frequently queried fields:
  ```javascript
  // In model
  schema.index({ slug: 1 });
  schema.index({ category: 1 });
  ```
- Use `.select()` to limit returned fields
- Implement caching for static data

## Getting Help

If you're still stuck:

1. **Check Console Errors**: 
   - Browser console (F12)
   - Backend terminal
   
2. **Read Error Messages Carefully**:
   - They usually tell you what's wrong
   
3. **Search the Error**:
   - Copy error message to Google
   - Check Stack Overflow
   
4. **Check Documentation**:
   - COMPLETE_GUIDE.md
   - ARCHITECTURE.md
   
5. **Contact Ek-Prayas Tech Team**:
   - Provide error message
   - Describe what you were trying to do
   - Share relevant code

## Useful Commands

```bash
# Check Node version
node --version

# Check npm version
npm --version

# Check MongoDB version
mongod --version

# See running processes
# Windows: tasklist
# Mac/Linux: ps aux | grep node

# Kill process by port
# Windows: netstat -ano | findstr :<PORT>
# Mac/Linux: lsof -ti:<PORT> | xargs kill

# View logs
# Check terminal where server is running

# Test API endpoint
curl http://localhost:5000/api/health

# MongoDB shell
mongosh  # or mongo (older versions)
```

## Prevention Tips

- Always commit working code to Git
- Test locally before deploying
- Keep dependencies updated (but carefully)
- Use `.gitignore` for node_modules and .env
- Document any custom changes
- Keep backups of database
- Use version control (Git)
- Test on different browsers
- Validate environment variables
- Monitor error logs in production

---

**Remember**: Most bugs are typos, missing imports, or configuration issues. Take a breath and debug systematically! 🐛🔍
