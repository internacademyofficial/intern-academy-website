-- ========================================
-- AUTHENTICATION SCHEMA UPDATE
-- Run this in Supabase SQL Editor
-- ========================================

-- Add user_id column to student_registrations table
ALTER TABLE student_registrations 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_student_user_id ON student_registrations(user_id);

-- Make email nullable (since it's also in auth.users)
ALTER TABLE student_registrations 
ALTER COLUMN email DROP NOT NULL;

-- Add unique constraint on user_id
ALTER TABLE student_registrations
ADD CONSTRAINT unique_user_id UNIQUE (user_id);

-- Verify the changes
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'student_registrations'
ORDER BY ordinal_position;
