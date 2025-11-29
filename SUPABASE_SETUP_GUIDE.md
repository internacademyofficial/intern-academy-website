# 🔥 Supabase Integration Guide - Intern Academy

This guide will help you integrate Supabase into your Intern Academy website for storing form data and managing your database.

## 📋 Table of Contents
1. [What is Supabase?](#what-is-supabase)
2. [Initial Setup](#initial-setup)
3. [Database Schema](#database-schema)
4. [Integration Steps](#integration-steps)
5. [Form Implementations](#form-implementations)
6. [Security & Best Practices](#security--best-practices)

---

## What is Supabase?

Supabase is an open-source Firebase alternative that provides:
- ✅ **PostgreSQL Database** - Powerful relational database
- ✅ **Authentication** - User sign-up/login
- ✅ **Real-time subscriptions** - Live data updates
- ✅ **Storage** - File uploads
- ✅ **Auto-generated APIs** - REST and GraphQL APIs
- ✅ **Free tier** - Perfect for getting started!

---

## Initial Setup

### Step 1: Create Supabase Account

1. Go to [supabase.com](https://supabase.com)
2. Click **"Start your project"**
3. Sign up with **GitHub** (recommended)
4. Click **"New Project"**

### Step 2: Create Your Project

Fill in the details:
- **Project Name**: `intern-academy`
- **Database Password**: Choose a strong password (save this!)
- **Region**: Choose closest to your users (e.g., `ap-south-1` for India)
- **Pricing Plan**: Free (for now)

Click **"Create new project"**

⏱️ Wait 2-3 minutes for project setup to complete.

### Step 3: Get Your API Keys

1. Once project is ready, go to **Settings** (gear icon) → **API**
2. You'll see:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **Project API Key (anon/public)**: `eyJhbGc...`

📝 **Save these values** - you'll need them!

---

## Database Schema

### Tables to Create

We'll create tables for:
1. **student_registrations** - Student sign-ups
2. **company_registrations** - Company sign-ups
3. **contact_messages** - Contact form submissions
4. **internship_applications** - Internship applications
5. **newsletter_subscriptions** - Email subscriptions

### Step 1: Create Tables in Supabase

#### Go to SQL Editor

1. In Supabase dashboard, click **SQL Editor** (left sidebar)
2. Click **"New query"**
3. Copy and paste the schema below
4. Click **"Run"**

#### Database Schema SQL

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Student Registrations Table
CREATE TABLE student_registrations (
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

-- 2. Company Registrations Table
CREATE TABLE company_registrations (
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

-- 3. Contact Messages Table
CREATE TABLE contact_messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(255),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Internship Applications Table
CREATE TABLE internship_applications (
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

-- 5. Newsletter Subscriptions Table
CREATE TABLE newsletter_subscriptions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Courses Enrollments Table (Bonus)
CREATE TABLE course_enrollments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    course_name VARCHAR(255) NOT NULL,
    course_category VARCHAR(100),
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_student_email ON student_registrations(email);
CREATE INDEX idx_company_email ON company_registrations(email);
CREATE INDEX idx_contact_created ON contact_messages(created_at DESC);
CREATE INDEX idx_newsletter_email ON newsletter_subscriptions(email);
CREATE INDEX idx_applications_status ON internship_applications(status);

-- Enable Row Level Security (RLS)
ALTER TABLE student_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE internship_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_enrollments ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public inserts (for forms)
-- Students can insert their own data
CREATE POLICY "Allow public insert student registrations"
ON student_registrations FOR INSERT
TO anon
WITH CHECK (true);

-- Companies can insert their own data
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

-- Note: Only authenticated users (admins) can read data
-- You can add admin policies later
```

✅ **Run this SQL** in the Supabase SQL Editor.

---

## Integration Steps

### Step 1: Create Supabase Config File

Create a new file to store your Supabase configuration:

**File: `supabase-config.js`**
```javascript
// Supabase Configuration
const SUPABASE_URL = 'YOUR_SUPABASE_URL_HERE'; // e.g., https://xxxxx.supabase.co
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY_HERE'; // Your public anon key

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
```

⚠️ **Replace** `YOUR_SUPABASE_URL_HERE` and `YOUR_SUPABASE_ANON_KEY_HERE` with your actual values from Step 3 above.

### Step 2: Add Supabase Library to Your HTML

Add this **before closing `</body>`** tag in ALL your HTML pages that use forms:

```html
<!-- Supabase JavaScript Client -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="supabase-config.js"></script>
```

---

## Form Implementations

### Example 1: Student Registration Form

```javascript
async function handleStudentRegistration(event) {
    event.preventDefault();
    
    const formData = {
        full_name: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        college_name: document.getElementById('collegeName').value,
        graduation_year: parseInt(document.getElementById('graduationYear').value),
        field_of_study: document.getElementById('fieldOfStudy').value,
        skills: document.getElementById('skills').value,
        interests: document.getElementById('interests').value
    };

    try {
        const { data, error } = await supabase
            .from('student_registrations')
            .insert([formData]);

        if (error) throw error;

        alert('Registration successful! Welcome to Intern Academy!');
        event.target.reset(); // Clear form
        
    } catch (error) {
        console.error('Error:', error);
        alert('Registration failed. Please try again.');
    }
}
```

### Example 2: Contact Form

```javascript
async function handleContactForm(event) {
    event.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    try {
        const { data, error } = await supabase
            .from('contact_messages')
            .insert([formData]);

        if (error) throw error;

        alert('Message sent successfully! We\'ll get back to you soon.');
        event.target.reset();
        
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to send message. Please try again.');
    }
}
```

### Example 3: Newsletter Subscription

```javascript
async function subscribeToNewsletter(email) {
    try {
        const { data, error } = await supabase
            .from('newsletter_subscriptions')
            .insert([{ email: email }]);

        if (error) {
            if (error.code === '23505') { // Duplicate email
                alert('You are already subscribed!');
            } else {
                throw error;
            }
        } else {
            alert('Successfully subscribed to our newsletter!');
        }
        
    } catch (error) {
        console.error('Error:', error);
        alert('Subscription failed. Please try again.');
    }
}
```

---

## Security & Best Practices

### ✅ DO's

1. **Use Environment Variables** (for production):
   - Don't commit API keys to GitHub
   - Use `.env` files or hosting platform's environment variables

2. **Enable Row Level Security (RLS)**:
   - Already done in the schema above
   - Prevents unauthorized data access

3. **Validate Input**:
   - Add client-side validation
   - Supabase will also validate on the server side

4. **Rate Limiting**:
   - Consider adding rate limiting for form submissions
   - Prevent spam and abuse

### ❌ DON'Ts

1. **Don't expose sensitive data**:
   - The anon key is safe to expose (read-only access by default)
   - Never expose your service_role key

2. **Don't trust client-side data**:
   - Always validate on the backend (Supabase policies help with this)

---

## Testing Your Integration

### Test Form Submission

1. Fill out a form on your website
2. Submit it
3. Go to Supabase Dashboard → **Table Editor**
4. Select the table (e.g., `student_registrations`)
5. You should see your data!

---

## Viewing Your Data

### In Supabase Dashboard

1. Click **Table Editor** (left sidebar)
2. Select a table
3. View, edit, or delete records

### Query Your Data (SQL)

```sql
-- View all student registrations
SELECT * FROM student_registrations ORDER BY created_at DESC;

-- Count total registrations
SELECT COUNT(*) FROM student_registrations;

-- Get recent contact messages
SELECT * FROM contact_messages WHERE is_read = false ORDER BY created_at DESC;
```

---

## Next Steps

After basic setup:

1. ✅ **Add Email Notifications** - Send confirmation emails using Supabase Functions
2. ✅ **Create Admin Dashboard** - Build a dashboard to manage data
3. ✅ **Add Authentication** - Let students log in
4. ✅ **File Uploads** - Add resume upload functionality using Supabase Storage
5. ✅ **Real-time Updates** - Show live internship postings

---

## 🆘 Troubleshooting

### "Failed to fetch" error
- Check if SUPABASE_URL and SUPABASE_ANON_KEY are correct
- Verify your internet connection
- Check browser console for detailed errors

### "Row Level Security" errors
- Make sure you ran the RLS policies in the SQL schema
- Verify policies are enabled for the table

### CORS errors
- Supabase handles CORS automatically
- If issues persist, check your project's API settings

---

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)

---

**Ready to implement? Let's update your forms!** 🚀
