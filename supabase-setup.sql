-- ============================================================
-- INTERN ACADEMY — SUPABASE SCHEMA SETUP
-- Run this entire file in Supabase SQL Editor
-- Project: https://utwdwlnvempgfrfocrps.supabase.co
-- ============================================================

-- Enable UUID extension (usually already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- ============================================================
-- 1. STUDENT REGISTRATIONS
-- Stores all student profile data linked to auth.users
-- ============================================================
CREATE TABLE IF NOT EXISTS public.student_registrations (
    id                   UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id              UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name            TEXT NOT NULL,
    email                TEXT NOT NULL,
    phone                TEXT,
    college_name         TEXT,
    university           TEXT,
    field_of_study       TEXT,
    degree               TEXT,
    major                TEXT,
    current_year         TEXT,
    graduation_year      INTEGER,
    degree_start_date    DATE,
    degree_end_date      DATE,
    gpa                  NUMERIC(4,2),
    skills               TEXT,
    interests            TEXT,
    previous_internships TEXT,
    bio                  TEXT,
    linkedin_url         TEXT,
    github_url           TEXT,
    created_at           TIMESTAMPTZ DEFAULT NOW(),
    updated_at           TIMESTAMPTZ DEFAULT NOW()
);

-- Unique constraint: one profile per user
CREATE UNIQUE INDEX IF NOT EXISTS student_registrations_user_id_idx
    ON public.student_registrations(user_id);

-- Unique constraint: one registration per email
CREATE UNIQUE INDEX IF NOT EXISTS student_registrations_email_idx
    ON public.student_registrations(email);

-- Enable RLS
ALTER TABLE public.student_registrations ENABLE ROW LEVEL SECURITY;

-- Policy: users can read and update only their own record
CREATE POLICY "Students can view own profile"
    ON public.student_registrations FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Anyone can insert profile"
    ON public.student_registrations FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Students can update own profile"
    ON public.student_registrations FOR UPDATE
    USING (auth.uid() = user_id);


-- ============================================================
-- 2. COMPANY REGISTRATIONS
-- Stores company profiles linked to auth.users
-- ============================================================
CREATE TABLE IF NOT EXISTS public.company_registrations (
    id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id         UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    company_name    TEXT NOT NULL,
    contact_person  TEXT NOT NULL,
    email           TEXT NOT NULL UNIQUE,
    phone           TEXT,
    website         TEXT,
    industry        TEXT,
    company_size    TEXT,
    description     TEXT,
    status          TEXT DEFAULT 'pending',   -- pending | approved | rejected
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS company_registrations_user_id_idx
    ON public.company_registrations(user_id);

ALTER TABLE public.company_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Companies can view own profile"
    ON public.company_registrations FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Anyone can submit company registration"
    ON public.company_registrations FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Companies can update own profile"
    ON public.company_registrations FOR UPDATE
    USING (auth.uid() = user_id);


-- ============================================================
-- 3. INTERNSHIP APPLICATIONS
-- Students apply for internships; companies can see applicants
-- ============================================================
CREATE TABLE IF NOT EXISTS public.internship_applications (
    id                UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id           UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    student_name      TEXT NOT NULL,
    email             TEXT NOT NULL,
    phone             TEXT,
    internship_title  TEXT NOT NULL,
    company_name      TEXT NOT NULL,
    resume_url        TEXT,
    linkedin_url      TEXT,
    cover_letter      TEXT,
    status            TEXT DEFAULT 'pending',  -- pending | reviewing | accepted | rejected
    applied_at        TIMESTAMPTZ DEFAULT NOW(),
    updated_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS internship_applications_user_id_idx
    ON public.internship_applications(user_id);

CREATE INDEX IF NOT EXISTS internship_applications_company_idx
    ON public.internship_applications(company_name);

ALTER TABLE public.internship_applications ENABLE ROW LEVEL SECURITY;

-- Students can see, insert, and manage their own applications
CREATE POLICY "Students can view own applications"
    ON public.internship_applications FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can apply"
    ON public.internship_applications FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Companies can view applications for their company name
-- (requires company email matching — simplified to allow authenticated full read for now)
CREATE POLICY "Companies can view their applications"
    ON public.internship_applications FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.company_registrations
            WHERE company_registrations.user_id = auth.uid()
            AND company_registrations.company_name = internship_applications.company_name
        )
    );

CREATE POLICY "Companies can update application status"
    ON public.internship_applications FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.company_registrations
            WHERE company_registrations.user_id = auth.uid()
            AND company_registrations.company_name = internship_applications.company_name
        )
    );


-- ============================================================
-- 4. CONTACT MESSAGES
-- Form submissions from the Contact page
-- ============================================================
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name        TEXT NOT NULL,
    email       TEXT NOT NULL,
    phone       TEXT,
    subject     TEXT DEFAULT 'General Inquiry',
    message     TEXT NOT NULL,
    is_read     BOOLEAN DEFAULT FALSE,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Anyone (including guests) can submit a contact form
CREATE POLICY "Anyone can submit contact form"
    ON public.contact_messages FOR INSERT
    WITH CHECK (true);

-- Only authenticated users (admins) can read messages
CREATE POLICY "Authenticated users can view messages"
    ON public.contact_messages FOR SELECT
    USING (auth.role() = 'authenticated');


-- ============================================================
-- 5. NEWSLETTER SUBSCRIPTIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.newsletter_subscriptions (
    id           UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email        TEXT NOT NULL UNIQUE,
    is_active    BOOLEAN DEFAULT TRUE,
    subscribed_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Anyone can subscribe (even without account)
CREATE POLICY "Anyone can subscribe to newsletter"
    ON public.newsletter_subscriptions FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Authenticated users can view subscriptions"
    ON public.newsletter_subscriptions FOR SELECT
    USING (auth.role() = 'authenticated');


-- ============================================================
-- 6. COURSE ENROLLMENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.course_enrollments (
    id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id         UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    student_name    TEXT NOT NULL,
    email           TEXT NOT NULL,
    phone           TEXT,
    course_name     TEXT NOT NULL,
    course_category TEXT,
    status          TEXT DEFAULT 'enrolled',  -- enrolled | completed | dropped
    enrolled_at     TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS course_enrollments_user_id_idx
    ON public.course_enrollments(user_id);

ALTER TABLE public.course_enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view own enrollments"
    ON public.course_enrollments FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Anyone can enroll in a course"
    ON public.course_enrollments FOR INSERT
    WITH CHECK (true);


-- ============================================================
-- 7. STORAGE BUCKET — RESUMES
-- Students upload their resume/CV when applying
-- ============================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', false)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload their own resume
CREATE POLICY "Authenticated users can upload resumes"
    ON storage.objects FOR INSERT
    WITH CHECK (bucket_id = 'resumes' AND auth.role() = 'authenticated');

-- Allow users to view their own resumes
CREATE POLICY "Users can view own resumes"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'resumes' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow companies to view resumes for their applicants (simplified: authenticated read)
CREATE POLICY "Companies can view applicant resumes"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'resumes' AND auth.role() = 'authenticated');


-- ============================================================
-- 8. HELPER: auto-update updated_at timestamp
-- ============================================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_student_registrations_updated_at
    BEFORE UPDATE ON public.student_registrations
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_company_registrations_updated_at
    BEFORE UPDATE ON public.company_registrations
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_internship_applications_updated_at
    BEFORE UPDATE ON public.internship_applications
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


-- ============================================================
-- 9. AUTH USER TRIGGER
-- Automatically creates a profile row in student/company table
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  v_full_name       TEXT;
  v_company_name    TEXT;
  v_contact_person  TEXT;
  v_phone           TEXT;
  v_website         TEXT;
  v_industry        TEXT;
  v_company_size    TEXT;
  v_description     TEXT;
  v_college_name    TEXT;
  v_field_of_study  TEXT;
  v_skills          TEXT;
  v_interests       TEXT;
  v_grad_year       INTEGER;
BEGIN
  -- Extract metadata fields safely
  v_full_name      := COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1));
  v_company_name   := NULLIF(TRIM(COALESCE(NEW.raw_user_meta_data->>'company_name', '')), '');
  v_contact_person := COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'contact_person', split_part(NEW.email, '@', 1));
  v_phone          := NEW.raw_user_meta_data->>'phone';
  v_website        := NEW.raw_user_meta_data->>'website';
  v_industry       := NEW.raw_user_meta_data->>'industry';
  v_company_size   := NEW.raw_user_meta_data->>'company_size';
  v_description    := NEW.raw_user_meta_data->>'description';
  v_college_name   := NEW.raw_user_meta_data->>'college_name';
  v_field_of_study := NEW.raw_user_meta_data->>'field_of_study';
  v_skills         := NEW.raw_user_meta_data->>'skills';
  v_interests      := NEW.raw_user_meta_data->>'interests';

  -- Safe integer cast for graduation year (guard against NaN / empty string)
  BEGIN
    v_grad_year := NULLIF(TRIM(COALESCE(NEW.raw_user_meta_data->>'graduation_year', '')), '')::INTEGER;
  EXCEPTION WHEN OTHERS THEN
    v_grad_year := NULL;
  END;

  IF v_company_name IS NOT NULL THEN
    -- Company registration
    INSERT INTO public.company_registrations
      (user_id, email, company_name, contact_person, phone, website, industry, company_size, description, status)
    VALUES
      (NEW.id, NEW.email, v_company_name, v_contact_person, v_phone, v_website, v_industry, v_company_size, v_description, 'approved')
    ON CONFLICT (user_id) DO NOTHING;
  ELSE
    -- Student registration
    INSERT INTO public.student_registrations
      (user_id, email, full_name, phone, college_name, graduation_year, field_of_study, skills, interests)
    VALUES
      (NEW.id, NEW.email, v_full_name, v_phone, v_college_name, v_grad_year, v_field_of_study, v_skills, v_interests)
    ON CONFLICT (user_id) DO NOTHING;
  END IF;

  RETURN NEW;

EXCEPTION WHEN OTHERS THEN
  -- Log but never block the auth.users insert
  RAISE WARNING 'handle_new_user trigger error for user %: %', NEW.id, SQLERRM;
  RETURN NEW;
END;
$$;

-- Attach trigger to auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ============================================================
-- DONE! All tables, policies, indexes, storage, and triggers
-- are set up for Intern Academy.
-- ============================================================
