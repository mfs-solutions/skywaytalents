# Supabase Backend Implementation - Complete Documentation

## 📋 Table of Contents

1. [Setup Summary](#setup-summary)
2. [Database Schema](#database-schema)
3. [API Integration](#api-integration)
4. [File Uploads](#file-uploads)
5. [Admin Functions](#admin-functions)
6. [Deployment](#deployment)
7. [Cost Optimization](#cost-optimization)
8. [FAQ](#faq)

---

## Setup Summary

### What Was Implemented

The Sky Way Talents casting application now has a complete Supabase backend integration:

✅ **Database Tables:**
- `applications` - Stores all casting applications
- `application_files` - Tracks uploaded media files
- `audit_log` - Records all admin actions

✅ **Storage:**
- `applications` bucket - Secure file storage for images and videos

✅ **API Layer:**
- `lib/supabaseService.ts` - Complete service for all database operations

✅ **Frontend Integration:**
- ApplicationWrapper updated to use Supabase
- Form submission to Supabase with file uploads

✅ **Environment Configuration:**
- `.env.local` template for API credentials
- Automatic error handling for missing config

### Files Added

```
supabase.ts                      - Supabase client initialization
lib/
├── supabaseService.ts          - API service functions
SUPABASE_SETUP.sql              - Database schema SQL
SUPABASE_QUICK_START.md         - 5-minute setup guide
SUPABASE_INTEGRATION.md         - Complete documentation
.env.supabase.example           - Environment template
```

### Files Modified

```
components/steps/
├── ApplicationWrapper.tsx       - Updated to use Supabase service
package.json                    - Added @supabase/supabase-js dependency
README.md                       - Updated documentation
```

---

## Database Schema

### applications Table

**Purpose:** Stores all casting application submissions

**Columns:**

| Column | Type | Constraints | Purpose |
|--------|------|-----------|---------|
| id | UUID | PRIMARY KEY | Unique application identifier |
| full_name | VARCHAR(255) | NOT NULL | Applicant's full name |
| email | VARCHAR(255) | NOT NULL | Email address |
| phone | VARCHAR(20) | NOT NULL | Phone number |
| date_of_birth | DATE | NOT NULL | Date of birth |
| age_group | VARCHAR(10) | NOT NULL, CHECK | Age group (18-25, 35-45, 45+) |
| ethnicity | VARCHAR(50) | NOT NULL | Ethnic background |
| height | VARCHAR(50) | - | Height (e.g., "5'8" or 173cm) |
| weight | VARCHAR(50) | - | Weight (e.g., "70kg") |
| hair_colour | VARCHAR(50) | - | Hair color |
| eye_colour | VARCHAR(50) | - | Eye color |
| skin_tone | VARCHAR(50) | - | Skin tone |
| experience | TEXT | - | Acting experience description |
| casting_role | VARCHAR(255) | - | Role applied for |
| driving_license | BOOLEAN | DEFAULT FALSE | Has driving license |
| own_car | BOOLEAN | DEFAULT FALSE | Owns a car |
| available_from_date | DATE | - | Availability date |
| content_comfort_nude | BOOLEAN | DEFAULT FALSE | Comfortable with nude scenes |
| content_comfort_underwear | BOOLEAN | DEFAULT FALSE | Comfortable with underwear |
| content_comfort_violent | BOOLEAN | DEFAULT FALSE | Comfortable with violence |
| content_comfort_romantic | BOOLEAN | DEFAULT FALSE | Comfortable with romantic scenes |
| content_comfort_alcohol | BOOLEAN | DEFAULT FALSE | Comfortable with alcohol |
| additional_info | TEXT | - | Extra information |
| headshot_count | INTEGER | DEFAULT 0 | Number of headshots uploaded |
| full_body_count | INTEGER | DEFAULT 0 | Number of full body shots |
| video_uploaded | BOOLEAN | DEFAULT FALSE | Whether video was uploaded |
| terms_accepted | BOOLEAN | NOT NULL, DEFAULT FALSE | Accepted T&Cs |
| submission_status | VARCHAR(20) | DEFAULT 'pending', CHECK | Status (pending, reviewed, shortlisted, rejected) |
| notes | TEXT | - | Admin notes |
| created_at | TIMESTAMP | DEFAULT NOW() | Submission timestamp |
| updated_at | TIMESTAMP | DEFAULT NOW() | Last update timestamp |

**Indexes:**
- `applications_email` - Fast lookup by email
- `applications_age_group` - Filter by age group
- `applications_status` - Filter by submission status
- `applications_created_at` - Sort by submission date

### application_files Table

**Purpose:** Tracks all uploaded files (images, videos)

**Columns:**

| Column | Type | Constraints | Purpose |
|--------|------|-----------|---------|
| id | UUID | PRIMARY KEY | File record identifier |
| application_id | UUID | FOREIGN KEY, NOT NULL | Reference to applications |
| file_type | VARCHAR(20) | NOT NULL, CHECK | Type (headshot, full_body, video) |
| file_path | VARCHAR(512) | NOT NULL | Path in storage bucket |
| file_name | VARCHAR(255) | NOT NULL | Original filename |
| file_size | BIGINT | NOT NULL | File size in bytes |
| mime_type | VARCHAR(100) | - | MIME type (e.g., image/jpeg) |
| uploaded_at | TIMESTAMP | DEFAULT NOW() | Upload timestamp |

**Cascade Delete:** When an application is deleted, all associated files are deleted automatically.

### audit_log Table

**Purpose:** Track all admin actions for compliance and auditing

**Columns:**

| Column | Type | Constraints | Purpose |
|--------|------|-----------|---------|
| id | UUID | PRIMARY KEY | Log entry identifier |
| application_id | UUID | FOREIGN KEY, NOT NULL | Application affected |
| action | VARCHAR(100) | NOT NULL | Action performed |
| previous_value | TEXT | - | Previous value |
| new_value | TEXT | - | New value |
| performed_by | VARCHAR(255) | - | User who performed action |
| created_at | TIMESTAMP | DEFAULT NOW() | Timestamp |

---

## API Integration

### Supabase Client (`supabase.ts`)

Initializes the Supabase client with environment variables:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

**Errors if:**
- `VITE_SUPABASE_URL` is not set
- `VITE_SUPABASE_ANON_KEY` is not set

### Service Layer (`lib/supabaseService.ts`)

Complete API layer for all Supabase operations:

#### submitApplicationToSupabase()

Submits complete application with files:

```typescript
const applicationId = await submitApplicationToSupabase(
  formData,
  (field, progress) => console.log(`${field}: ${progress}%`)
);
```

**Process:**
1. Generate unique UUID for application
2. Insert application record into database
3. Upload headshot files (if any)
4. Upload full body files (if any)
5. Upload video file (if any)
6. Create file metadata records

**Returns:** Application ID (UUID)

**Throws:** Error if any step fails

#### getApplicationById()

Retrieve application details:

```typescript
const app = await getApplicationById('application-uuid');
// Returns: { id, full_name, email, ... }
```

#### getApplicationFiles()

Get all files for an application:

```typescript
const files = await getApplicationFiles('application-uuid');
// Returns: [{ id, file_path, file_name, ... }, ...]
```

#### getFileUrl()

Get public URL for a file:

```typescript
const url = getFileUrl('application-id/headshot/file.jpg');
// Returns: https://...supabase.co/storage/v1/object/public/applications/...
```

#### updateApplicationStatus()

Update application status (admin function):

```typescript
await updateApplicationStatus(
  'application-uuid',
  'shortlisted',
  'Strong candidate - invite for interview'
);
```

#### listApplications()

List applications with pagination:

```typescript
const { applications, total } = await listApplications(
  50,                           // limit
  0,                            // offset
  { status: 'pending', ageGroup: '18-25' }  // filters
);
```

#### deleteApplication()

Delete application and all files:

```typescript
await deleteApplication('application-uuid');
```

#### exportApplicationsAsCSV()

Export applications as CSV:

```typescript
const csv = await exportApplicationsAsCSV({
  status: 'shortlisted',
  ageGroup: '18-25'
});

// Save to file
const blob = new Blob([csv], { type: 'text/csv' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'applications.csv';
a.click();
```

---

## File Uploads

### Storage Structure

Files are organized in the `applications` bucket:

```
applications/
├── [application-uuid-1]/
│   ├── headshot/
│   │   ├── 1700000000000_abc123.jpg
│   │   ├── 1700000001000_def456.jpg
│   │   └── 1700000002000_ghi789.jpg
│   ├── full_body/
│   │   ├── 1700000003000_jkl012.jpg
│   │   ├── 1700000004000_mno345.jpg
│   │   └── 1700000005000_pqr678.jpg
│   └── video/
│       └── 1700000006000_vid000.mp4
├── [application-uuid-2]/
│   ├── headshot/
│   │   └── ...
│   └── ...
```

### File Upload Process

1. **Validation** (Frontend)
   - Check file type (MIME type)
   - Check file size against limits
   - Display user-friendly error messages

2. **Upload** (To Supabase Storage)
   - Generate unique filename with timestamp
   - Upload to application-specific folder
   - Set cache control headers (3600s)
   - Handle upload errors

3. **Record** (In Database)
   - Create file metadata record
   - Store original filename, size, MIME type
   - Link to application via foreign key
   - Record upload timestamp

4. **Tracking**
   - Call progress callback after each file
   - Calculate progress percentage
   - Display to user in real-time

### File Size Limits

- **Headshots**: 10MB per file
- **Full Body**: 10MB per file
- **Video**: 100MB per file
- **Bucket Total**: 100GB (default)

### Supported File Types

**Images:**
- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)
- WebP (.webp)

**Video:**
- MP4 (.mp4)
- QuickTime (.mov)
- AVI (.avi)
- WebM (.webm)

---

## Admin Functions

### Viewing Applications in Dashboard

1. Go to **Table Editor > applications**
2. View all submissions with filters:
   - By status (pending, reviewed, shortlisted, rejected)
   - By age group (18-25, 35-45, 45+)
   - By date range
   - By ethnicity

### Updating Status

```typescript
import { updateApplicationStatus } from './lib/supabaseService';

// Mark as shortlisted
await updateApplicationStatus(
  'app-id-123',
  'shortlisted',
  'Excellent headshots - invite for callback'
);

// Mark as rejected
await updateApplicationStatus(
  'app-id-456',
  'rejected',
  'Role requirements not met'
);
```

### Exporting Applications

**Option 1: Use the API**
```typescript
const csv = await exportApplicationsAsCSV();
// Download or process CSV
```

**Option 2: Via Supabase Dashboard**
1. Table Editor > applications
2. Click three-dot menu
3. Select "Export"
4. Choose CSV format

### Filtering by Age Group

```typescript
// Get all 18-25 applications
const { applications } = await listApplications(
  50, 0, { ageGroup: '18-25' }
);

// Get all shortlisted applications
const { applications } = await listApplications(
  50, 0, { status: 'shortlisted' }
);

// Get shortlisted 35-45 age group
const { applications } = await listApplications(
  50, 0, { status: 'shortlisted', ageGroup: '35-45' }
);
```

### Viewing Application Files

1. Go to **Storage > applications**
2. Click on application UUID folder
3. Browse files by type:
   - `headshot/` - All headshot images
   - `full_body/` - All full body images
   - `video/` - Profile video (if uploaded)
4. Download any file for review
5. Click three-dot menu to see file options

### Analytics & Reporting

**Built-in Views (Optional - can be created):**

```sql
-- Applications by age group
SELECT age_group, COUNT(*) as total FROM applications GROUP BY age_group;

-- Applications by status
SELECT submission_status, COUNT(*) as total FROM applications GROUP BY submission_status;

-- Top ethnicities
SELECT ethnicity, COUNT(*) as total FROM applications GROUP BY ethnicity ORDER BY total DESC;
```

---

## Deployment

### Environment Variables Required

For **production deployment** (AWS Amplify or other platforms):

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### AWS Amplify Configuration

See `AWS_AMPLIFY_DEPLOYMENT.md` for full instructions.

When deploying:

1. **Add environment variables** to Amplify console
2. **Build command** remains: `npm run build`
3. **Start command** remains: `npm run preview`
4. **Ensure Supabase database and storage are set up** before deploying

### Supabase Production Checklist

- [ ] Project created in Supabase
- [ ] PostgreSQL database initialized
- [ ] Database schema executed (SUPABASE_SETUP.sql)
- [ ] Storage bucket `applications` created and configured
- [ ] Storage policies configured for public uploads/downloads
- [ ] Environment variables set in Amplify
- [ ] Test form submission in production
- [ ] Verify files appear in storage
- [ ] Verify database records created

---

## Cost Optimization

### Free Tier (Development)

Supabase free tier includes:
- **Database**: 500MB
- **Storage**: 1GB
- **Bandwidth**: 2GB/month
- **API Requests**: Unlimited

Perfect for testing and small deployments.

### Paid Tier (Production)

Based on actual usage:

**Database:**
- $0.06 per GB per month
- Starts at $15/month (includes ~250GB)

**Storage:**
- $0.02 per GB per month
- Starts at $10/month (includes 100GB)

**Bandwidth:**
- $0.09 per GB
- Starts included with paid plan

### Optimization Tips

1. **Compress Images**
   - Use WebP format (20-30% smaller)
   - Compress before upload
   - Limit to necessary dimensions

2. **Video Optimization**
   - Use H.264 codec
   - Set appropriate bitrate
   - Limit resolution to 1080p

3. **Database**
   - Archive old records (100+ days old)
   - Clean up test submissions
   - Monitor storage usage

4. **Storage**
   - Delete unused test files
   - Set up lifecycle policies
   - Monitor bandwidth usage

### Monitoring

Check usage in Supabase Dashboard:
- **Settings > Billing** - View current usage
- **Settings > Database** - Monitor DB size
- **Storage > Storage** - Monitor storage usage
- **API > API Usage** - Monitor requests

---

## FAQ

### Q: What if I forget to set environment variables?

**A:** The application will show a clear error message:
> "Supabase configuration is missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment variables."

Just follow the instructions to add your keys to `.env.local`.

### Q: Can users delete their applications?

**A:** Currently, the frontend doesn't have a delete function. You can delete via Supabase Dashboard or add a backend endpoint if needed.

### Q: How long are files stored?

**A:** Files are stored indefinitely unless you delete them. There's no automatic expiration.

### Q: Can I access files from outside the app?

**A:** Yes! Use `getFileUrl()` to get public URLs. Files are downloadable via direct HTTP requests.

### Q: What if a file upload fails?

**A:** The user sees an error message. They can retry by going back and re-uploading. The form data is preserved.

### Q: Can I see who submitted an application?

**A:** Yes, use `created_at` timestamp in the applications table. IP addresses are not currently logged.

### Q: How do I backup my data?

**A:** Supabase has built-in backups:
- Free tier: 7-day retention
- Paid tier: 30-day retention
- Manual backups available in Settings > Backups

### Q: Can I add more fields to the form?

**A:** Yes! Update:
1. `types.ts` - Add field to FormData interface
2. Form step component - Add input field
3. `SUPABASE_SETUP.sql` - Add column to applications table
4. `lib/supabaseService.ts` - Map field to database column

### Q: How do I set up email notifications?

**A:** Use Supabase's Edge Functions or integrate with:
- SendGrid
- Mailgun
- AWS SES

Example with Supabase Functions (advanced topic).

### Q: Can I integrate with third-party CRMs?

**A:** Yes! The CSV export can be imported into:
- Salesforce
- HubSpot
- Pipedrive
- Any system accepting CSV

### Q: What's the difference between `anon` and `service_role` keys?

**A:**
- **Anon Key**: Use in frontend, limited permissions (INSERT/SELECT only)
- **Service Role Key**: Use in backend only, full permissions, NEVER expose

---

## Support & Resources

- **Supabase Docs**: https://supabase.com/docs
- **Supabase Community**: https://discord.supabase.com
- **PostgreSQL Docs**: https://www.postgresql.org/docs/
- **This Project Issues**: GitHub Issues

---

**Version:** 1.0  
**Last Updated:** November 2026  
**Maintained By:** Development Team
