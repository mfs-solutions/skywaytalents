# Sky Way Talents - Setup & Configuration Guide

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm (v7 or higher)
- Firebase Account
- Modern web browser

### Installation Steps

```bash
# 1. Clone or navigate to the repository
cd /workspaces/skywaytalents

# 2. Install dependencies
npm install

# 3. Configure Firebase
# Edit firebase.ts with your Firebase credentials

# 4. Start development server
npm run dev

# 5. Open browser
# Navigate to http://localhost:3001
```

---

## 🔧 Firebase Configuration

### Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project named "Sky Way Talents"
3. Enable Analytics (optional)

### Step 2: Set Up Services

#### Firestore Database
1. Go to Build > Firestore Database
2. Click "Create database"
3. Choose "Start in production mode"
4. Select region: `europe-west1` (London) or preferred EU region
5. Click "Enable"

#### Cloud Storage
1. Go to Build > Storage
2. Click "Get Started"
3. Accept default rules for now
4. Confirm storage location (same as Firestore)
5. Done

#### Authentication
1. Go to Build > Authentication
2. Click "Get started"
3. Sign-in method: Choose "Anonymous"
4. Enable and Save

### Step 3: Get Firebase Credentials
1. Go to Project Settings (gear icon)
2. Copy your project configuration
3. Update `firebase.ts` with:
   - apiKey
   - authDomain
   - projectId
   - storageBucket
   - messagingSenderId
   - appId

### Step 4: Update Security Rules

**Firestore Security Rules:**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /applications/{document=**} {
      allow read, write: if true;
    }
  }
}
```

**Cloud Storage Security Rules:**
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /applications/{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```

---

## 🎨 Customization Guide

### Brand Colors
Edit `index.html` tailwind config:
```javascript
colors: {
  primary: '#1e3a8a',      // Navy Blue
  secondary: '#0f172a',    // Dark Slate
  accent: '#f8fafc',       // Light Background
  gold: '#d97706',         // Gold Accent
  'text-primary': '#0f172a',
  'text-light': '#64748b',
}
```

### Company Information
Edit `components/layout/Footer.tsx`:
- Company name
- Address
- Phone
- Email
- Social media links

### Casting Positions
Edit `components/steps/LandingPage.tsx`:
- Number of positions per age group
- Role descriptions
- Production details

### Form Fields
Edit `types.ts` and `components/steps/ApplicationForm.tsx`:
- Add/remove form fields
- Modify validation rules
- Update field labels

---

## 📁 Project Structure

```
/workspaces/skywaytalents/
├── public/                    # Static assets
├── src/
│   ├── components/
│   │   ├── common/           # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   └── ConfigErrorOverlay.tsx
│   │   ├── form/             # Form input components
│   │   │   ├── TextInput.tsx
│   │   │   ├── SelectInput.tsx
│   │   │   ├── FileUpload.tsx
│   │   │   ├── TextArea.tsx
│   │   │   └── ToggleGrid.tsx
│   │   ├── layout/           # Layout components
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   └── steps/            # Multi-step form pages
│   │       ├── LandingPage.tsx
│   │       ├── ApplicationForm.tsx
│   │       ├── PortfolioUpload.tsx
│   │       └── SuccessPage.tsx
│   ├── App.tsx               # Main app component
│   ├── types.ts              # TypeScript interfaces
│   ├── firebase.ts           # Firebase config
│   ├── gemini.ts             # AI integration
│   └── index.tsx             # React root
├── index.html                # HTML template
├── tsconfig.json             # TypeScript config
├── vite.config.ts            # Vite config
├── package.json              # Dependencies
├── README.md                 # Main documentation
├── REDESIGN_SUMMARY.md       # Redesign overview
└── SETUP_GUIDE.md           # This file
```

---

## 🎬 Age Groups & Roles

### Casting Requirements
```
Role 1: Age 18-25
├─ Positions: 5
├─ Type: Leading Roles
└─ Description: Dynamic, versatile performers

Role 2: Age 35-45
├─ Positions: 2
├─ Type: Supporting Roles
└─ Description: Mature professionals

Role 3: Age 45+
├─ Positions: 2
├─ Type: Senior Roles
└─ Description: Distinguished actresses
```

To modify these, edit:
1. `types.ts` - AgeGroup enum
2. `LandingPage.tsx` - Role cards
3. `ApplicationForm.tsx` - Age group options

---

## 📊 Database Schema

### Firestore Collections

#### Applications Collection
```javascript
{
  id: "APP_ID_XXXXXXXXXX",
  fullName: "Jane Doe",
  email: "jane@example.com",
  phone: "+44 (0)20 XXXX XXXX",
  dateOfBirth: "1995-05-15",
  ageGroup: "18-25",
  ethnicity: "White",
  measurements: {
    height: "170",
    weight: "65",
    hairColour: "Brown",
    eyeColour: "Blue",
    skinTone: "Fair"
  },
  experience: "3 years theatre and TV",
  castingRole: "Leading Role",
  drivingLicense: true,
  ownCar: false,
  availableFromDate: "2024-12-01",
  contentComfort: {
    nude: false,
    underwear: true,
    violent: false,
    romantic: true,
    alcohol: false
  },
  additionalInfo: "Additional notes...",
  termsAccepted: true,
  portfolio: {
    headshot: ["gs://..."],
    fullBody: ["gs://..."],
    profileVideo: ["gs://..."]
  },
  submittedAt: Timestamp,
  status: "pending"
}
```

---

## 🔒 Security Checklist

- [ ] Firebase project created
- [ ] Firestore enabled
- [ ] Cloud Storage enabled
- [ ] Anonymous Auth enabled
- [ ] Security rules configured
- [ ] Environment variables secured
- [ ] No API keys in source code
- [ ] HTTPS enabled
- [ ] Data backup configured
- [ ] Privacy policy reviewed

---

## 🧪 Testing

### Manual Testing Checklist
- [ ] Landing page loads
- [ ] All form fields validate
- [ ] File upload works
- [ ] Images preview
- [ ] Success page displays
- [ ] Application ID shown
- [ ] Responsive on mobile
- [ ] Responsive on tablet
- [ ] Responsive on desktop
- [ ] All links work
- [ ] Footer displays correctly

### Testing Commands
```bash
# Development with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type check
npx tsc --noEmit
```

---

## 📱 Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🚀 Deployment

### Netlify Deployment
```bash
# 1. Install Netlify CLI
npm install -g netlify-cli

# 2. Build the project
npm run build

# 3. Deploy
netlify deploy --prod --dir=dist
```

### Firebase Hosting
```bash
# 1. Install Firebase CLI
npm install -g firebase-tools

# 2. Login
firebase login

# 3. Initialize
firebase init hosting

# 4. Build and deploy
npm run build
firebase deploy
```

### Vercel Deployment
```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Deploy
vercel
```

---

## 📊 Analytics Setup (Optional)

### Google Analytics
1. Create Google Analytics property
2. Get measurement ID
3. Add to `index.html`
4. Track form submissions

### Event Tracking
```javascript
// Track form submission
gtag('event', 'form_submit', {
  'application_id': applicationId,
  'age_group': formData.ageGroup
});
```

---

## 🐛 Troubleshooting

### Issue: Firebase Configuration Error
**Solution:**
- Check Firebase credentials in `firebase.ts`
- Verify Anonymous Auth is enabled
- Check project ID matches

### Issue: File Upload Fails
**Solution:**
- Verify Cloud Storage bucket exists
- Check Storage security rules
- Verify file size limits
- Check internet connection

### Issue: Form Not Validating
**Solution:**
- Check browser console for errors
- Verify field names match types.ts
- Clear browser cache
- Reload page

### Issue: Port Already in Use
**Solution:**
```bash
# Use different port
npm run dev -- --port 3002
```

---

## 📞 Support

For technical support:
- Check README.md
- Review code comments
- Check Firebase documentation
- Contact Sky Way Talents: casting@skywaytalents.co.uk

---

## 📈 Performance Tips

1. **Optimize Images**
   - Compress before upload
   - Use WebP format when possible
   - Limit to required dimensions

2. **Improve Load Time**
   - Enable Firestore caching
   - Implement code splitting
   - Use CDN for assets

3. **Database Optimization**
   - Index frequently queried fields
   - Archive old applications
   - Monitor database size

---

## 📋 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Nov 2024 | Initial production release |

---

**Last Updated:** November 2024  
**Status:** Production Ready

