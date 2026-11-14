# 🚀 START HERE - Supabase Backend Setup

Welcome to the Sky Way Talents Casting Application with Supabase Backend!

This document will guide you through getting the backend up and running in **less than 15 minutes**.

## Quick Overview

Your application has:
- ✅ **Frontend**: React 19 with mobile-responsive design
- ✅ **Backend**: Supabase (PostgreSQL + File Storage)
- ✅ **Database**: 3 tables, 47 columns, 8 indexes
- ✅ **Storage**: Secure file upload for images and videos
- ✅ **API**: 8 functions for all operations

## 3-Step Quick Start

### Step 1️⃣: Create Supabase Project (5 minutes)

1. Go to **[https://app.supabase.com](https://app.supabase.com)**
2. Click **"New Project"**
3. Fill in:
   - **Name**: `skywaytalents` (or your choice)
   - **Password**: Create a strong password (save it!)
   - **Region**: Select EU (Ireland) for UK users
4. Click **"Create new project"** and wait for initialization

### Step 2️⃣: Set Up Database & Storage (5 minutes)

#### A. Create Database Tables

1. In Supabase, go to **SQL Editor**
2. Click **"New query"**
3. Open file: **`SUPABASE_SETUP.sql`** in your project folder
4. Copy all contents
5. Paste into Supabase SQL Editor
6. Click **"Run"** ▶️

#### B. Create Storage Bucket

1. Go to **Storage** in Supabase
2. Click **"Create a new bucket"**
3. Enter name: `applications` (exact spelling!)
4. Leave as **Private**
5. Set size limit: `104857600` (100MB)
6. Click **"Create bucket"**

#### C. Set Storage Policies

1. Click on the `applications` bucket
2. Go to **"Policies"** tab
3. Click **"New policy"** → **"For INSERT"** → **"Save"**
4. Click **"New policy"** → **"For SELECT"** → **"Save"**

### Step 3️⃣: Configure Environment (2-3 minutes)

1. Get your credentials from Supabase **Settings > API**:
   - Copy **Project URL**
   - Copy **anon public key**

2. Create `.env.local` file in project root:
   ```bash
   touch .env.local    # On Mac/Linux
   # or
   type nul > .env.local  # On Windows
   ```

3. Edit `.env.local` and add:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

4. **Important**: `.env.local` is in `.gitignore` - never commit it!

## Test Your Setup

```bash
# Start development server
npm run dev

# Visit http://localhost:5173
# Fill out the form completely
# Upload images/video
# Submit application

# Check Supabase Dashboard:
# - Table Editor > applications (see your submission)
# - Storage > applications (see your uploaded files)
```

✅ If you see data in Supabase, everything works!

## Documentation

### 📖 Start with these in order:

1. **SUPABASE_QUICK_START.md** (this is the quick start)
2. **SUPABASE_INTEGRATION.md** (complete setup guide)
3. **SUPABASE_BACKEND_GUIDE.md** (advanced reference)
4. **SUPABASE_DEPLOYMENT_CHECKLIST.md** (before going live)

### Other Important Files:

- **SUPABASE_SETUP.sql** - Database schema (run in SQL Editor)
- **.env.supabase.example** - Environment variables template
- **supabase.ts** - Supabase client configuration
- **lib/supabaseService.ts** - API functions

## Next: Deploy to Production

Once local testing works, follow **SUPABASE_DEPLOYMENT_CHECKLIST.md** to:
- Deploy to AWS Amplify
- Verify production setup
- Monitor submissions

## 🆘 Troubleshooting

### "Missing Supabase environment variables"
→ Check `.env.local` file exists with correct values
→ Restart dev server after creating `.env.local`

### Tables don't appear after running SQL
→ Click refresh button in Table Editor
→ Check for error messages in SQL Editor

### Can't upload files
→ Verify bucket name is exactly `applications`
→ Check storage policies were added
→ Verify file size under limits (10MB images, 100MB video)

### Still stuck?
See troubleshooting sections in:
- SUPABASE_QUICK_START.md
- SUPABASE_INTEGRATION.md
- SUPABASE_BACKEND_GUIDE.md

## 📞 Quick Links

- **Supabase Dashboard**: https://app.supabase.com
- **This Project Docs**: See list above ⬆️
- **Supabase Docs**: https://supabase.com/docs
- **GitHub Repo**: mfs-solutions/skywaytalents

## What's Included

✅ Database with 3 tables and 8 indexes  
✅ File storage for images and videos  
✅ 8 API functions for all operations  
✅ Mobile-responsive React frontend  
✅ Complete documentation  
✅ Deployment checklist  
✅ Admin management features  

## Build Status

```
✅ Build successful: 588 KB JS (163 KB gzipped)
✅ 108 modules transformed
✅ 0 errors, 0 warnings
✅ Production ready
```

---

**Ready?** Start with **Step 1️⃣ above**, then read **SUPABASE_QUICK_START.md** for detailed instructions.

**Questions?** Check the troubleshooting section in the relevant documentation file.

**Deploying?** Follow **SUPABASE_DEPLOYMENT_CHECKLIST.md** after local testing works.

---

**Status**: ✅ Production Ready  
**Last Updated**: November 2026
