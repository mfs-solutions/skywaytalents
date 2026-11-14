import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. ' +
    'Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file or environment variables.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      applications: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          phone: string;
          date_of_birth: string;
          age_group: string;
          ethnicity: string;
          height: string;
          weight: string;
          hair_colour: string;
          eye_colour: string;
          skin_tone: string;
          experience: string;
          casting_role: string;
          driving_license: boolean;
          own_car: boolean;
          available_from_date: string;
          content_comfort_nude: boolean;
          content_comfort_underwear: boolean;
          content_comfort_violent: boolean;
          content_comfort_romantic: boolean;
          content_comfort_alcohol: boolean;
          additional_info: string;
          terms_accepted: boolean;
          headshot_count: number;
          full_body_count: number;
          video_uploaded: boolean;
          submission_status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected';
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['applications']['Row'], 'id' | 'created_at' | 'updated_at' | 'submission_status' | 'notes'>;
        Update: Partial<Database['public']['Tables']['applications']['Row']>;
      };
      application_files: {
        Row: {
          id: string;
          application_id: string;
          file_type: 'headshot' | 'full_body' | 'video';
          file_path: string;
          file_name: string;
          file_size: number;
          mime_type: string;
          uploaded_at: string;
        };
        Insert: Omit<Database['public']['Tables']['application_files']['Row'], 'id' | 'uploaded_at'>;
        Update: Partial<Database['public']['Tables']['application_files']['Row']>;
      };
    };
  };
};
