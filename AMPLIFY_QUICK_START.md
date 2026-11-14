# 🚀 AWS Amplify Deployment - Quick Start Guide

**Sky Way Talents Casting Application**

---

## ✅ Pre-Deployment Checklist

- [x] Application built successfully ✅
- [x] Amplify CLI installed ✅
- [x] Build configuration ready (amplify.yml) ✅
- [x] NPM configuration optimized (.npmrc) ✅
- [x] Deployment script ready (deploy.sh) ✅

---

## 🎯 Quick Deployment (3 Steps)

### **Step 1: Configure AWS Credentials**

```bash
# If you haven't configured AWS CLI yet
aws configure

# Enter:
# AWS Access Key ID: [your-key-id]
# AWS Secret Access Key: [your-secret-key]
# Default region: us-east-1
# Default output format: json
```

### **Step 2: Initialize Amplify**

```bash
cd /workspaces/skywaytalents

# Initialize Amplify (one-time setup)
amplify init

# When prompted:
# ? Initialize the project with the above configuration? › Yes
# ? Do you want to use an AWS profile? › Yes (or No, if credentials already configured)
# ? Select the authentication method you want to use: › AWS access keys
```

### **Step 3: Deploy**

```bash
# Option A: Automatic deployment (recommended)
bash deploy.sh

# Option B: Manual deployment
amplify publish --yes
```

---

## 📍 After Deployment

### ✨ Your live URL will be:
```
https://[branch-name].[random-id].amplifyapp.com
```

### 🎯 View Deployment Status
```bash
# Check Amplify status
amplify status

# View logs in real-time
amplify logs -c hosting --follow

# Open Amplify Console
amplify console
```

---

## 🔧 Configuration Files

| File | Purpose |
|------|---------|
| `amplify.yml` | Build configuration for Amplify |
| `.npmrc` | NPM optimization for CI/CD |
| `.env.example` | Template for environment variables |
| `deploy.sh` | Automated deployment script |

---

## 📊 Deployment Architecture

```
GitHub Repository (mfs-solutions/skywaytalents)
        ↓
Amplify Console (Auto-triggered on push)
        ↓
Build Phase (npm ci → npm run build)
        ↓
Deploy Phase (S3 upload → CloudFront distribution)
        ↓
Live URL (https://branch.amplifyapp.com)
        ↓
Your Users 🎉
```

---

## 🔐 Environment Variables

Add sensitive data in Amplify Console:

1. Go to **App Settings → Environment variables**
2. Add your Firebase credentials:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_PROJECT_ID`
   - etc.

⚠️ **Never commit `.env` files with secrets!**

---

## 📱 Access Your Application

### Production URL
```
https://[your-branch].amplifyapp.com
```

### Amplify Console
```
https://console.aws.amazon.com/amplify
```

### View Logs
```bash
amplify logs -c hosting --follow
```

---

## ✅ Deployment Verification

After deployment, verify:

- [ ] ✅ Site loads without errors
- [ ] ✅ All assets (CSS, JS) loaded
- [ ] ✅ Form submission works
- [ ] ✅ Responsive design on mobile
- [ ] ✅ HTTPS certificate active
- [ ] ✅ No console errors

---

## 🔄 Continuous Deployment

Once deployed:
- **Every git push to `main`** → Automatic build & deploy
- **Deployment status** → Real-time in Amplify Console
- **Rollback** → Available for previous deployments

---

## 🆘 Troubleshooting

### Build Fails
```bash
# Check build logs in Amplify Console
# Usually caused by:
# 1. Missing environment variables
# 2. Wrong Node.js version
# 3. Missing dependencies

# Solution: Check build logs in Console → App → Deployments
```

### Deployment Takes Too Long
- First deployment: 5-10 minutes
- Subsequent: 2-5 minutes
- Check **Amplify Console → Deployments** for progress

### Custom Domain Issues
```bash
# Add custom domain
amplify add custom-domain

# Update DNS records in your domain provider
# Amplify will guide you through this
```

---

## 📞 Need Help?

- **Amplify Docs:** https://docs.amplify.aws/
- **AWS Support:** https://console.aws.amazon.com/support
- **GitHub Issues:** https://github.com/mfs-solutions/skywaytalents/issues

---

## 🎉 You're All Set!

Your Sky Way Talents casting application is now:

✅ Deployed on AWS Amplify  
✅ Auto-deployed from GitHub  
✅ Secured with HTTPS  
✅ Globally distributed  
✅ Auto-scaling  
✅ 24/7 monitoring  

**Happy Casting! 🎬**

---

*AWS Amplify Deployment Guide | Sky Way Talents | November 2024*
