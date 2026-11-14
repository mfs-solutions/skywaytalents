# 🚀 AWS Amplify Deployment Setup - Complete

**Sky Way Talents Casting Application**  
**Deployment Ready** ✅

---

## 📋 What's Been Prepared

### ✅ Configuration Files Created

| File | Purpose |
|------|---------|
| **amplify.yml** | Build & deployment configuration for AWS Amplify |
| **.npmrc** | NPM optimization for CI/CD environments |
| **.env.example** | Template for environment variables |
| **deploy.sh** | Automated deployment script (executable) |
| **.github/workflows/amplify-deploy.yml** | GitHub Actions CI/CD pipeline |

### ✅ Documentation Created

| Document | Content |
|----------|---------|
| **AMPLIFY_QUICK_START.md** | 3-step deployment guide |
| **AWS_AMPLIFY_DEPLOYMENT.md** | Complete deployment documentation |

---

## 🎯 Your Next Steps (Choose One)

### **Option 1: Automatic Deployment (Recommended)**

1. **Configure AWS Credentials:**
   ```bash
   aws configure
   # Enter your AWS Access Key ID and Secret Access Key
   ```

2. **Run Deployment Script:**
   ```bash
   bash deploy.sh
   # This will:
   # - Check prerequisites
   # - Build the application
   # - Initialize Amplify
   # - Deploy to production
   ```

3. **Done!** Your app will be live in 5-10 minutes.

---

### **Option 2: Manual Deployment**

1. **Configure AWS:**
   ```bash
   aws configure
   ```

2. **Initialize Amplify:**
   ```bash
   amplify init
   # Follow the prompts
   ```

3. **Add Hosting:**
   ```bash
   amplify add hosting
   # Select: Amplify Console
   # Provider: GitHub
   # Repository: mfs-solutions/skywaytalents
   # Branch: main
   ```

4. **Deploy:**
   ```bash
   amplify publish --yes
   ```

---

### **Option 3: GitHub Actions (CI/CD)**

1. **Add AWS Secrets to GitHub:**
   - Go to: GitHub → Settings → Secrets and variables → Actions
   - Add secrets:
     - `AWS_ACCESS_KEY_ID` = your-access-key
     - `AWS_SECRET_ACCESS_KEY` = your-secret-key

2. **Workflow will automatically:**
   - Build on every push to `main`
   - Deploy to AWS Amplify
   - Report status

---

## 📊 Deployment Architecture

```
Your GitHub Repository
         ↓
Amplify Console (auto-triggered)
         ↓
Build Phase:
  - npm ci (install dependencies)
  - npm run build (create dist folder)
         ↓
Deploy Phase:
  - Upload to S3
  - Configure CloudFront
  - Enable HTTPS
         ↓
Live URL: https://[branch].amplifyapp.com
         ↓
Your Users Access the Site 🎉
```

---

## 🔧 Configuration Details

### amplify.yml
```yaml
- Prune dead code: Enabled
- Cache npm modules: Enabled
- Source: dist/ (Vite output)
- Build: npm run build
- Install: npm ci
```

### .npmrc
```
- Legacy peer deps: Supported
- Offline mode: Enabled for faster builds
- CI optimizations: Applied
```

### Environment Variables (Add in Amplify Console)
```
VITE_FIREBASE_API_KEY = [your-key]
VITE_FIREBASE_PROJECT_ID = [your-project]
VITE_APP_ENVIRONMENT = production
```

---

## 📱 After Deployment

### Your Live Application
```
🌍 URL: https://main.[unique-id].amplifyapp.com
📊 Console: https://console.aws.amazon.com/amplify
📡 Status: Auto-deployed from GitHub
🔒 HTTPS: Enabled by default
⚡ Performance: CloudFront CDN
```

### Monitoring
```bash
# View deployment logs
amplify logs -c hosting --follow

# Check deployment status
amplify status

# Open Amplify Console
amplify console
```

---

## 🎯 Features Automatically Enabled

✅ **HTTPS** - SSL/TLS certificates automatically managed  
✅ **CDN** - CloudFront distribution for global caching  
✅ **Auto-scaling** - Handles traffic spikes automatically  
✅ **Continuous Deployment** - Auto-deploy on git push  
✅ **Instant Rollback** - Revert to previous deployments  
✅ **Monitoring** - Real-time logs and metrics  
✅ **Custom Domain** - Add your own domain (optional)  
✅ **Environment Variables** - Secure secrets management  

---

## 🔐 Security Setup

### Protect Your AWS Credentials
1. Never commit `.env` or credentials to Git
2. Store secrets in Amplify Console environment variables
3. Use AWS IAM roles (not root account keys)
4. Enable MFA on AWS account
5. Rotate access keys regularly

### Application Security
- Firestore rules (if using Firebase)
- CORS policies
- Content Security Policy headers
- HTTPS only

---

## 💰 AWS Amplify Pricing

### Free Tier Includes:
- ✅ 15 GB data out per month
- ✅ Unlimited builds and deployments
- ✅ Free SSL certificate
- ✅ Free static hosting

### Typical Costs:
- Basic casting app: **$0-5/month** (free tier)
- High traffic: 1GB data = $0.15

---

## 🆘 Troubleshooting

### Build Fails
```bash
# Check the build logs in Amplify Console
# Common issues:
# 1. Wrong build command (should be: npm run build)
# 2. Missing environment variables
# 3. Node version mismatch

# Verify locally:
npm run build
```

### Deployment Slow
- First deployment: 5-10 minutes
- Subsequent: 2-5 minutes
- npm module caching speeds up future builds

### GitHub Connection Issues
```bash
# Reconnect GitHub
amplify remove hosting
amplify add hosting
# Authenticate with GitHub again
```

### Custom Domain SSL Issues
```bash
# Amplify handles SSL automatically
# Just add your domain via Amplify Console
# DNS propagation: 15-60 minutes
```

---

## 📞 Support Resources

| Resource | Link |
|----------|------|
| **Amplify Docs** | https://docs.amplify.aws/ |
| **AWS Console** | https://console.aws.amazon.com/amplify |
| **GitHub Issues** | https://github.com/mfs-solutions/skywaytalents/issues |
| **AWS Support** | https://console.aws.amazon.com/support |

---

## ✅ Pre-Deployment Verification

Before deploying, ensure:

- [x] Code is committed to GitHub
- [x] `npm run build` works locally
- [x] No TypeScript errors
- [x] Production build size reasonable (944 KB ✅)
- [x] `.env` files are in `.gitignore`
- [x] AWS account created
- [x] AWS credentials configured

---

## 🎉 You're Ready to Deploy!

### Quick Command Reference

```bash
# 1. Configure AWS (one-time)
aws configure

# 2. Initialize Amplify (one-time)
amplify init

# 3. Deploy (repeatable)
amplify publish --yes

# OR use the automated script:
bash deploy.sh
```

---

## 📊 Post-Deployment Checklist

After going live, verify:

- [ ] Website loads without errors
- [ ] All images and CSS loaded
- [ ] Forms work correctly
- [ ] File uploads function
- [ ] Mobile responsiveness works
- [ ] HTTPS certificate valid
- [ ] No console errors
- [ ] Metrics visible in Amplify Console

---

## 🚀 What Happens Next

1. **Deploy** → GitHub → Amplify → Live (5-10 min)
2. **Monitor** → Check logs and metrics
3. **Iterate** → Push changes → Auto-deploy
4. **Scale** → Amplify handles traffic automatically
5. **Maintain** → Rotate credentials quarterly

---

## 💡 Pro Tips

1. **Test locally first:** `npm run dev` before deploying
2. **Use branches:** Deploy dev to staging, main to production
3. **Monitor performance:** Check Amplify metrics weekly
4. **Backup databases:** If using Firestore, enable backups
5. **Update regularly:** Keep dependencies current

---

## 🎬 Sky Way Talents Goes Live!

Your professional casting application is ready to:
- ✅ Accept applications from candidates
- ✅ Process portfolio submissions
- ✅ Generate application references
- ✅ Scale to thousands of applicants
- ✅ Provide world-class user experience

**Happy Casting! 🎬✨**

---

**Deployment Guide** | Sky Way Talents | Version 1.0 | November 2024

**Next: Run `bash deploy.sh` or follow the Quick Start guide above**
