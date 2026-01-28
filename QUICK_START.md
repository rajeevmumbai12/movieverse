# Quick Deployment Guide

## 🚀 Deploy to Vercel in 5 Minutes

### Step 1: Prepare MongoDB Atlas (2 minutes)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Create database user
4. Whitelist all IPs: `0.0.0.0/0`
5. Copy connection string

### Step 2: Push to Git (1 minute)
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### Step 3: Deploy to Vercel (2 minutes)
1. Go to https://vercel.com/new
2. Import your repository
3. Add environment variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_random_secret_key
   JWT_EXPIRE=7d
   NODE_ENV=production
   ENABLE_QUEUE=false
   ```
4. Click **Deploy**

### Done! 🎉

Your app will be live at: `https://your-project.vercel.app`

---

## Alternative: Deploy via CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

During deployment, you'll be prompted to add environment variables.

---

## Test Locally First

```bash
# Install dependencies
cd frontend && npm install && cd ..

# Run with Vercel dev server
vercel dev
```

Visit: http://localhost:3000

---

## Need Help?

- Full guide: See `VERCEL_DEPLOYMENT.md`
- Issues: Check `DEPLOYMENT_SUMMARY.md`
- Zscaler SSL issues: See troubleshooting section in `VERCEL_DEPLOYMENT.md`

---

## API Endpoints After Deployment

- **Auth**: `https://your-app.vercel.app/api/auth/login`
- **Movies**: `https://your-app.vercel.app/api/movies`
- **Frontend**: `https://your-app.vercel.app/`

---

**Status: All syntax and linting issues fixed ✅**
**Status: Vercel configuration complete ✅**
**Status: Ready to deploy! 🚀**
