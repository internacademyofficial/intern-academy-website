-- ========================================
-- COMPLETE RLS FIX FOR INTERN ACADEMY
-- Run this in Supabase SQL Editor
-- ========================================

-- STEP 1: Disable RLS temporarily
ALTER TABLE student_registrations DISABLE ROW LEVEL SECURITY;
ALTER TABLE company_registrations DISABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages DISABLE ROW LEVEL SECURITY;
ALTER TABLE internship_applications DISABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions DISABLE ROW LEVEL SECURITY;
ALTER TABLE course_enrollments DISABLE ROW LEVEL SECURITY;

-- STEP 2: Drop all existing policies
DROP POLICY IF EXISTS "Allow public insert student registrations" ON student_registrations;
DROP POLICY IF EXISTS "Allow public insert company registrations" ON company_registrations;
DROP POLICY IF EXISTS "Allow public insert contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Allow public insert internship applications" ON internship_applications;
DROP POLICY IF EXISTS "Allow public insert newsletter subscriptions" ON newsletter_subscriptions;
DROP POLICY IF EXISTS "Allow public insert course enrollments" ON course_enrollments;

-- STEP 3: Re-enable RLS
ALTER TABLE student_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE internship_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_enrollments ENABLE ROW LEVEL SECURITY;

-- STEP 4: Create correct policies with USING clause
CREATE POLICY "Allow public insert student registrations"
ON student_registrations
AS PERMISSIVE
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Allow public insert company registrations"
ON company_registrations
AS PERMISSIVE
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Allow public insert contact messages"
ON contact_messages
AS PERMISSIVE
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Allow public insert internship applications"
ON internship_applications
AS PERMISSIVE
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Allow public insert newsletter subscriptions"
ON newsletter_subscriptions
AS PERMISSIVE
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Allow public insert course enrollments"
ON course_enrollments
AS PERMISSIVE
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- STEP 5: Verify policies are correct
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE tablename IN (
    'student_registrations', 
    'company_registrations', 
    'contact_messages',
    'internship_applications',
    'newsletter_subscriptions',
    'course_enrollments'
)
ORDER BY tablename, policyname;

-- Success message
DO $$ 
BEGIN 
    RAISE NOTICE '✅ RLS policies updated successfully!';
    RAISE NOTICE '🔓 Tables now accept public inserts from anon users';
END $$;
