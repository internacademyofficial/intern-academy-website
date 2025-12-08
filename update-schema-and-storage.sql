-- Add linkedin_url column to internship_applications table
ALTER TABLE internship_applications 
ADD COLUMN IF NOT EXISTS linkedin_url TEXT;

-- Create a storage bucket for resumes if it doesn't exist
-- Note: Creating buckets via SQL is specific to Supabase's storage schema
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', true)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload files to the 'resumes' bucket
CREATE POLICY "Allow authenticated uploads"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'resumes');

-- Allow public access to view resumes (or restrict to authenticated if preferred)
CREATE POLICY "Allow public view"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'resumes');
