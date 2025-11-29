-- 🚀 Intern Academy - Supabase Database Schema
-- Run this SQL in Supabase SQL Editor to create all tables and policies

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ========================================
-- 1. STUDENT REGISTRATIONS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS student_registrations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    college_name VARCHAR(255),
    graduation_year INTEGER,
    field_of_study VARCHAR(255),
    skills TEXT,
    interests TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- 2. COMPANY REGISTRATIONS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS company_registrations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    contact_person VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    website VARCHAR(255),
    industry VARCHAR(255),
    company_size VARCHAR(50),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- 3. CONTACT MESSAGES TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(255),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- 4. INTERNSHIP APPLICATIONS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS internship_applications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    internship_title VARCHAR(255) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    resume_url TEXT,
    cover_letter TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- 5. NEWSLETTER SUBSCRIPTIONS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- 6. COURSE ENROLLMENTS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS course_enrollments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    course_name VARCHAR(255) NOT NULL,
    course_category VARCHAR(100),
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- CREATE INDEXES FOR BETTER PERFORMANCE
-- ========================================
CREATE INDEX IF NOT EXISTS idx_student_email ON student_registrations(email);
CREATE INDEX IF NOT EXISTS idx_company_email ON company_registrations(email);
CREATE INDEX IF NOT EXISTS idx_contact_created ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscriptions(email);
CREATE INDEX IF NOT EXISTS idx_applications_status ON internship_applications(status);
CREATE INDEX IF NOT EXISTS idx_internship_applications_email ON internship_applications(email);
CREATE INDEX IF NOT EXISTS idx_course_enrollments_email ON course_enrollments(email);

-- ========================================
-- ENABLE ROW LEVEL SECURITY (RLS)
-- ========================================
ALTER TABLE student_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE internship_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_enrollments ENABLE ROW LEVEL SECURITY;

-- ========================================
-- DROP EXISTING POLICIES (if any)
-- ========================================
DROP POLICY IF EXISTS "Allow public insert student registrations" ON student_registrations;
DROP POLICY IF EXISTS "Allow public insert company registrations" ON company_registrations;
DROP POLICY IF EXISTS "Allow public insert contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Allow public insert internship applications" ON internship_applications;
DROP POLICY IF EXISTS "Allow public insert newsletter subscriptions" ON newsletter_subscriptions;
DROP POLICY IF EXISTS "Allow public insert course enrollments" ON course_enrollments;

-- ========================================
-- CREATE RLS POLICIES (Allow public inserts for forms)
-- ========================================

-- Students can register
CREATE POLICY "Allow public insert student registrations"
ON student_registrations FOR INSERT
TO anon
WITH CHECK (true);

-- Companies can register
CREATE POLICY "Allow public insert company registrations"
ON company_registrations FOR INSERT
TO anon
WITH CHECK (true);

-- Anyone can submit contact messages
CREATE POLICY "Allow public insert contact messages"
ON contact_messages FOR INSERT
TO anon
WITH CHECK (true);

-- Anyone can apply for internships
CREATE POLICY "Allow public insert internship applications"
ON internship_applications FOR INSERT
TO anon
WITH CHECK (true);

-- Anyone can subscribe to newsletter
CREATE POLICY "Allow public insert newsletter subscriptions"
ON newsletter_subscriptions FOR INSERT
TO anon
WITH CHECK (true);

-- Anyone can enroll in courses
CREATE POLICY "Allow public insert course enrollments"
ON course_enrollments FOR INSERT
TO anon
WITH CHECK (true);

-- ========================================
-- SUCCESS MESSAGE
-- ========================================
DO $$ 
BEGIN 
    RAISE NOTICE '✅ Database setup complete!';
    RAISE NOTICE '🎉 All tables and policies created successfully.';
    RAISE NOTICE '📊 You can now start collecting data from your forms.';
END $$;
