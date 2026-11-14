# Supabase Backend Setup - Quick Start Guide

## 🚀 5-Minute Setup

Follow these steps to set up Supabase for your Sky Way Talents casting application.

### Step 1: Create Supabase Account & Project

1. Visit **[https://app.supabase.com](https://app.supabase.com)**
2. Sign up or log in with GitHub
3. Click **"New Project"**
4. Fill in details:
   - **Organization**: Create new or select existing
   - **Project name**: `skywaytalents` (or your choice)
   - **Database Password**: Create strong password (save it!)
   - **Region**: Select EU (Ireland/London for UK users)
5. Click **"Create new project"** (wait 2-5 minutes for setup)

### Step 2: Get Your API Keys

Once project is ready:

1. Go to **Settings > API** (left sidebar)
2. Copy these values:
   - **Project URL** (under "Project URL") 
   - **anon public key** (under "Project API keys - anon public")

### Step 3: Create Environment File

1. In project root, create `.env.local`:
   ```bash
   # Windows (Command Prompt)
   type nul > .env.local
   
   # Mac/Linux
   touch .env.local
   ```

2. Open `.env.local` and paste:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
   
   Replace with your actual values from Step 2

3. **IMPORTANT**: `.env.local` is already in `.gitignore` - never commit it!

### Step 4: Set Up Database Schema

1. In Supabase Dashboard, go to **SQL Editor** (left sidebar)
2. Click **"New query"**
3. Open file: `SUPABASE_SETUP.sql` in your project
4. Copy ALL contents
5. Paste into Supabase SQL Editor
6. Click **"Run"** button
7. You should see ✅ success messages

### Step 5: Verify Database Tables

1. Go to **Table Editor** (left sidebar)
2. You should see these tables:
   - ✅ `applications`
   - ✅ `application_files`
   - ✅ `audit_log`

If tables don't appear, click the refresh button (circular arrow).

### Step 6: Create Storage Bucket

1. Go to **Storage** (left sidebar)
2. Click **"Create a new bucket"**
3. Enter bucket name: `applications` (exact spelling!)
4. **Keep as Private** (important!)
5. Set max file size: `104857600` (100MB for videos)
6. Click **"Create bucket"**

### Step 7: Set Up Storage Policies

1. Click on **`applications`** bucket (should be in the list)
2. Go to **"Policies"** tab
3. Click **"New policy"** button
4. Select "For INSERT" from dropdown
   - Let it auto-fill
   - Click **"Review"** 
   - Click **"Save policy"**
5. Click **"New policy"** button again
6. Select "For SELECT" from dropdown
   - Let it auto-fill
   - Click **"Review"**
   - Click **"Save policy"**

Done! ✅

### Step 8: Test Your Setup

1. Restart your dev server:
   ```bash
   npm run dev
   ```

2. Fill out and submit the casting form

3. Check Supabase Dashboard:
   - Go to **Table Editor > applications**
   - You should see your submission! ✅
   - Go to **Storage > applications**
   - You should see your application ID folder with uploaded files! ✅

---

## ✅ Verification Checklist

- [ ] Supabase project created
- [ ] API keys copied to `.env.local`
- [ ] Database schema executed (SQL)
- [ ] `applications` table visible in Table Editor
- [ ] `application_files` table visible
- [ ] `audit_log` table visible
- [ ] Storage bucket `applications` created
- [ ] Storage policies set for INSERT and SELECT
- [ ] Dev server restarted
- [ ] Test form submission successful
- [ ] Application visible in Table Editor
- [ ] Files visible in Storage bucket

---

## 🆘 Troubleshooting

### "Missing Supabase environment variables"
- Check `.env.local` exists in project root
- Verify values are correct (no extra spaces)
- Restart dev server: `npm run dev`

### Tables don't appear after running SQL
- Click the refresh button (circular arrow) in Table Editor
- Try running the SQL again
- Check for error messages in SQL Editor (red text)

### Can't upload files
- Verify bucket name is exactly `applications`
- Check storage policies were added (Policies tab)
- Try uploading test file directly from Supabase UI

### Application data saves but files don't upload
- Check browser network tab for upload errors
- Verify file size under 10MB (images) or 100MB (video)
- Check storage quota: Settings > Billing

---

## 📚 Next Steps

Once setup is complete:

1. **Test thoroughly** with multiple submissions
2. **Review documentation**: See `SUPABASE_INTEGRATION.md` for full guide
3. **Deploy frontend** to AWS Amplify (see `AWS_AMPLIFY_DEPLOYMENT.md`)
4. **Set up admin panel** (optional) to review applications
5. **Configure email notifications** (optional) when new applications arrive

---

## 🔒 Security Notes

✅ `.env.local` is in `.gitignore` - never committed
✅ Storage bucket is private with explicit policies
✅ Database uses Row Level Security (RLS)
✅ Anonymous key limited to INSERT/SELECT only

---

**Version**: 1.0  
**Last Updated**: November 2026
