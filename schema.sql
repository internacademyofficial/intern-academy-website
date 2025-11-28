-- Users Table (Stores both Students and Companies)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('student', 'company')),
    full_name VARCHAR(255) NOT NULL,
    company_name VARCHAR(255), -- Nullable, only for companies
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Internships Table
CREATE TABLE internships (
    id SERIAL PRIMARY KEY,
    company_id INTEGER REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    stipend VARCHAR(100),
    duration VARCHAR(50),
    description TEXT,
    skills_required TEXT,
    deadline DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- Applications Table
CREATE TABLE applications (
    id SERIAL PRIMARY KEY,
    internship_id INTEGER REFERENCES internships(id),
    student_id INTEGER REFERENCES users(id),
    status VARCHAR(50) DEFAULT 'applied' CHECK (status IN ('applied', 'shortlisted', 'rejected', 'hired')),
    resume_link VARCHAR(255),
    cover_letter TEXT,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(internship_id, student_id) -- Prevent duplicate applications
);

-- Indexes for faster search
CREATE INDEX idx_internships_category ON internships(category);
CREATE INDEX idx_internships_location ON internships(location);
CREATE INDEX idx_applications_student ON applications(student_id);
