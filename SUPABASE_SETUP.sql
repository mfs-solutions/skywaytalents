-- Sky Way Talents - Supabase Database Schema
-- This SQL creates all necessary tables and storage buckets for the casting application

-- ============================================
-- TABLE: applications
-- ============================================
-- Stores all casting application submissions
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  date_of_birth DATE NOT NULL,
  age_group VARCHAR(10) NOT NULL CHECK (age_group IN ('18-25', '35-45', '45+')),
  ethnicity VARCHAR(50) NOT NULL,
  
  -- Physical Characteristics
  height VARCHAR(50),
  weight VARCHAR(50),
  hair_colour VARCHAR(50),
  eye_colour VARCHAR(50),
  skin_tone VARCHAR(50),
  
  -- Experience & Availability
  experience TEXT,
  casting_role VARCHAR(255),
  driving_license BOOLEAN DEFAULT FALSE,
  own_car BOOLEAN DEFAULT FALSE,
  available_from_date DATE,
  
  -- Content Comfort (what types of content applicant is comfortable with)
  content_comfort_nude BOOLEAN DEFAULT FALSE,
  content_comfort_underwear BOOLEAN DEFAULT FALSE,
  content_comfort_violent BOOLEAN DEFAULT FALSE,
  content_comfort_romantic BOOLEAN DEFAULT FALSE,
  content_comfort_alcohol BOOLEAN DEFAULT FALSE,
  
  -- Additional Information
  additional_info TEXT,
  
  -- Portfolio Counts
  headshot_count INTEGER DEFAULT 0,
  full_body_count INTEGER DEFAULT 0,
  video_uploaded BOOLEAN DEFAULT FALSE,
  
  -- Terms & Conditions
  terms_accepted BOOLEAN DEFAULT FALSE NOT NULL,
  
  -- Application Status
  submission_status VARCHAR(20) DEFAULT 'pending' CHECK (submission_status IN ('pending', 'reviewed', 'shortlisted', 'rejected')),
  notes TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_applications_email ON public.applications(email);
CREATE INDEX IF NOT EXISTS idx_applications_age_group ON public.applications(age_group);
CREATE INDEX IF NOT EXISTS idx_applications_status ON public.applications(submission_status);
CREATE INDEX IF NOT EXISTS idx_applications_created_at ON public.applications(created_at DESC);

-- ============================================
-- TABLE: application_files
-- ============================================
-- Stores metadata for all uploaded files (images, videos)
CREATE TABLE IF NOT EXISTS public.application_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
  file_type VARCHAR(20) NOT NULL CHECK (file_type IN ('headshot', 'full_body', 'video')),
  file_path VARCHAR(512) NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  file_size BIGINT NOT NULL,
  mime_type VARCHAR(100),
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for efficient file retrieval
CREATE INDEX IF NOT EXISTS idx_application_files_app_id ON public.application_files(application_id);
CREATE INDEX IF NOT EXISTS idx_application_files_type ON public.application_files(file_type);
CREATE INDEX IF NOT EXISTS idx_application_files_uploaded_at ON public.application_files(uploaded_at DESC);

-- ============================================
-- TABLE: audit_log (Optional - for tracking admin actions)
-- ============================================
-- Tracks all changes to applications (admin reviews, status updates, etc.)
CREATE TABLE IF NOT EXISTS public.audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
  action VARCHAR(100) NOT NULL,
  previous_value TEXT,
  new_value TEXT,
  performed_by VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index for audit trails
CREATE INDEX IF NOT EXISTS idx_audit_log_app_id ON public.audit_log(application_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_created_at ON public.audit_log(created_at DESC);

-- ============================================
-- FUNCTIONS: Update timestamps
-- ============================================
-- Automatically update the updated_at timestamp when a record is modified
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to automatically update timestamps
DROP TRIGGER IF EXISTS update_applications_updated_at ON public.applications;
CREATE TRIGGER update_applications_updated_at
BEFORE UPDATE ON public.applications
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- RLS POLICIES (Row Level Security)
-- ============================================
-- Enable RLS on tables
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.application_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert applications (public form submission)
CREATE POLICY "Allow public to insert applications" ON public.applications
  FOR INSERT WITH CHECK (true);

-- Allow users to view their own applications (if using auth)
-- Modify this if you add authentication
CREATE POLICY "Applications are publicly viewable" ON public.applications
  FOR SELECT USING (true);

-- Allow anyone to view application files
CREATE POLICY "Allow public to view application files" ON public.application_files
  FOR SELECT USING (true);

-- ============================================
-- VIEWS: Useful aggregations
-- ============================================
-- View for application statistics by age group
CREATE OR REPLACE VIEW public.applications_by_age_group AS
SELECT 
  age_group,
  COUNT(*) as total_applications,
  COUNT(CASE WHEN submission_status = 'shortlisted' THEN 1 END) as shortlisted,
  COUNT(CASE WHEN submission_status = 'rejected' THEN 1 END) as rejected,
  COUNT(CASE WHEN submission_status = 'reviewed' THEN 1 END) as reviewed,
  COUNT(CASE WHEN submission_status = 'pending' THEN 1 END) as pending
FROM public.applications
GROUP BY age_group
ORDER BY age_group;

-- View for application statistics by status
CREATE OR REPLACE VIEW public.applications_by_status AS
SELECT 
  submission_status,
  COUNT(*) as total_count,
  COUNT(CASE WHEN driving_license = true THEN 1 END) as with_driving_license,
  COUNT(CASE WHEN own_car = true THEN 1 END) as with_own_car
FROM public.applications
GROUP BY submission_status
ORDER BY submission_status;

-- ============================================
-- STORAGE BUCKETS
-- ============================================
-- Note: These should be created via Supabase Dashboard or API
-- Create a storage bucket named 'applications' with the following settings:
-- - Bucket name: applications
-- - Public: false (set public access via policies as needed)
-- - File size limit: 104857600 (100MB for videos)

-- ============================================
-- STORAGE POLICIES
-- ============================================
-- After creating the bucket, set up these policies:

-- Allow public to upload files
-- INSERT INTO storage.objects (bucket_id, name, owner, metadata, path_tokens)
-- Note: Use Supabase Dashboard to configure storage policies for the 'applications' bucket

-- Example policy for storage (configure in dashboard):
-- - Allow public INSERT for applications/*
-- - Allow public SELECT for applications/*
