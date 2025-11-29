-- Update internship_applications table to include user_id
ALTER TABLE internship_applications 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_internship_applications_user_id ON internship_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_internship_applications_company ON internship_applications(company_name);

-- Add RLS policies for authenticated users to view their own applications
DROP POLICY IF EXISTS "Users can view own applications" ON internship_applications;
CREATE POLICY "Users can view own applications"
ON internship_applications FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Add RLS policy for authenticated users to insert their own applications
DROP POLICY IF EXISTS "Users can insert own applications" ON internship_applications;
CREATE POLICY "Users can insert own applications"
ON internship_applications FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Companies can view applications for their company (we'll need company_registrations to have user_id too)
ALTER TABLE company_registrations
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);

CREATE INDEX IF NOT EXISTS idx_company_user_id ON company_registrations(user_id);

-- Update student_registrations to include user_id reference
ALTER TABLE student_registrations
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);

CREATE INDEX IF NOT EXISTS idx_student_user_id ON student_registrations(user_id);

-- RLS for students to view/update their own profile
DROP POLICY IF EXISTS "Users can view own profile" ON student_registrations;
CREATE POLICY "Users can view own profile"
ON student_registrations FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own profile" ON student_registrations;
CREATE POLICY "Users can update own profile"
ON student_registrations FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own profile" ON student_registrations;
CREATE POLICY "Users can insert own profile"
ON student_registrations FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);
