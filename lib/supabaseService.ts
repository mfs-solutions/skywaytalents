import { supabase } from '../supabase';
import { FormData } from '../types';

interface UploadProgressCallback {
  (field: string, progress: number): void;
}

/**
 * Generate UUID v4 (simple implementation for browser)
 */
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Submit a complete application to Supabase
 * Handles form data storage and file uploads
 */
export async function submitApplicationToSupabase(
  formData: FormData,
  onUploadProgress?: UploadProgressCallback
): Promise<string> {
  try {
    // Generate unique application ID
    const applicationId = generateUUID();

    // Prepare application record
    const applicationRecord = {
      id: applicationId,
      full_name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      date_of_birth: formData.dateOfBirth,
      age_group: formData.ageGroup,
      ethnicity: formData.ethnicity,
      height: formData.measurements.height,
      weight: formData.measurements.weight,
      hair_colour: formData.measurements.hairColour,
      eye_colour: formData.measurements.eyeColour,
      skin_tone: formData.measurements.skinTone,
      experience: formData.experience,
      casting_role: formData.castingRole,
      driving_license: formData.drivingLicense,
      own_car: formData.ownCar,
      available_from_date: formData.availableFromDate,
      content_comfort_nude: formData.contentComfort.nude,
      content_comfort_underwear: formData.contentComfort.underwear,
      content_comfort_violent: formData.contentComfort.violent,
      content_comfort_romantic: formData.contentComfort.romantic,
      content_comfort_alcohol: formData.contentComfort.alcohol,
      additional_info: formData.additionalInfo,
      terms_accepted: formData.termsAccepted,
      headshot_count: formData.portfolio.headshot.length,
      full_body_count: formData.portfolio.fullBody.length,
      video_uploaded: formData.portfolio.profileVideo.length > 0,
    };

    // Insert application record
    const { error: insertError } = await supabase
      .from('applications')
      .insert([applicationRecord]);

    if (insertError) {
      throw new Error(`Failed to insert application: ${insertError.message}`);
    }

    // Upload headshot files
    if (formData.portfolio.headshot.length > 0) {
      await uploadFiles(
        applicationId,
        'headshot',
        formData.portfolio.headshot,
        onUploadProgress
      );
    }

    // Upload full body files
    if (formData.portfolio.fullBody.length > 0) {
      await uploadFiles(
        applicationId,
        'full_body',
        formData.portfolio.fullBody,
        onUploadProgress
      );
    }

    // Upload video file
    if (formData.portfolio.profileVideo.length > 0) {
      await uploadFiles(
        applicationId,
        'video',
        formData.portfolio.profileVideo,
        onUploadProgress
      );
    }

    return applicationId;
  } catch (error) {
    console.error('Supabase submission error:', error);
    throw error;
  }
}

/**
 * Upload files to Supabase storage and create file records
 */
async function uploadFiles(
  applicationId: string,
  fileType: 'headshot' | 'full_body' | 'video',
  files: File[],
  onUploadProgress?: UploadProgressCallback
): Promise<void> {
  const totalFiles = files.length;
  let uploadedCount = 0;

  for (const file of files) {
    try {
      // Generate unique file path
      const fileExtension = file.name.split('.').pop();
      const fileName = `${applicationId}/${fileType}/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExtension}`;

      // Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from('applications')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        throw new Error(`Failed to upload file: ${uploadError.message}`);
      }

      // Create file record in database
      const { error: recordError } = await supabase
        .from('application_files')
        .insert([
          {
            application_id: applicationId,
            file_type: fileType,
            file_path: fileName,
            file_name: file.name,
            file_size: file.size,
            mime_type: file.type,
          },
        ]);

      if (recordError) {
        throw new Error(`Failed to create file record: ${recordError.message}`);
      }

      uploadedCount++;
      const progress = Math.round((uploadedCount / totalFiles) * 100);
      onUploadProgress?.(fileType, progress);
    } catch (error) {
      console.error(`Error uploading file to Supabase:`, error);
      throw error;
    }
  }
}

/**
 * Retrieve application details by ID
 */
export async function getApplicationById(applicationId: string) {
  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .eq('id', applicationId)
    .single();

  if (error) {
    throw new Error(`Failed to fetch application: ${error.message}`);
  }

  return data;
}

/**
 * Retrieve all files for an application
 */
export async function getApplicationFiles(applicationId: string) {
  const { data, error } = await supabase
    .from('application_files')
    .select('*')
    .eq('application_id', applicationId);

  if (error) {
    throw new Error(`Failed to fetch application files: ${error.message}`);
  }

  return data;
}

/**
 * Get a public URL for a stored file
 */
export function getFileUrl(filePath: string): string {
  const { data } = supabase.storage
    .from('applications')
    .getPublicUrl(filePath);

  return data.publicUrl;
}

/**
 * Update application submission status
 */
export async function updateApplicationStatus(
  applicationId: string,
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected',
  notes?: string
) {
  const { error } = await supabase
    .from('applications')
    .update({
      submission_status: status,
      notes: notes || null,
    })
    .eq('id', applicationId);

  if (error) {
    throw new Error(`Failed to update application status: ${error.message}`);
  }
}

/**
 * List all applications (admin function)
 */
export async function listApplications(
  limit: number = 50,
  offset: number = 0,
  filters?: {
    status?: string;
    ageGroup?: string;
  }
) {
  let query = supabase
    .from('applications')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (filters?.status) {
    query = query.eq('submission_status', filters.status);
  }

  if (filters?.ageGroup) {
    query = query.eq('age_group', filters.ageGroup);
  }

  const { data, error, count } = await query;

  if (error) {
    throw new Error(`Failed to list applications: ${error.message}`);
  }

  return { applications: data || [], total: count || 0 };
}

/**
 * Delete an application and all its files
 */
export async function deleteApplication(applicationId: string): Promise<void> {
  try {
    // Get all files for the application
    const files = await getApplicationFiles(applicationId);

    // Delete all files from storage
    if (files.length > 0) {
      const filePaths = files.map((f) => f.file_path);
      await supabase.storage.from('applications').remove(filePaths);
    }

    // Delete file records
    await supabase
      .from('application_files')
      .delete()
      .eq('application_id', applicationId);

    // Delete application record
    await supabase
      .from('applications')
      .delete()
      .eq('id', applicationId);
  } catch (error) {
    console.error('Error deleting application:', error);
    throw error;
  }
}

/**
 * Export applications as CSV (admin function)
 */
export async function exportApplicationsAsCSV(
  filters?: {
    status?: string;
    ageGroup?: string;
  }
): Promise<string> {
  const { applications } = await listApplications(10000, 0, filters);

  if (applications.length === 0) {
    return '';
  }

  // Create CSV header
  const headers = [
    'ID',
    'Full Name',
    'Email',
    'Phone',
    'Date of Birth',
    'Age Group',
    'Ethnicity',
    'Height',
    'Weight',
    'Hair Colour',
    'Eye Colour',
    'Skin Tone',
    'Experience',
    'Casting Role',
    'Driving License',
    'Own Car',
    'Available From',
    'Content Comfort - Nude',
    'Content Comfort - Underwear',
    'Content Comfort - Violent',
    'Content Comfort - Romantic',
    'Content Comfort - Alcohol',
    'Headshots Uploaded',
    'Full Body Uploaded',
    'Video Uploaded',
    'Status',
    'Created At',
  ];

  // Create CSV rows
  const rows = applications.map((app: any) => [
    app.id,
    `"${app.full_name}"`,
    app.email,
    app.phone,
    app.date_of_birth,
    app.age_group,
    app.ethnicity,
    app.height,
    app.weight,
    app.hair_colour,
    app.eye_colour,
    app.skin_tone,
    `"${app.experience}"`,
    app.casting_role,
    app.driving_license,
    app.own_car,
    app.available_from_date,
    app.content_comfort_nude,
    app.content_comfort_underwear,
    app.content_comfort_violent,
    app.content_comfort_romantic,
    app.content_comfort_alcohol,
    app.headshot_count,
    app.full_body_count,
    app.video_uploaded,
    app.submission_status,
    new Date(app.created_at).toLocaleString(),
  ]);

  // Combine headers and rows
  const csv = [
    headers.join(','),
    ...rows.map((row) => row.join(',')),
  ].join('\n');

  return csv;
}
