-- ========================================
-- STUDENT PROFILE SCHEMA ENHANCEMENTS
-- Add education details and internship history
-- ========================================

-- Add new columns to student_registrations table
ALTER TABLE public.student_registrations
  ADD COLUMN IF NOT EXISTS degree VARCHAR(255),
  ADD COLUMN IF NOT EXISTS major VARCHAR(255),
  ADD COLUMN IF NOT EXISTS university VARCHAR(255),
  ADD COLUMN IF NOT EXISTS degree_start_date DATE,
  ADD COLUMN IF NOT EXISTS degree_end_date DATE,
  ADD COLUMN IF NOT EXISTS graduation_year INTEGER,
  ADD COLUMN IF NOT EXISTS current_year VARCHAR(50),
  ADD COLUMN IF NOT EXISTS gpa DECIMAL(3,2),
  ADD COLUMN IF NOT EXISTS previous_internships TEXT,
  ADD COLUMN IF NOT EXISTS skills TEXT,
  ADD COLUMN IF NOT EXISTS bio TEXT,
  ADD COLUMN IF NOT EXISTS linkedin_url VARCHAR(255),
  ADD COLUMN IF NOT EXISTS github_url VARCHAR(255),
  ADD COLUMN IF NOT EXISTS portfolio_url VARCHAR(255),
  ADD COLUMN IF NOT EXISTS resume_url TEXT;

-- Add indexes for commonly queried fields
CREATE INDEX IF NOT EXISTS idx_student_graduation_year 
  ON public.student_registrations(graduation_year);

CREATE INDEX IF NOT EXISTS idx_student_degree 
  ON public.student_registrations(degree);

-- Add comments for documentation
COMMENT ON COLUMN public.student_registrations.degree IS 'Student degree program (e.g., B.Tech, MBA, M.Sc)';
COMMENT ON COLUMN public.student_registrations.major IS 'Major/specialization (e.g., Computer Science, Mechanical)';
COMMENT ON COLUMN public.student_registrations.university IS 'University/college name';
COMMENT ON COLUMN public.student_registrations.degree_start_date IS 'Degree program start date';
COMMENT ON COLUMN public.student_registrations.degree_end_date IS 'Expected/actual graduation date';
COMMENT ON COLUMN public.student_registrations.graduation_year IS 'Year of graduation';
COMMENT ON COLUMN public.student_registrations.current_year IS 'Current year in program (e.g., 1st Year, 2nd Year)';
COMMENT ON COLUMN public.student_registrations.gpa IS 'Grade point average (0.00-10.00 scale)';
COMMENT ON COLUMN public.student_registrations.previous_internships IS 'JSON or text description of previous internship experience';
COMMENT ON COLUMN public.student_registrations.skills IS 'Comma-separated or JSON list of skills';
COMMENT ON COLUMN public.student_registrations.bio IS 'Student bio/summary';
COMMENT ON COLUMN public.student_registrations.linkedin_url IS 'LinkedIn profile URL';
COMMENT ON COLUMN public.student_registrations.github_url IS 'GitHub profile URL';
COMMENT ON COLUMN public.student_registrations.portfolio_url IS 'Portfolio website URL';
COMMENT ON COLUMN public.student_registrations.resume_url IS 'URL to uploaded resume file';

-- ========================================
-- COMPANY VERIFICATION FIELDS
-- ========================================

-- Add verification and additional details to company_registrations
ALTER TABLE public.company_registrations
  ADD COLUMN IF NOT EXISTS company_logo_url TEXT,
  ADD COLUMN IF NOT EXISTS company_address TEXT,
  ADD COLUMN IF NOT EXISTS company_city VARCHAR(100),
  ADD COLUMN IF NOT EXISTS company_state VARCHAR(100),
  ADD COLUMN IF NOT EXISTS company_country VARCHAR(100) DEFAULT 'India',
  ADD COLUMN IF NOT EXISTS registration_number VARCHAR(100),
  ADD COLUMN IF NOT EXISTS gst_number VARCHAR(20),
  ADD COLUMN IF NOT EXISTS verified BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS verified_at TIMESTAMP WITH TIME ZONE,
  ADD COLUMN IF NOT EXISTS verified_by UUID,
  ADD COLUMN IF NOT EXISTS verification_documents TEXT,
  ADD COLUMN IF NOT EXISTS linkedin_url VARCHAR(255),
  ADD COLUMN IF NOT EXISTS founded_year INTEGER,
  ADD COLUMN IF NOT EXISTS total_employees INTEGER;

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_company_verified 
  ON public.company_registrations(verified);

CREATE INDEX IF NOT EXISTS idx_company_city 
  ON public.company_registrations(company_city);

-- Add comments
COMMENT ON COLUMN public.company_registrations.verified IS 'Whether company has been verified by admin';
COMMENT ON COLUMN public.company_registrations.registration_number IS 'Company registration number (CIN)';
COMMENT ON COLUMN public.company_registrations.gst_number IS 'GST registration number';
COMMENT ON COLUMN public.company_registrations.verification_documents IS 'URLs to uploaded verification documents';

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'Schema updates completed successfully!';
  RAISE NOTICE 'Student fields added: degree, major, university, dates, internship history';
  RAISE NOTICE 'Company verification fields added: verification status, documents, GST';
END $$;
