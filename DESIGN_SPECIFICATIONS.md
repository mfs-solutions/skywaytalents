# 🎨 Sky Way Talents - Design Specifications

## Visual Design System

### Color Palette

#### Primary Colors
```
Navy Blue (Primary)
━━━━━━━━━━━━━━━━━━━
HEX:   #1e3a8a
RGB:   30, 58, 138
Usage: Main headings, primary buttons, borders, focus states
```

```
Dark Slate (Secondary)
━━━━━━━━━━━━━━━━━━━━━━
HEX:   #0f172a
RGB:   15, 23, 42
Usage: Footer background, dark text, secondary elements
```

#### Accent Colors
```
Gold/Amber (Accent)
━━━━━━━━━━━━━━━━━━
HEX:   #d97706
RGB:   217, 119, 6
Usage: CTA buttons, highlights, accents, icons
```

#### Neutral Colors
```
Light Background
━━━━━━━━━━━━━━━━
HEX:   #f8fafc
RGB:   248, 250, 252
Usage: Main background, subtle backgrounds

White
━━━━━
HEX:   #ffffff
RGB:   255, 255, 255
Usage: Cards, containers, text backgrounds

Gray (Text Light)
━━━━━━━━━━━━━━━
HEX:   #64748b
RGB:   100, 116, 139
Usage: Secondary text, helper text
```

---

## Typography System

### Font Stack
```
Headers:     Playfair Display, serif
Body:        Poppins, sans-serif
Monospace:   Courier, monospace
```

### Font Sizes
```
H1: 48px / 60px (landing page heading)
H2: 36px / 42px (section headings)
H3: 24px / 30px (subsection headings)
H4: 18px / 28px (card titles)
Body: 14px / 16px / 20px (content)
Small: 12px / 13px (helper text, labels)
```

### Font Weights
```
Light:     300
Regular:   400
Medium:    500
Semibold:  600
Bold:      700
```

### Line Heights
```
Headings:  1.2
Body:      1.6
Tight:     1.4
```

---

## Component Specifications

### Header Component
```
Position:      Fixed/Sticky top
Height:        64px
Background:    White
Border:        Bottom 4px gold
Shadow:        Subtle (0 1px 3px rgba(0,0,0,0.1))
Padding:       16px horizontally
Alignment:     Flex, space-between

Left Section:
├─ Logo Box: 48x48px, gradient primary-secondary, rounded
├─ Company Name: 24px bold serif, navy blue
└─ Tagline: 12px gray

Right Section (Desktop):
├─ Status: 14px semibold navy
└─ Availability: 12px gold
```

### Footer Component
```
Position:      Fixed/Sticky bottom
Background:    Gradient primary to secondary
Color:         White text
Padding:       48px (top/bottom), 32px (sides)
Layout:        3-column grid (Desktop), stacked (Mobile)

Sections:
├─ Company Info
│  ├─ Logo/Name
│  ├─ Description
│  └─ Tagline
├─ Contact Info
│  ├─ Address
│  ├─ Email
│  └─ Phone
└─ Quick Links
   ├─ Home
   ├─ About
   ├─ Privacy
   └─ Terms

Divider:       1px solid gray-400, margin-top: 32px
Copyright:     12px gray-300, centered
```

### Role Card (Landing Page)
```
Background:    White
Border:        Left 4px solid (varies by role)
             ├─ Primary (Role 1)
             ├─ Gold (Role 2)
             └─ Secondary (Role 3)
Border-radius: 8px
Shadow:        Medium hover:shadow-xl
Padding:       32px
Transition:    All 300ms ease

Content:
├─ Icon Box: 48x48px, gradient background, rounded
├─ Title: 18px bold navy
├─ Subtitle: 14px gray
└─ Details Box:
   ├─ Background: Tinted color (10% opacity)
   ├─ Position Count: Bold, large text
   ├─ Description: Small gray text
   └─ Notes: Smallest text
```

### Form Input Components

#### TextInput
```
Background:    White
Border:        1px solid gray-300
Border-radius: 8px
Padding:       12px 16px
Font-size:     14px
Focus:         Ring 2px primary, border primary
Error:         Border red-500, ring red-400
Transition:    All 150ms ease

Label:
├─ Font-size:  14px
├─ Font-weight: 600
├─ Color:      navy (primary)
├─ Margin:     0 0 8px 0
└─ Asterisk:   Red for required
```

#### SelectInput
```
(Same as TextInput, with dropdown arrow)
┌─────────────────────────┐
│ -- Select an option -- ▼│
│ Option 1                 │
│ Option 2                 │
│ Option 3                 │
└─────────────────────────┘
```

#### FileUpload
```
Border:        2px dashed gray-300
Border-radius: 8px
Padding:       32px
Background:    White
Hover:         Border primary, bg blue-50, scale 1.02
Dragging:      Border primary, bg blue-50
Transition:    All 200ms ease

Icon:          SVG, 48px, primary color
Text:          "Click to upload" (bold) "or drag and drop"
Helper:        Small gray text

File Preview Grid:
├─ Grid layout: 4 columns (desktop)
├─ Images:     Full preview, rounded, border
├─ Videos:     Icon + filename, rounded, border
└─ Remove:     Hover to show X button, top-right
```

### Button Component

#### Primary Button (Gold)
```
Background:    Gradient gold to yellow-600
Color:         White
Padding:       12px 32px
Border-radius: 8px
Font-weight:   600
Border:        None
Shadow:        Medium
Hover:         Larger shadow, scale 1.05
Active:        Scale 0.98
Disabled:      Opacity 50%
Transition:    All 200ms ease
```

#### Secondary Button (Gray)
```
Background:    #d1d5db
Color:         #0f172a
Padding:       12px 32px
Border-radius: 8px
Font-weight:   600
Hover:         bg-gray-400
```

---

## Spacing System

```
Base Unit: 4px
Scale:
  0px    (0)
  4px    (1)
  8px    (2)
  12px   (3)
  16px   (4)
  24px   (6)
  32px   (8)
  48px   (12)
  64px   (16)
```

### Margin/Padding Classes
```
m/p-0  = 0px
m/p-1  = 4px
m/p-2  = 8px
m/p-3  = 12px
m/p-4  = 16px
m/p-6  = 24px
m/p-8  = 32px
m/p-12 = 48px
m/p-16 = 64px
```

---

## Border Radius

```
Small:   4px   (rounded)
Medium:  8px   (rounded-lg)
Large:   12px  (rounded-xl)
Round:   9999px (rounded-full)
```

### Usage
- Cards: 8px
- Inputs: 8px
- Buttons: 8px
- Icons/Avatar: 9999px (full circle)
- Subtle elements: 4px

---

## Shadows

```
Subtle:  0 1px 3px rgba(0,0,0,0.1)
Medium:  0 4px 6px rgba(0,0,0,0.1)
Large:   0 10px 15px rgba(0,0,0,0.1)
Heavy:   0 20px 25px rgba(0,0,0,0.15)
```

### Usage
- Card default: Medium
- Card hover: Large
- Button hover: Large
- Floating elements: Heavy

---

## Responsive Breakpoints

```
Mobile:     0px - 639px (Single column)
Tablet:     640px - 1023px (2 columns)
Desktop:    1024px+ (Full layout)
Wide:       1280px+ (Maximum width)
```

### Grid System
```
Mobile:   1 column, 16px padding
Tablet:   2 columns, 24px padding
Desktop:  3-4 columns, 32px padding
Max-width: 1280px (max-w-6xl in Tailwind)
```

---

## Page Layouts

### Landing Page
```
┌─────────────────────────────────────────┐
│ HEADER (Fixed/Sticky)                   │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ HERO SECTION                            │
│ Large heading, subheading, CTA badge    │
│ Gradient background                     │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ ROLES GRID (3 cards)                    │
│ ┌──────────────┬──────────────┬───────┐ │
│ │ Role Card 1  │ Role Card 2  │ Role  │ │
│ │ (Age 18-25)  │ (Age 35-45)  │ Card 3│ │
│ │              │              │       │ │
│ └──────────────┴──────────────┴───────┘ │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ PRODUCTION DETAILS (2 column)           │
│ ┌──────────────────┬──────────────────┐ │
│ │ Details Section  │ Requirements     │ │
│ │                  │ Section          │ │
│ └──────────────────┴──────────────────┘ │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ IMPORTANT INFO (Alert box)              │
│ Border-left, icon, bulleted list        │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ CTA SECTION                             │
│ Center: Large Gold Button               │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ FOOTER (Fixed/Sticky)                   │
└─────────────────────────────────────────┘
```

### Application Form Page
```
┌─────────────────────────────────────────┐
│ HEADER (Fixed)                          │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ SECTION HEADER (Gradient)               │
│ Title: "Application Form"               │
│ Subtitle: "Step 1 of 3"                 │
│ Progress Bar (33.33% filled)            │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ FORM CONTENT (White card)               │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ SECTION 1: Personal Information     │ │
│ │ ┌───────────────┬───────────────┐   │ │
│ │ │ Full Name     │ Email         │   │ │
│ │ ├───────────────┼───────────────┤   │ │
│ │ │ Phone         │ Date of Birth │   │ │
│ │ └───────────────┴───────────────┘   │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ SECTION 2: Measurements            │ │
│ │ (Similar grid layout)               │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ SECTION 3: Content Comfort         │ │
│ │ ☐ Nude   ☐ Underwear   ☐ Violent  │ │
│ │ ☐ Romantic   ☐ Alcohol             │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ BUTTON GROUP (Flex)                     │
│ [← Back]                [Continue →]    │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ FOOTER (Fixed)                          │
└─────────────────────────────────────────┘
```

### Success Page
```
┌─────────────────────────────────────────┐
│ SUCCESS HEADER (Green gradient)         │
│ ✓ Large checkmark icon                  │
│ "Application Submitted"                 │
│ "Thank you for applying"                │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ APPLICATION ID BOX (Blue background)    │
│ "Your Reference Number"                 │
│ APP_ID_XXXXXXXXXX (large monospace)     │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ NEXT STEPS SECTION                      │
│ ① Application Review                    │
│ ② Shortlist Notification                │
│ ③ Audition                              │
│ ④ Final Casting                         │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ IMPORTANT REMINDERS (Amber box)         │
│ ✓ Confirmation email sent               │
│ ✓ Check spam folder                     │
│ ✓ Keep phone available                  │
│ ✓ Only shortlisted contacted            │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ CONTACT INFO                            │
│ Email, Address, Phone                   │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ ACTION BUTTONS                          │
│ [🖨️ Print Confirmation]                 │
│ [← Return to Home]                      │
└─────────────────────────────────────────┘
```

---

## Animation & Transitions

### Standard Transitions
```
Duration:   150ms - 300ms
Timing:     ease, ease-in-out
Properties: All, opacity, transform, background
```

### Specific Animations
```
Button hover:       Scale 1.05, shadow increase (200ms)
Button active:      Scale 0.98 (100ms)
File drag:          Scale 1.02, border highlight (200ms)
Progress bar:       Width transition (300ms)
Loading spinner:    Rotate infinite 1s linear
Input focus:        Ring appear, border change (150ms)
```

### Hover Effects
```
Cards:      Shadow increase, slight lift
Buttons:    Scale/opacity change
Links:      Color change, underline appear
Inputs:     Border color, ring appear
Images:     Scale 1.05 on hover
```

---

## Icons & Visual Elements

### Icon Sizes
```
Small:   16px (inline text)
Medium:  24px (buttons, inputs)
Large:   48px (section headers)
XLarge:  64px (hero section)
```

### Icon Colors
```
Primary:   #1e3a8a (navy blue)
Gold:      #d97706 (accent)
Gray:      #64748b (secondary text)
White:     #ffffff (on dark backgrounds)
Red:       #ef4444 (errors)
Green:     #10b981 (success)
```

### Common Icons
```
Upload:     Arrow up in cloud
Success:    Checkmark in circle
Error:      Exclamation mark
Info:       Information circle
Spinner:    Rotating circle
Menu:       Hamburger icon (mobile)
Close:      X icon
Arrow:      Right/left arrow
```

---

## Accessibility Standards

### Color Contrast
- Text on background: 4.5:1 minimum
- Large text: 3:1 minimum
- Interactive elements: 3:1 minimum

### Focus States
```
Outline:     2px solid primary color
Offset:      2px
Visible:     On all interactive elements
```

### Text
- Minimum 14px font size
- Line height: 1.6+ for body text
- Color contrast: WCAG AA minimum

---

## Print Styles

```
Background:  White only
Colors:      Simplified, print-optimized
Headings:    Bold, dark color
Links:       Underlined, dark color
Button:      Border instead of background
Shadows:     Removed
```

---

## Mobile Optimizations

```
Touch Targets:  Minimum 44x44px
Spacing:        Increased 50% on mobile
Font Size:      16px minimum for inputs
Columns:        1 column, full width
Padding:        16px sides on mobile
Modals:         Full-screen on mobile
```

---

**Design System Version:** 1.0  
**Last Updated:** November 2024  
**Status:** Production Ready

