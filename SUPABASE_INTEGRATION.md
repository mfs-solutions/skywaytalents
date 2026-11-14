# Supabase Backend Integration Guide

## Overview

This guide explains how to set up and use Supabase as the backend for the Sky Way Talents casting application. Supabase is an open-source Firebase alternative that provides:

- **PostgreSQL Database** for storing application data
- **File Storage** for managing images and videos
- **Row Level Security (RLS)** for access control
- **Real-time Capabilities** (optional)
- **Admin Dashboard** for managing applications

## Table of Contents

1. [Setup Instructions](#setup-instructions)
2. [Database Schema](#database-schema)
3. [File Upload Configuration](#file-upload-configuration)
4. [Frontend Integration](#frontend-integration)
5. [API Functions](#api-functions)
6. [Admin Dashboard Usage](#admin-dashboard-usage)
7. [Environment Variables](#environment-variables)
8. [Troubleshooting](#troubleshooting)

---

## Setup Instructions

### Step 1: Create a Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Click **"New Project"**
3. Enter project details:
   - **Name**: `skywaytalents` (or your preference)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to your users (e.g., `eu-west-1` for UK)
4. Click **"Create new project"** and wait for initialization (2-5 minutes)

### Step 2: Get Your API Keys

1. In Supabase Dashboard, go to **Settings > API**
2. Copy the following values:
   - **Project URL** (under "Project URL")
   - **anon public key** (under "Project API keys")
3. Save these for Step 3

### Step 3: Create Environment Variables

1. Copy the example file:
   ```bash
   cp .env.supabase.example .env.local
   ```

2. Edit `.env.local` and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

3. **IMPORTANT**: Never commit `.env.local` to git. It's already in `.gitignore`.

### Step 4: Set Up Database Schema

1. In Supabase Dashboard, go to **SQL Editor**
2. Click **"New Query"**
3. Copy the entire contents of `SUPABASE_SETUP.sql`
4. Paste into the SQL editor
5. Click **"Run"** to execute
6. Verify tables were created: Go to **Table Editor** and confirm you see:
   - `applications`
   - `application_files`
   - `audit_log`

### Step 5: Configure Storage Bucket

1. Go to **Storage** in Supabase Dashboard
2. Click **"Create a new bucket"**
3. Enter bucket name: `applications`
4. **IMPORTANT**: Leave it as **Private** (we'll set policies)
5. Set max file size: **104857600 bytes** (100MB for videos)
6. Click **"Create bucket"**

### Step 6: Set Up Storage Policies

1. Click on the **`applications`** bucket
2. Go to the **"Policies"** tab
3. Click **"New policy"** and select **"For INSERT"**
   - Policy name: `Allow public uploads`
   - Click **"Review"** and ensure it says "Allow public uploads"
   - Click **"Save policy"**

4. Click **"New policy"** and select **"For SELECT"**
   - Policy name: `Allow public read access`
   - Click **"Review"** and ensure it says "Allow public read access"
   - Click **"Save policy"**

---

## Database Schema

### `applications` Table

Stores all casting application submissions with the following columns:

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Unique application ID (auto-generated) |
| `full_name` | VARCHAR | Applicant's full name |
| `email` | VARCHAR | Contact email |
| `phone` | VARCHAR | Contact phone number |
| `date_of_birth` | DATE | Date of birth |
| `age_group` | VARCHAR | One of: `18-25`, `35-45`, `45+` |
| `ethnicity` | VARCHAR | Ethnic background |
| `height` | VARCHAR | Height (e.g., "5'8" or 173cm) |
| `weight` | VARCHAR | Weight (e.g., "70kg or 154lbs") |
| `hair_colour` | VARCHAR | Hair color |
| `eye_colour` | VARCHAR | Eye color |
| `skin_tone` | VARCHAR | Skin tone |
| `experience` | TEXT | Acting experience description |
| `casting_role` | VARCHAR | Role being applied for |
| `driving_license` | BOOLEAN | Has UK driving license |
| `own_car` | BOOLEAN | Owns a car |
| `available_from_date` | DATE | Date availability starts |
| `content_comfort_*` | BOOLEAN | Content type comfort flags (5 total) |
| `additional_info` | TEXT | Extra information |
| `headshot_count` | INTEGER | Number of headshots uploaded |
| `full_body_count` | INTEGER | Number of full body shots uploaded |
| `video_uploaded` | BOOLEAN | Whether profile video was uploaded |
| `terms_accepted` | BOOLEAN | Accepted terms and conditions |
| `submission_status` | VARCHAR | One of: `pending`, `reviewed`, `shortlisted`, `rejected` |
| `notes` | TEXT | Admin notes |
| `created_at` | TIMESTAMP | When application was submitted |
| `updated_at` | TIMESTAMP | Last update timestamp |

### `application_files` Table

Stores metadata for all uploaded files:

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Unique file record ID |
| `application_id` | UUID | Foreign key to `applications` |
| `file_type` | VARCHAR | One of: `headshot`, `full_body`, `video` |
| `file_path` | VARCHAR | Path in storage bucket |
| `file_name` | VARCHAR | Original filename |
| `file_size` | BIGINT | File size in bytes |
| `mime_type` | VARCHAR | File MIME type (e.g., `image/jpeg`) |
| `uploaded_at` | TIMESTAMP | Upload timestamp |

### `audit_log` Table

Tracks all admin actions on applications:

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Unique log entry ID |
| `application_id` | UUID | Foreign key to `applications` |
| `action` | VARCHAR | Action performed (e.g., `status_updated`) |
| `previous_value` | TEXT | Previous value |
| `new_value` | TEXT | New value |
| `performed_by` | VARCHAR | User who performed action |
| `created_at` | TIMESTAMP | When action was performed |

---

## File Upload Configuration

### Storage Structure

Files are organized in the `applications` bucket as follows:

```
applications/
├── {application-id}/
│   ├── headshot/
│   │   ├── 1700000000000_abc123.jpg
│   │   ├── 1700000001000_def456.jpg
│   │   └── ...
│   ├── full_body/
│   │   ├── 1700000002000_ghi789.jpg
│   │   └── ...
│   └── video/
│       └── 1700000003000_vid000.mp4
```

### File Size Limits

- **Headshots**: 10MB per file
- **Full Body**: 10MB per file  
- **Profile Video**: 100MB per file
- **Bucket Total**: 100GB (default Supabase limit)

### Supported File Types

**Images**: `jpeg`, `jpg`, `png`, `gif`, `webp`
**Video**: `mp4`, `quicktime`, `avi`, `mov`, `webm`

---

## Frontend Integration

### How Data Flows

```
User Fill Form
    ↓
Frontend Validation
    ↓
Call submitApplicationToSupabase()
    ↓
Insert Application Record
    ↓
Upload Files (with progress tracking)
    ↓
Create File Metadata Records
    ↓
Return Application ID
    ↓
Show Success Page
```

### Using the API

The frontend uses `lib/supabaseService.ts` for all Supabase operations:

```typescript
import { submitApplicationToSupabase } from './lib/supabaseService';

// Submit a completed application
const applicationId = await submitApplicationToSupabase(
  formData,
  (field, progress) => {
    console.log(`Uploading ${field}: ${progress}%`);
  }
);

console.log(`Application submitted with ID: ${applicationId}`);
```

### Form Component Integration

The `ApplicationWrapper.tsx` automatically handles:
- Form data collection across 9 steps
- File uploads to Supabase
- Progress tracking with callbacks
- Error handling and user feedback
- Success confirmation with application ID

---

## API Functions

### `submitApplicationToSupabase(formData, onUploadProgress?)`

**Purpose**: Submit a complete application with all files to Supabase

**Parameters**:
- `formData: FormData` - Complete form data object
- `onUploadProgress?: (field: string, progress: number) => void` - Progress callback

**Returns**: `Promise<string>` - Application ID

**Example**:
```typescript
try {
  const appId = await submitApplicationToSupabase(
    formData,
    (field, progress) => {
      setUploadProgress({ [field]: progress });
    }
  );
  console.log(`Submitted with ID: ${appId}`);
} catch (error) {
  console.error('Submission failed:', error);
}
```

### `getApplicationById(applicationId)`

**Purpose**: Retrieve application details (for admin panel)

**Parameters**:
- `applicationId: string` - UUID of application

**Returns**: `Promise<Application>` - Application record

### `getApplicationFiles(applicationId)`

**Purpose**: Get all files uploaded for an application

**Parameters**:
- `applicationId: string` - UUID of application

**Returns**: `Promise<ApplicationFile[]>` - Array of file records

### `getFileUrl(filePath)`

**Purpose**: Get public URL for a stored file

**Parameters**:
- `filePath: string` - File path in storage (e.g., `app-id/headshot/file.jpg`)

**Returns**: `string` - Public URL to file

### `updateApplicationStatus(applicationId, status, notes?)`

**Purpose**: Update application status (admin only)

**Parameters**:
- `applicationId: string` - UUID of application
- `status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected'` - New status
- `notes?: string` - Optional admin notes

**Returns**: `Promise<void>`

### `listApplications(limit?, offset?, filters?)`

**Purpose**: List applications with pagination (admin only)

**Parameters**:
- `limit?: number` - Results per page (default: 50)
- `offset?: number` - Starting position (default: 0)
- `filters?: { status?: string, ageGroup?: string }` - Optional filters

**Returns**: `Promise<{ applications: Application[], total: number }>`

### `deleteApplication(applicationId)`

**Purpose**: Delete application and all associated files

**Parameters**:
- `applicationId: string` - UUID of application

**Returns**: `Promise<void>`

### `exportApplicationsAsCSV(filters?)`

**Purpose**: Export applications as CSV (admin only)

**Parameters**:
- `filters?: { status?: string, ageGroup?: string }` - Optional filters

**Returns**: `Promise<string>` - CSV formatted string

---

## Admin Dashboard Usage

### Viewing Applications

1. Go to Supabase Dashboard **Table Editor**
2. Select the **`applications`** table
3. View all submitted applications with filters available for:
   - Age group
   - Submission status
   - Date range
   - Ethnicity

### Filtering by Status

Click the filter icon and select:
- **pending**: Not yet reviewed
- **reviewed**: Reviewed by admin
- **shortlisted**: Invited to interview
- **rejected**: Not selected

### Viewing Uploaded Files

1. Go to **Storage > applications**
2. Browse by application ID folder
3. Download files for review
4. Files are organized by type: `headshot/`, `full_body/`, `video/`

### Updating Application Status

1. Open **Table Editor > applications**
2. Find the application
3. Click to edit
4. Update `submission_status` field
5. Add notes if needed in `notes` field
6. Click **Save**

### Exporting Data

To export applications:

1. **Via Admin API** (if built):
   ```typescript
   const csv = await exportApplicationsAsCSV({
     status: 'shortlisted',
     ageGroup: '18-25'
   });
   ```

2. **Via Supabase Dashboard**:
   - Go to **Table Editor > applications**
   - Click the three dots menu
   - Select **Export**
   - Choose format (CSV recommended)

---

## Environment Variables

### Required (Frontend)

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Optional (Backend/Admin)

```env
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**SECURITY WARNING**: Never expose the service role key in frontend code or commit it to git!

---

## Troubleshooting

### Common Issues

#### 1. "Missing Supabase environment variables"

**Problem**: Application fails to initialize

**Solution**:
- Check `.env.local` file exists and has correct keys
- Verify `VITE_SUPABASE_URL` format: `https://xxxx.supabase.co`
- Ensure keys have no extra spaces or quotes
- Restart development server after changing `.env.local`

#### 2. "Failed to insert application"

**Problem**: Application data won't save

**Solution**:
- Check database table exists: Go to Supabase **Table Editor**
- Verify RLS policies allow INSERT: Check **applications** table Policies tab
- Check browser console for specific error message
- Verify database quota hasn't been exceeded

#### 3. "Failed to upload file"

**Problem**: Images/videos won't upload

**Solution**:
- Check storage bucket exists and is named `applications`
- Verify bucket policies allow uploads (see Storage Policies section)
- Check file size doesn't exceed limits (10MB images, 100MB video)
- Check storage quota hasn't been exceeded
- Try uploading from Supabase Storage UI to test bucket

#### 4. Files upload but don't appear in storage

**Problem**: Upload succeeds but files missing

**Solution**:
- Check storage bucket name is exactly `applications` (case-sensitive)
- Go to **Storage > applications** in Supabase
- Verify you can see application ID folders
- Check file size - very small uploads may not appear immediately
- Wait 5 seconds and refresh the browser

#### 5. "CORS error" when uploading files

**Problem**: JavaScript console shows CORS error

**Solution**:
- Go to Supabase **Project Settings > API > CORS**
- Verify your application domain is in allowed list
- For development: `http://localhost:5173` should be allowed
- For production: Add your deployment domain
- Click **Update** after adding domains

#### 6. Application ID not returned after submission

**Problem**: Success page doesn't show application ID

**Solution**:
- Check browser console for errors
- Verify application was actually inserted (check Database Table Editor)
- Check file uploads completed (check Storage for application folder)
- Try submission again with different email
- Check browser network tab for failed requests

### Testing Your Setup

#### Test 1: Database Connection
```typescript
import { supabase } from './supabase';

// Test connection
const { data, error } = await supabase
  .from('applications')
  .select('*')
  .limit(1);

console.log(error ? 'Connection failed' : 'Connection OK');
```

#### Test 2: Storage Upload
```typescript
const testFile = new File(['test'], 'test.txt', { type: 'text/plain' });
const { error } = await supabase.storage
  .from('applications')
  .upload('test/test.txt', testFile);

console.log(error ? 'Upload failed' : 'Upload OK');
```

#### Test 3: Full Submission
1. Fill out form completely
2. Upload all required files
3. Submit application
4. Check:
   - Success page displays application ID
   - Supabase Table Editor shows new record in `applications`
   - Files appear in Storage bucket

### Performance Optimization

**Database**:
- Indexes are created on frequently queried columns
- Keep `applications` table cleaned up (archive old records)

**Storage**:
- Compress images before upload (reduce file size)
- Consider re-encoding video to H.264 for better compression
- Delete test/abandoned uploads to save storage quota

**Network**:
- Upload progress shows real-time feedback to users
- Consider adding retry logic for failed uploads
- Test with various file sizes and connection speeds

---

## Security Best Practices

1. **Never commit `.env.local`** - Use `.gitignore` (already configured)
2. **Rotate API keys regularly** - In Supabase Settings > API
3. **Use Row Level Security** - Configured in SUPABASE_SETUP.sql
4. **Validate file types** - Frontend validates MIME types
5. **Set file size limits** - Enforced at storage level
6. **Audit admin actions** - All changes logged in `audit_log` table
7. **Use service role key only in backend** - Never in frontend code
8. **Enable password authentication** - Optional for admin access

---

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Client Library](https://supabase.com/docs/reference/javascript)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Storage Policies Guide](https://supabase.com/docs/guides/storage/security/access-control)

---

**Last Updated**: November 2026
**Version**: 1.0
