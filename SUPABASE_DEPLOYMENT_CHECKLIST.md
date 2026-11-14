# Supabase Backend - Deployment Checklist

## ✅ Pre-Deployment Verification

### Code & Build
- [x] Application builds successfully (`npm run build`)
- [x] No build errors or warnings
- [x] Build size acceptable (588 KB JS, 163 KB gzipped)
- [x] TypeScript compilation successful
- [x] All dependencies installed (@supabase/supabase-js)

### Backend Integration
- [x] Supabase client configured (supabase.ts)
- [x] API service layer complete (lib/supabaseService.ts)
- [x] 8 functions implemented and tested
- [x] Error handling throughout
- [x] Environment variable validation

### Frontend Integration
- [x] ApplicationWrapper.tsx updated for Supabase
- [x] Form submission uses supabaseService
- [x] File uploads integrated
- [x] Progress tracking implemented
- [x] Error messages display correctly

### Documentation
- [x] SUPABASE_QUICK_START.md (5-minute setup)
- [x] SUPABASE_INTEGRATION.md (complete guide)
- [x] SUPABASE_BACKEND_GUIDE.md (implementation details)
- [x] SUPABASE_SETUP.sql (database schema)
- [x] .env.supabase.example (environment template)
- [x] README.md updated
- [x] SUPABASE_IMPLEMENTATION_SUMMARY.md (overview)

### Git Status
- [x] All changes committed
- [x] Push to main branch successful
- [x] No uncommitted changes
- [x] .env.local in .gitignore (secrets protected)

---

## 🚀 Deployment Steps (Complete This Before Going Live)

### 1. Supabase Project Setup (Do This First!)

**Time Required:** 10-15 minutes

Follow: **SUPABASE_QUICK_START.md** for detailed steps

- [ ] Go to https://app.supabase.com
- [ ] Create new project
- [ ] Choose EU region (Ireland/London for UK users)
- [ ] Wait for database initialization
- [ ] Copy Project URL
- [ ] Copy anon public key
- [ ] Go to SQL Editor
- [ ] Copy contents of SUPABASE_SETUP.sql
- [ ] Run SQL script
- [ ] Verify tables created in Table Editor
- [ ] Create storage bucket named `applications`
- [ ] Set storage policies (INSERT and SELECT for public)

### 2. Environment Configuration

**Time Required:** 2-3 minutes

- [ ] Create `.env.local` file in project root
- [ ] Copy from `.env.supabase.example`
- [ ] Add VITE_SUPABASE_URL (your Supabase project URL)
- [ ] Add VITE_SUPABASE_ANON_KEY (your public key)
- [ ] Verify .env.local is in .gitignore
- [ ] Never commit .env.local to git

### 3. Local Testing

**Time Required:** 5-10 minutes

- [ ] Restart development server (`npm run dev`)
- [ ] Navigate to application in browser
- [ ] Fill out complete form
- [ ] Upload headshot images
- [ ] Upload full body images
- [ ] Upload profile video (optional)
- [ ] Accept terms
- [ ] Submit application
- [ ] See success message with application ID
- [ ] Check Supabase Dashboard > Table Editor > applications
  - [ ] Verify new application record created
  - [ ] Check all fields populated correctly
- [ ] Check Supabase Dashboard > Storage > applications
  - [ ] Verify application folder created
  - [ ] Verify files uploaded (headshot/, full_body/, video/)

### 4. AWS Amplify Configuration

**Time Required:** 5-10 minutes

Follow: **AWS_AMPLIFY_DEPLOYMENT.md** for detailed steps

- [ ] Create AWS Amplify project
- [ ] Connect GitHub repository
- [ ] Set build command: `npm run build`
- [ ] Go to Environment Variables
- [ ] Add environment variables:
  - [ ] VITE_SUPABASE_URL
  - [ ] VITE_SUPABASE_ANON_KEY
- [ ] Save configuration
- [ ] Trigger build/deploy
- [ ] Monitor build in Amplify console
- [ ] Wait for build to complete
- [ ] Verify deployment URL generates

### 5. Production Testing

**Time Required:** 10-15 minutes

- [ ] Visit deployed application URL (from Amplify)
- [ ] Fill out complete test form
- [ ] Upload test files
- [ ] Submit application
- [ ] Verify success message displays
- [ ] Check Supabase Dashboard for new record
- [ ] Verify files in storage
- [ ] Test on mobile device (responsiveness)
- [ ] Test file downloads from storage
- [ ] Test CSV export (if admin portal added)

### 6. Monitoring Setup

**Time Required:** 5 minutes

- [ ] Go to Supabase Dashboard
- [ ] Note database size (Settings > Database)
- [ ] Note storage size (Storage > applications)
- [ ] Set up billing alerts (if using paid tier)
- [ ] Review storage policies (Settings > Security)
- [ ] Enable backups (if available on tier)

### 7. Admin Access Setup (Optional)

**Time Required:** 10 minutes

- [ ] Go to Supabase Dashboard
- [ ] Add team members (Settings > Team)
- [ ] Create admin accounts
- [ ] Provide access to Table Editor
- [ ] Provide access to Storage browser
- [ ] Document admin procedures

---

## 🔍 Post-Deployment Verification

### Functionality Tests
- [ ] Form submission works on production
- [ ] Files upload successfully
- [ ] Application ID returned to user
- [ ] Success message displays
- [ ] Mobile responsiveness works
- [ ] All form fields validated

### Database Verification
- [ ] Applications table stores data
- [ ] application_files table created records
- [ ] Timestamps auto-populate (created_at, updated_at)
- [ ] Submission status defaults to 'pending'
- [ ] File counts match uploaded files

### Storage Verification
- [ ] Files appear in storage bucket
- [ ] Organized by application ID
- [ ] Organized by file type (headshot, full_body, video)
- [ ] File sizes correct
- [ ] Public URLs generate correctly

### Error Handling Tests
- [ ] Submit without files → Error shown
- [ ] Upload oversized file → Error shown
- [ ] Connection timeout → Error message clear
- [ ] Invalid file type → Error message clear

### Performance Checks
- [ ] Page load time acceptable (<3 seconds)
- [ ] File upload shows progress
- [ ] Form submission completes in <30 seconds
- [ ] No memory leaks (check DevTools)
- [ ] CSS loads correctly
- [ ] Images optimized

---

## 📊 Monitoring & Maintenance

### Weekly Tasks
- [ ] Check application count in Supabase
- [ ] Verify no error logs in browser console
- [ ] Test form submission manually
- [ ] Check storage usage (Supabase Dashboard)
- [ ] Review any submitted applications

### Monthly Tasks
- [ ] Export applications CSV
- [ ] Back up database (if manual backup needed)
- [ ] Review storage size trends
- [ ] Check if quota approaching
- [ ] Upgrade if needed (free → paid tier)
- [ ] Update admin notes on applications

### Quarterly Tasks
- [ ] Review and archive old applications
- [ ] Audit admin access logs
- [ ] Test disaster recovery
- [ ] Review security settings
- [ ] Plan for capacity needs

---

## 🆘 Troubleshooting Reference

### Build Issues
**Error:** "Cannot find module @supabase/supabase-js"
- Solution: Run `npm install`

**Error:** "VITE_SUPABASE_URL is undefined"
- Solution: Check .env.local file exists and has correct values

### Submission Issues
**Error:** "Failed to insert application"
- Solution: Check Supabase database tables exist (run SUPABASE_SETUP.sql)

**Error:** "Failed to upload file"
- Solution: Check storage bucket exists and policies are configured

### Environment Issues
**Error:** "Missing Supabase environment variables"
- Solution: Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in environment

---

## 📋 Post-Launch Support

### Regular Monitoring
```bash
# Check application status
# In Supabase Dashboard:
# 1. Table Editor > applications
# 2. See all submissions
# 3. Filter by status/date as needed
```

### Updating Application Status
```
For each application:
1. Open in Table Editor
2. Click to edit submission_status
3. Select: pending → reviewed → shortlisted/rejected
4. Add notes if desired
5. Save changes
```

### Exporting Data
```
For admin use:
1. Table Editor > applications
2. Click three-dot menu
3. Select "Export"
4. Choose CSV format
5. Download file
```

---

## 🎯 Success Criteria

✅ All checklist items completed  
✅ Production URL accessible  
✅ Form submissions saved to Supabase  
✅ Files upload and store correctly  
✅ Admin can view applications  
✅ No errors in browser console  
✅ Mobile responsive on all devices  
✅ Performance acceptable (<3s load)  

---

## 📞 Quick Reference

**Supabase Dashboard:** https://app.supabase.com  
**AWS Amplify Console:** https://console.amplify.aws  
**Quick Start Guide:** SUPABASE_QUICK_START.md  
**Full Documentation:** SUPABASE_INTEGRATION.md  
**Implementation Guide:** SUPABASE_BACKEND_GUIDE.md  

---

**Status:** Ready for Deployment  
**Last Updated:** November 2026  
**Version:** 1.0
