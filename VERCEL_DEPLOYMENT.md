# Deploying MovieVerse to Vercel

This guide explains how to deploy your MovieVerse application (frontend + backend) to Vercel.

## Prerequisites

- Vercel account (sign up at https://vercel.com)
- MongoDB Atlas account (for production database)
- Git repository (GitHub, GitLab, or Bitbucket)

## Project Structure

```
movieverse/
├── api/                 # Serverless API functions
│   ├── auth/           # Authentication endpoints
│   └── movies/         # Movie endpoints
├── frontend/           # React application
└── vercel.json         # Vercel configuration
```

## Deployment Steps

### 1. Prepare Environment Variables

You'll need to set these environment variables in Vercel:

#### Backend (API) Environment Variables:
- `MONGODB_URI` - Your MongoDB connection string (use MongoDB Atlas)
- `JWT_SECRET` - Your JWT secret key
- `JWT_EXPIRE` - JWT expiration time (e.g., "7d")
- `NODE_ENV` - Set to "production"
- `ENABLE_QUEUE` - Set to "false" (Redis not supported on Vercel free tier)

### 2. Deploy via Vercel Dashboard

1. Push your code to a Git repository
2. Go to https://vercel.com/new
3. Import your repository
4. Vercel will auto-detect the configuration from `vercel.json`
5. Add environment variables in the Vercel dashboard:
   - Go to Settings → Environment Variables
   - Add all the variables listed above
6. Click "Deploy"

### 3. Deploy via Vercel CLI (Alternative)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel (if SSL issues, use: set NODE_TLS_REJECT_UNAUTHORIZED=0 && vercel login)
vercel login

# Deploy to production
vercel --prod
```

During the first deployment, you'll be prompted to:
- Link to existing project or create new one
- Set up environment variables

### 4. Configure MongoDB Atlas

1. Create a free cluster at https://www.mongodb.com/cloud/atlas
2. Create a database user
3. Whitelist all IPs (0.0.0.0/0) for Vercel's dynamic IPs
4. Get your connection string and add it to Vercel environment variables

## API Endpoints

After deployment, your API will be available at:
- `https://your-project.vercel.app/api/auth/login`
- `https://your-project.vercel.app/api/auth/register`
- `https://your-project.vercel.app/api/auth/me`
- `https://your-project.vercel.app/api/movies`
- `https://your-project.vercel.app/api/movies/[id]`

## Frontend

The React frontend will be served from the root:
- `https://your-project.vercel.app/`

## Environment-Specific Configuration

### Development
```bash
# Run locally with Vercel dev server
vercel dev
```

### Production
All environment variables should be set in Vercel dashboard under Settings → Environment Variables.

## Troubleshooting

### SSL Certificate Issues (Zscaler)
If you encounter SSL certificate errors during `vercel login`:
```bash
# Windows Command Prompt
set NODE_TLS_REJECT_UNAUTHORIZED=0 && vercel login

# Windows PowerShell
$env:NODE_TLS_REJECT_UNAUTHORIZED=0; vercel login
```

### API Routes Not Working
- Ensure `vercel.json` is in the root directory
- Check that environment variables are set in Vercel dashboard
- Verify MongoDB connection string allows connections from all IPs

### Build Failures
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

## Local Testing with Vercel

To test your serverless functions locally:

```bash
# Install dependencies for both frontend and backend
cd frontend && npm install
cd ..

# Run Vercel dev server
vercel dev
```

This will start:
- Frontend at http://localhost:3000
- API functions at http://localhost:3000/api/*

## Important Notes

1. **Redis/Queue System**: Vercel's free tier doesn't support Redis. Set `ENABLE_QUEUE=false` in production.
2. **Database**: Use MongoDB Atlas (not local MongoDB) for production.
3. **File Uploads**: Vercel has a 5MB limit for serverless functions. Consider using cloud storage for large files.
4. **Cold Starts**: Serverless functions may have cold start delays on first request.

## Post-Deployment

After successful deployment:
1. Test all API endpoints
2. Verify frontend loads correctly
3. Check MongoDB connections in Atlas dashboard
4. Monitor function logs in Vercel dashboard

## Updating Your Deployment

To update your deployment:
```bash
# Via Git (recommended)
git add .
git commit -m "Update application"
git push origin main
# Vercel will automatically redeploy

# Via Vercel CLI
vercel --prod
```

## Custom Domain (Optional)

To add a custom domain:
1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain
3. Follow DNS configuration instructions

## Support

For issues:
- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com/
- Project Issues: Create an issue in your repository
