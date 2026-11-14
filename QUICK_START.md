# 🚀 Quick Start Guide - Sky Way Talents Casting Application

## 5-Minute Setup

### Step 1: Install Dependencies
```bash
cd /workspaces/skywaytalents
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```
Visit: **http://localhost:3001**

### Step 3: Firebase Setup (First Time Only)
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create project: "Sky Way Talents"
3. Enable: Firestore, Cloud Storage, Anonymous Auth
4. Get credentials from Project Settings
5. Update `firebase.ts` with your credentials

Done! 🎉

---

## 📱 Application Overview

### What Users See

#### 🎬 Landing Page
- Welcome message
- 3 role cards (Age groups: 18-25, 35-45, 45+)
- Production details
- "Apply Now" button

#### 📋 Application Form (Step 1 of 3)
- Personal info (Name, Email, Phone, DOB)
- Age group & ethnicity selection
- Physical characteristics
- Professional details
- Content comfort level checkboxes
- Additional notes field

#### 📸 Portfolio Upload (Step 2 of 3)
- Headshot upload (Required)
- Full body photos (Required)
- Profile video (Optional)
- Drag-and-drop interface
- Terms agreement checkbox

#### ✅ Success Page (Step 3 of 3)
- Confirmation message
- Application Reference Number
- Next steps explanation
- Contact information
- Print option

---

## 🎨 Design Highlights

### Colors
```
Navy Blue     #1e3a8a     Main brand color
Gold Accent   #d97706     Call-to-action buttons
Light Gray    #f8fafc     Background
White         #ffffff     Cards & text areas
```

### Fonts
- **Headers:** Playfair Display (elegant serif)
- **Body:** Poppins (modern sans-serif)

### Layout
- Desktop: 3-4 columns
- Tablet: 2 columns
- Mobile: 1 column (full width)

---

## 📊 Casting Positions

| Age Group | Positions | Role Type | Traits |
|-----------|-----------|-----------|--------|
| 18-25 | 5 | Leading Roles | Dynamic, versatile |
| 35-45 | 2 | Supporting Roles | Mature, experienced |
| 45+ | 2 | Senior Roles | Distinguished, elegant |

---

## 🏢 Company Information

**Sky Way Talents**
- 📍 16 George Street, Lewisham, England, SE13 5HE
- 📧 casting@skywaytalents.co.uk
- 🌐 Professional Talent Management

---

## 🛠️ File Structure

```
/workspaces/skywaytalents/
├── components/
│   ├── layout/           ← Header & Footer
│   ├── steps/            ← Page components
│   ├── form/             ← Input components
│   └── common/           ← Shared components
├── App.tsx               ← Main app
├── types.ts              ← Data types
├── firebase.ts           ← Backend config
├── index.html            ← HTML template
├── package.json          ← Dependencies
└── README.md             ← Full docs
```

---

## ⚡ Key Features

✅ **Professional Design**
- Corporate color scheme
- Elegant typography
- Smooth animations
- Responsive layout

✅ **Form Features**
- Multi-step wizard
- Real-time validation
- Error handling
- Progress indicators

✅ **Portfolio Upload**
- Drag-and-drop
- File previews
- Progress tracking
- Multiple file types

✅ **Mobile Optimized**
- Works on all devices
- Touch-friendly buttons
- Readable on small screens
- Full functionality

---

## 🧪 Testing

### Test in Browser
1. Start dev server: `npm run dev`
2. Open: http://localhost:3001
3. Click "Apply Now"
4. Fill out the form
5. Upload test images
6. Verify success page

### Test on Mobile
```bash
# Get your IP
ipconfig getifaddr en0  # Mac
# or
hostname -I            # Linux

# Visit from phone:
http://YOUR_IP:3001
```

---

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

### Deploy to Firebase
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

---

## 📚 Documentation

| File | Purpose |
|------|---------|
| README.md | Complete project overview |
| SETUP_GUIDE.md | Installation & configuration |
| DESIGN_SPECIFICATIONS.md | Design system details |
| REDESIGN_SUMMARY.md | Project redesign overview |
| FILES_SUMMARY.md | File organization guide |

---

## 🔧 Customization

### Change Company Name
Edit `components/layout/Footer.tsx`:
```typescript
<h3 className="text-lg font-bold">Your Company Name</h3>
```

### Change Colors
Edit `index.html` tailwind config:
```javascript
colors: {
  primary: '#1e3a8a',      // Change to your color
  gold: '#d97706',
  // ...
}
```

### Add New Form Fields
1. Edit `types.ts` - Add to FormData interface
2. Edit `ApplicationForm.tsx` - Add input field
3. Update validation logic

### Change Casting Positions
Edit `components/steps/LandingPage.tsx`:
```typescript
// Modify the role cards
```

---

## ⚠️ Common Issues

### Port Already in Use
```bash
npm run dev -- --port 3002
```

### Firebase Error
- Check `firebase.ts` credentials
- Verify Anonymous Auth enabled
- Check Firestore/Storage rules

### Form Not Submitting
- Check browser console for errors
- Verify all required fields filled
- Check Firebase configuration

---

## 📞 Support

**Contact:** casting@skywaytalents.co.uk  
**Address:** 16 George Street, Lewisham, England, SE13 5HE

---

## 📊 Quick Stats

- **Components:** 15+
- **Pages:** 4 steps
- **Form Fields:** 30+
- **File Types:** Images, Videos
- **Responsive:** Yes
- **Mobile Ready:** Yes
- **Build Size:** 944 KB (249 KB gzip)

---

## 🎯 Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Configure Firebase
3. ✅ Start dev server: `npm run dev`
4. ✅ Test the application
5. ✅ Customize for your brand
6. ✅ Deploy to production

---

## 📄 Version

**v1.0** - Production Ready  
**Last Updated:** November 2024

---

**Happy Casting! 🎬✨**

