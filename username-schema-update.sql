-- ========================================
-- USERNAME SCHEMA UPDATE
-- Adds username support for both students and companies
-- ========================================

-- Step 1: Add username column to student_registrations table
ALTER TABLE student_registrations 
ADD COLUMN IF NOT EXISTS username VARCHAR(20) UNIQUE;

-- Add check constraint for username format (alphanumeric, underscores, hyphens only)
ALTER TABLE student_registrations
ADD CONSTRAINT student_username_format CHECK (username ~ '^[a-zA-Z0-9_-]{3,20}$');

-- Create index for fast username lookups (case-insensitive)
CREATE INDEX IF NOT EXISTS idx_student_username_lower ON student_registrations(LOWER(username));

-- Step 2: Add username column to company_registrations table
ALTER TABLE company_registrations 
ADD COLUMN IF NOT EXISTS username VARCHAR(20) UNIQUE;

-- Add check constraint for username format (alphanumeric, underscores, hyphens only)
ALTER TABLE company_registrations
ADD CONSTRAINT company_username_format CHECK (username ~ '^[a-zA-Z0-9_-]{3,20}$');

-- Create index for fast username lookups (case-insensitive)
CREATE INDEX IF NOT EXISTS idx_company_username_lower ON company_registrations(LOWER(username));

-- Step 3: Create a view to check username uniqueness across both tables
CREATE OR REPLACE VIEW all_usernames AS
SELECT username, 'student' AS user_type, email FROM student_registrations WHERE username IS NOT NULL
UNION ALL
SELECT username, 'company' AS user_type, email FROM company_registrations WHERE username IS NOT NULL;

-- Step 4: Create a function to check if username is available (case-insensitive)
CREATE OR REPLACE FUNCTION is_username_available(check_username TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN NOT EXISTS (
        SELECT 1 FROM student_registrations WHERE LOWER(username) = LOWER(check_username)
        UNION ALL
        SELECT 1 FROM company_registrations WHERE LOWER(username) = LOWER(check_username)
    );
END;
$$ LANGUAGE plpgsql;

-- Step 5: Create a function to get email from username (for login)
CREATE OR REPLACE FUNCTION get_email_from_username(lookup_username TEXT)
RETURNS TEXT AS $$
DECLARE
    user_email TEXT;
BEGIN
    -- Check student_registrations first
    SELECT email INTO user_email 
    FROM student_registrations 
    WHERE LOWER(username) = LOWER(lookup_username);
    
    IF user_email IS NOT NULL THEN
        RETURN user_email;
    END IF;
    
    -- Check company_registrations
    SELECT email INTO user_email 
    FROM company_registrations 
    WHERE LOWER(username) = LOWER(lookup_username);
    
    RETURN user_email; -- Returns NULL if not found
END;
$$ LANGUAGE plpgsql;

-- Grant necessary permissions
GRANT SELECT ON all_usernames TO authenticated, anon;
GRANT EXECUTE ON FUNCTION is_username_available TO authenticated, anon;
GRANT EXECUTE ON FUNCTION get_email_from_username TO authenticated, anon;

-- Add comments for documentation
COMMENT ON COLUMN student_registrations.username IS 'Unique username for login (3-20 chars, alphanumeric, underscores, hyphens)';
COMMENT ON COLUMN company_registrations.username IS 'Unique username for login (3-20 chars, alphanumeric, underscores, hyphens)';
COMMENT ON FUNCTION is_username_available IS 'Check if a username is available across both student and company tables';
COMMENT ON FUNCTION get_email_from_username IS 'Get email address from username for authentication';
