# AWS Amplify Deployment Guide
## Sky Way Talents Casting Application

---

## 📋 Prerequisites

✅ **Already Installed:**
- Node.js 18+
- npm/yarn
- Git repository (mfs-solutions/skywaytalents)
- AWS Amplify CLI

**You Need to Have:**
- AWS Account (with IAM permissions for Amplify)
- GitHub personal access token (for GitHub integration)

---

## 🚀 Deployment Steps

### Step 1: Verify Project Build
```bash
cd /workspaces/skywaytalents
npm run build
```
Expected: ✅ Production build successful (944 KB / 249 KB gzip)

### Step 2: Configure AWS Credentials

```bash
# Option A: Using AWS CLI (Recommended)
aws configure

# When prompted, enter:
# AWS Access Key ID: [your-access-key]
# AWS Secret Access Key: [your-secret-key]
# Default region: us-east-1
# Default output format: json
```

**Get AWS credentials:**
1. Go to AWS Console → IAM → Users → Your User
2. Security credentials → Create Access Key
3. Copy Access Key ID and Secret Access Key

### Step 3: Initialize Amplify (If Not Already Done)

```bash
amplify init
```

**When prompted:**
- Environment name: `prod` (or `dev` for testing)
- Editor: `Visual Studio Code` (default)
- App type: `javascript`
- JavaScript framework: `react`
- Source directory: `src`
- Distribution directory: `dist`
- Build command: `npm run build`
- Start command: `npm run dev`
- Deploy with Amplify Console: Yes (Y)

### Step 4: Add Hosting

```bash
amplify add hosting
```

**When prompted:**
- Hosting with Amplify Console: `Yes`
- App repository service provider: `GitHub`
- Repository: Select `mfs-solutions/skywaytalents`
- Branch: `main`
- Build settings: `Use default build settings` (or configure manually)
- Environment variables: (Optional - add if needed)

### Step 5: Deploy

```bash
# Deploy to Amplify
amplify publish

# This will:
# 1. Commit to GitHub
# 2. Trigger build in Amplify Console
# 3. Deploy to production URL
```

---

## ✨ After Deployment

### Access Your Application
- **Live URL:** `https://[branch-name].[unique-id].amplifyapp.com`
- **Amplify Console:** `https://console.aws.amazon.com/amplify`

### Configure Custom Domain (Optional)
```bash
amplify add custom-domain
```

### Update Environment Variables
If Firebase credentials are needed, add in Amplify Console:
1. App Settings → Environment variables
2. Add `VITE_FIREBASE_*` variables

### Enable SSL/TLS
- Automatically enabled by Amplify ✅

---

## 📊 Deployment Checklist

- [ ] AWS account created
- [ ] IAM credentials configured
- [ ] Amplify CLI installed
- [ ] GitHub personal access token generated
- [ ] Production build tested locally (`npm run build`)
- [ ] `amplify init` completed
- [ ] Hosting configured (`amplify add hosting`)
- [ ] GitHub integration connected
- [ ] Deploy triggered (`amplify publish`)
- [ ] Live URL verified
- [ ] Firebase credentials (if needed) added to environment variables
- [ ] Custom domain configured (optional)
- [ ] SSL certificate verified

---

## 🔧 Amplify Configuration Files

After initialization, your project will include:

```
.amplifyrc
├── amplify/
│   ├── #current-cloud-backend/
│   ├── backend/
│   │   ├── hosting/
│   │   └── ...
│   └── team-provider-info.json
├── .gitignore (updated)
└── amplify.yml (auto-generated)
```

---

## 📱 Monitoring & Logs

### View Logs
```bash
# Real-time logs
amplify logs -c hosting

# Historical logs in Amplify Console
# App → Deployments → View logs
```

### View Metrics
- Amplify Console → Analytics
- CloudWatch Metrics

---

## 🔐 Security Best Practices

1. **Environment Variables**
   - Never commit secrets
   - Use Amplify Console for sensitive values
   - Enable encryption at rest

2. **Firebase Credentials**
   - Use IAM roles instead of keys when possible
   - Store in Amplify environment variables
   - Rotate keys regularly

3. **Custom Domain**
   - Enable HTTPS (automatic)
   - Use CloudFront for caching
   - Enable WAF protection

4. **Access Control**
   - Restrict IAM permissions to least-privilege
   - Use branch protection rules
   - Enable two-factor authentication

---

## 🔄 CI/CD Pipeline

Amplify automatically creates CI/CD:

1. **Commit to GitHub** → Triggers Amplify build
2. **Build Phase**
   - Clone repository
   - Install dependencies (`npm install`)
   - Build app (`npm run build`)
3. **Deploy Phase**
   - Upload to S3
   - CloudFront distribution
   - Live URL available

---

## ❌ Troubleshooting

### Build Fails
```bash
# Check build logs in Amplify Console
# Common issues:
# - Missing environment variables
# - Incorrect build command
# - Node version mismatch

# Fix: Update amplify.yml
amplify configure build
```

### Deployment Issues
```bash
# Check Amplify status
amplify status

# View detailed logs
amplify logs -c hosting --follow
```

### GitHub Authentication Error
```bash
# Reconnect GitHub
amplify remove hosting
amplify add hosting
```

---

## 📞 Support & Resources

- **Amplify Docs:** https://docs.amplify.aws/
- **AWS Console:** https://console.aws.amazon.com/amplify
- **GitHub Integration:** https://docs.amplify.aws/gen1/react/build-a-backend/hosting/amplify-hosting/

---

## ✅ Deployment Complete!

Your Sky Way Talents casting application is now:
- ✅ Hosted on AWS Amplify
- ✅ Auto-deployed from GitHub
- ✅ Secured with HTTPS
- ✅ Globally distributed via CloudFront
- ✅ Automatically scaled
- ✅ Monitored 24/7

**Production URL:** `https://[your-domain].amplifyapp.com`

---

**Version 1.0** | November 2024 | Sky Way Talents
