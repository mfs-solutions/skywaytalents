# Sky Way Talents - Series Casting Call Application

## 🎬 Overview

A professional, corporate-designed casting call application form for Sky Way Talents. This web application allows actresses to apply for an upcoming premium television series with specialized roles for different age groups.

**Agency Details:**
- **Name:** Sky Way Talents
- **Address:** 16 George Street, Lewisham, England, SE13 5HE
- **Email:** info@SKYWAYTALENTS.UK
- **Phone:** +44 7599577729
- **Website:** SKYWAYTALENTS.UK

## 🚀 Backend: Supabase

This application uses **Supabase** as the backend for database and file storage:

### Supabase Features
- ✅ PostgreSQL Database for storing applications
- ✅ Object Storage for images and videos
- ✅ Row Level Security (RLS) for access control
- ✅ Real-time capabilities (optional)
- ✅ Free tier available for testing
- ✅ Scalable to production with pay-as-you-go pricing

### Quick Setup
See **[SUPABASE_QUICK_START.md](SUPABASE_QUICK_START.md)** for 5-minute setup instructions.

Full documentation: **[SUPABASE_INTEGRATION.md](SUPABASE_INTEGRATION.md)**

## 👥 Casting Positions

The application is designed to cast for **9 positions** across three age groups:

### 1. Leading Roles (Age 18-25)
- **Positions:** 5 actresses required
- **Character Type:** Dynamic, versatile performers with strong screen presence
- **Traits:** Young, energetic, and adaptable

### 2. Supporting Roles (Age 35-45)
- **Positions:** 2 actresses required
- **Character Type:** Mature professionals with character depth
- **Traits:** Experienced, nuanced performers

### 3. Senior Roles (Age 45+)
- **Positions:** 2 actresses required
- **Character Type:** Distinguished actresses
- **Traits:** Elegant, authoritative presence essential

## 🎨 Design Features

### Professional Corporate Design
- **Color Scheme:**
  - Primary: Navy Blue (#1e3a8a)
  - Secondary: Dark Slate (#0f172a)
  - Accent/Gold: Amber (#d97706)
  - Light Background: Slate (#f8fafc)

- **Typography:**
  - Display Font: Playfair Display (serif) for headings
  - Body Font: Poppins (sans-serif) for content
  - Professional, clean, and modern aesthetic

### Layout Components

#### Header
- Sticky navigation with Sky Way Talents branding
- Logo and agency name
- "Series Casting Call - Now Accepting Applications" status
- Professional border accent in gold

#### Footer
- Complete company information
- Address and contact details
- Quick links section
- Social media links
- Copyright and production information
- Contact guidance

#### Main Content Sections
- Hero/Landing page with role details
- Multi-step application form (3 steps)
- Success confirmation page

## 📋 Application Process

### Step 1: Landing Page
Comprehensive introduction featuring:
- Project overview and production details
- 3-column card layout showcasing each role
- Age groups, requirements, and position counts
- Production details and guidelines
- Important information callout
- Clear call-to-action button

### Step 2: Application Form
Detailed personal information collection:

**Personal Information:**
- Full Name (required)
- Email Address (required)
- Phone Number (required)
- Date of Birth (required)
- Age Group Selection (required)
- Ethnicity (required)

**Physical Characteristics:**
- Height in cm (required)
- Weight in kg (required)
- Hair Colour
- Eye Colour
- Skin Tone

**Professional Details:**
- Casting Role preference
- Years of Experience
- Availability Date (required)
- Driving License (checkbox)
- Own Vehicle (checkbox)

**Content Comfort Level:**
- Nude/Semi-nude scenes
- Underwear/Lingerie scenes
- Violent scenes
- Romantic/Intimate scenes
- Alcohol/Drug use scenes

**Additional Information:**
- Open text field for relevant experience and notes

### Step 3: Portfolio Upload
Media submission section:

**Required Files:**
1. **Professional Headshot** (JPG/PNG, Max 5MB)
   - Close-up photo of face
   - Essential for casting team assessment

2. **Full Body Photos** (JPG/PNG, Max 5MB each)
   - Full-length photos showing complete physique
   - Casual or professional attire

**Optional Files:**
3. **Profile/Introduction Video** (MP4/MOV, Max 50MB)
   - 60-120 second video introducing yourself
   - Shows personality and screen presence

**Features:**
- Drag-and-drop file upload
- File preview thumbnails
- Progress indicator
- Photography guidelines
- Terms & Conditions agreement
- Error handling and validation

### Step 4: Success Page
Confirmation screen featuring:
- Success message with checkmark animation
- Unique Application Reference Number
- 4-step process explanation
- Important reminders
- Contact information
- Social media follow suggestions
- Print confirmation option
- Return to home button

## 🛠️ Technical Stack

- **Framework:** React 19 with TypeScript
- **Styling:** Tailwind CSS
- **Build Tool:** Vite
- **Backend:** Supabase (PostgreSQL + Storage)
- **Authentication:** Row Level Security (RLS)
- **Deployment:** AWS Amplify (frontend)

### Project Structure

```
components/
├── common/
│   ├── Button.tsx         - Reusable button component
│   ├── Card.tsx          - Card container component
│   └── ConfigErrorOverlay.tsx
├── form/
│   ├── TextInput.tsx      - Text input field
│   ├── SelectInput.tsx    - Dropdown select
│   ├── FileUpload.tsx     - File upload with drag-drop
│   ├── TextArea.tsx       - Text area field
│   └── ToggleGrid.tsx
├── layout/
│   ├── Header.tsx         - Top navigation header
│   └── Footer.tsx         - Footer with contact info
└── steps/
    ├── LandingPage.tsx    - Step 1: Welcome page
    ├── ApplicationForm.tsx - Step 2: Personal info
    ├── PortfolioUpload.tsx - Step 3: Media upload
    └── SuccessPage.tsx    - Step 4: Confirmation

App.tsx                    - Main application component
types.ts                   - TypeScript interfaces
firebase.ts               - Firebase configuration
gemini.ts                 - AI integration
```

## ✨ Key Features

### User Experience
- ✅ Multi-step form with progress indicators
- ✅ Form validation with error messages
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Drag-and-drop file uploads
- ✅ Image previews before submission
- ✅ Navigation between form steps
- ✅ Professional loading states

### Professional Elements
- ✅ Corporate color scheme and branding
- ✅ Consistent typography and spacing
- ✅ High-quality UI with shadows and borders
- ✅ Smooth transitions and hover effects
- ✅ Clear visual hierarchy
- ✅ Accessibility considerations

### Data Management
- ✅ Form validation at each step
- ✅ Error handling and user feedback
- ✅ Firebase data persistence
- ✅ File upload with progress tracking
- ✅ Application ID generation
- ✅ Unique reference numbers for tracking

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Setup

Configure Firebase credentials in `firebase.ts`:
- Project ID
- API Key
- Auth Domain
- Storage Bucket
- Messaging Sender ID

Enable the following in Firebase:
- Firestore Database
- Cloud Storage
- Anonymous Authentication

## 📱 Responsive Design

The application is fully responsive:
- **Mobile:** Optimized for screens < 640px
- **Tablet:** Enhanced layout for 641px - 1024px
- **Desktop:** Full experience for screens > 1024px

## 🎯 Validation Rules

### Required Fields
- Full Name (text, non-empty)
- Email (valid email format)
- Phone (non-empty)
- Date of Birth (valid date)
- Age Group (must select)
- Ethnicity (must select)
- Height (required number)
- Weight (required number)
- Availability Date (valid date)
- Headshot Photos (at least 1)
- Full Body Photos (at least 1)
- Terms Agreement (must accept)

### File Upload Limits
- Images: JPG/PNG, Max 5MB each
- Videos: MP4/MOV, Max 50MB
- Headshots: Minimum 1 file
- Full Body: Minimum 1 file
- Profile Video: Optional

## 📧 Contact Information

**Sky Way Talents**
- Address: 16 George Street, Lewisham, England, SE13 5HE
- Email: casting@skywaytalents.co.uk
- Response Time: Up to 7 business days for enquiries

## 🔒 Privacy & Security

- All personal information is kept confidential
- Files are securely stored in Firebase
- No data is shared with third parties
- Anonymous authentication for data collection
- Terms & Conditions agreement required

## 📄 License

© 2024 Sky Way Talents. All rights reserved.

## 🎬 Version

**Version:** 1.0  
**Last Updated:** November 2024

---

**Built with ❤️ for Sky Way Talents**
