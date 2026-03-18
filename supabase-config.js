// Supabase Configuration for Intern Academy
// Project: https://utwdwlnvempgfrfocrps.supabase.co

const SUPABASE_URL = 'https://utwdwlnvempgfrfocrps.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0d2R3bG52ZW1wZ2ZyZm9jcnBzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5ODQ2OTgsImV4cCI6MjA4ODU2MDY5OH0._AxIYZnLYIpUuaBQkfIbSlNWjFgrqbgE6unVpR6FWu4';

// Initialize Supabase client
window.supabaseClient = null;

function initializeSupabase() {
    const supabaseLib = window.supabase;
    if (supabaseLib && typeof supabaseLib.createClient === 'function') {
        window.supabaseClient = supabaseLib.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        window.supabase = window.supabaseClient;
        console.log('✅ Supabase client initialized successfully');
        return true;
    } else {
        console.warn('⚠️ Supabase library not loaded yet, retrying...');
        return false;
    }
}

if (!initializeSupabase()) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (!initializeSupabase()) {
                console.error('❌ Failed to initialize Supabase client.');
            }
        }, 100);
    });
}

// ─────────────────────────────────────────────────────────────
// STUDENT REGISTRATION
// Packages all form data into user_metadata during signUp.
// The database trigger handle_new_user() creates the profile row.
// ─────────────────────────────────────────────────────────────
async function handleStudentRegistration(event) {
    event.preventDefault();

    if (!window.supabaseClient) {
        alert('❌ Connection error. Please refresh the page and try again.');
        return;
    }

    const email           = document.getElementById('email').value.trim().toLowerCase();
    const password        = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('❌ Passwords do not match!\n\nPlease make sure both password fields are the same.');
        return;
    }

    // Guard against NaN — parseInt('') === NaN which crashes the Postgres trigger
    const gradRaw        = document.getElementById('graduationYear').value;
    const graduationYear = gradRaw ? (parseInt(gradRaw) || null) : null;

    const submitBtn = event.target.querySelector('button[type="submit"]');
    const origText  = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
    submitBtn.disabled  = true;

    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name:       document.getElementById('fullName').value.trim(),
                    phone:           document.getElementById('phone').value.trim(),
                    college_name:    document.getElementById('collegeName').value.trim(),
                    graduation_year: graduationYear,
                    field_of_study:  document.getElementById('fieldOfStudy').value.trim(),
                    skills:          document.getElementById('skills').value.trim(),
                    interests:       document.getElementById('interests').value.trim()
                },
                emailRedirectTo: `${window.location.origin}/dashboard.html`
            }
        });

        if (error) throw error;

        alert('🎉 Registration Successful!\n\n✉️ Please check your email to verify your account.\n\nWe\'ve sent a verification link to: ' + email + '\n\nAfter verifying, you can log in to your dashboard.');
        event.target.reset();
        setTimeout(() => {
            window.location.href = 'verify-email.html?email=' + encodeURIComponent(email);
        }, 2000);

    } catch (error) {
        console.error('❌ STUDENT REGISTRATION ERROR', error);
        _handleRegistrationError(error, email);
    } finally {
        submitBtn.innerHTML = origText;
        submitBtn.disabled  = false;
    }
}

// ─────────────────────────────────────────────────────────────
// COMPANY REGISTRATION
// Packages all form data into user_metadata during signUp.
// The database trigger handle_new_user() creates the profile row.
// ─────────────────────────────────────────────────────────────
async function handleCompanyRegistration(event) {
    event.preventDefault();

    if (!window.supabaseClient) {
        alert('❌ Connection error. Please refresh the page and try again.');
        return;
    }

    const email           = document.getElementById('email').value.trim().toLowerCase();
    const password        = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('❌ Passwords do not match!\n\nPlease make sure both password fields are the same.');
        return;
    }

    const submitBtn = event.target.querySelector('button[type="submit"]');
    const origText  = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
    submitBtn.disabled  = true;

    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    company_name:  document.getElementById('companyName').value.trim(),
                    full_name:     document.getElementById('contactPerson').value.trim(),
                    phone:         document.getElementById('phone').value.trim(),
                    website:       document.getElementById('website').value.trim(),
                    industry:      document.getElementById('industry').value.trim(),
                    company_size:  document.getElementById('companySize').value,
                    description:   document.getElementById('description').value.trim()
                },
                emailRedirectTo: `${window.location.origin}/company-dashboard.html`
            }
        });

        if (error) throw error;

        alert('🎉 Company Registration Successful!\n\n✉️ Please check your email to verify your account.\n\nWe\'ve sent a verification link to: ' + email + '\n\nAfter verifying, you can log in to your dashboard.');
        event.target.reset();
        setTimeout(() => {
            window.location.href = 'verify-email.html?email=' + encodeURIComponent(email);
        }, 2000);

    } catch (error) {
        console.error('❌ COMPANY REGISTRATION ERROR', error);
        _handleRegistrationError(error, email);
    } finally {
        submitBtn.innerHTML = origText;
        submitBtn.disabled  = false;
    }
}

/**
 * Shared error handler for both registration flows.
 * Only surfaces specific known Supabase error codes.
 */
function _handleRegistrationError(error, email) {
    const code    = error.code || '';
    const message = (error.message || '').toLowerCase();

    if (message.includes('already registered') || code === '23505') {
        alert('❌ This email is already registered.\n\nPlease login or use the "Forgot Password" option.');
    } else if (message.includes('password')) {
        alert('❌ Password Error\n\nPassword must be at least 6 characters long.');
    } else if (message.includes('cors')) {
        alert('❌ Connection Error\n\nThe website domain has not been added to the allowed list.\nPlease contact the administrator at contact@internacademy.co.in');
    } else if (code === '42P01') {
        alert('❌ Database Configuration Error\n\nThe system is not fully set up.\nPlease contact support at contact@internacademy.co.in');
    } else if (message.includes('fetch') || message.includes('network')) {
        alert('❌ Network Error\n\nCould not connect to the server.\nPlease check your internet connection and try again.');
    } else if (code === '42501') {
        // Auth user was created — a secondary DB action failed. Treat as success.
        alert('✅ Account Created!\n\n✉️ Please check your email to verify your account.\nAfter verifying you can log in.');
        if (email) {
            setTimeout(() => {
                window.location.href = 'verify-email.html?email=' + encodeURIComponent(email);
            }, 2000);
        }
    } else {
        alert(`❌ Registration failed.\n\nError: ${error.message || 'Unknown error'}\nCode: ${code || 'N/A'}\n\nContact: contact@internacademy.co.in`);
    }
}

// ─────────────────────────────────────────────────────────────
// CONTACT FORM
// ─────────────────────────────────────────────────────────────
async function handleContactForm(event) {
    event.preventDefault();

    if (!window.supabaseClient) {
        alert('❌ Connection error. Please refresh the page and try again.');
        return;
    }

    const submitBtn = event.target.querySelector('button[type="submit"]');
    const origText  = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled    = true;

    const formData = {
        name:    document.getElementById('name').value.trim(),
        email:   document.getElementById('email').value.trim().toLowerCase(),
        phone:   document.getElementById('phone')?.value.trim() || null,
        subject: document.getElementById('subject')?.value.trim() || 'General Inquiry',
        message: document.getElementById('message').value.trim()
    };

    try {
        const { error } = await window.supabaseClient
            .from('contact_messages')
            .insert([formData]);

        if (error) throw error;

        alert('✅ Message sent successfully!\n\nWe\'ll get back to you within 24-48 hours.');
        event.target.reset();

    } catch (error) {
        console.error('Contact form error:', error);
        alert('❌ Failed to send message. Please try again or email us directly at contact@internacademy.co.in');
    } finally {
        submitBtn.textContent = origText;
        submitBtn.disabled    = false;
    }
}

// ─────────────────────────────────────────────────────────────
// NEWSLETTER SUBSCRIPTION
// ─────────────────────────────────────────────────────────────
async function subscribeToNewsletter(email) {
    if (!email || !email.includes('@')) {
        alert('❌ Please enter a valid email address.');
        return false;
    }

    try {
        const { error } = await window.supabaseClient
            .from('newsletter_subscriptions')
            .insert([{ email: email.trim().toLowerCase() }]);

        if (error) {
            if (error.code === '23505') {
                alert('✅ You are already subscribed to our newsletter!');
                return true;
            }
            throw error;
        }

        alert('🎉 Successfully subscribed!\n\nWe\'ll keep you updated with the latest internships and courses.');
        return true;

    } catch (error) {
        console.error('Newsletter error:', error);
        alert('❌ Subscription failed. Please try again.');
        return false;
    }
}

// ─────────────────────────────────────────────────────────────
// INTERNSHIP APPLICATION
// ─────────────────────────────────────────────────────────────
async function handleInternshipApplication(event) {
    event.preventDefault();

    const session = await checkAuth();
    if (!session) {
        alert('⚠️ Please log in or register to apply for internships.');
        localStorage.setItem('redirectAfterLogin', window.location.pathname);
        window.location.href = 'login.html';
        return;
    }

    const submitBtn = event.target.querySelector('button[type="submit"]');
    const origText  = submitBtn.textContent;
    submitBtn.textContent = 'Applying...';
    submitBtn.disabled    = true;

    const formData = {
        user_id:          session.user.id,
        student_name:     document.getElementById('studentName').value.trim(),
        email:            document.getElementById('email').value.trim().toLowerCase(),
        phone:            document.getElementById('phone').value.trim(),
        internship_title: document.getElementById('internshipTitle').value.trim(),
        company_name:     document.getElementById('companyName').value.trim(),
        cover_letter:     document.getElementById('coverLetter')?.value.trim() || null,
        resume_url:       document.getElementById('resumeUrl')?.value.trim() || null
    };

    try {
        const { error } = await window.supabaseClient
            .from('internship_applications')
            .insert([formData]);

        if (error) throw error;

        alert('🎉 Application submitted successfully!\n\nThe company will review your application and contact you if selected.');
        event.target.reset();

    } catch (error) {
        console.error('Application error:', error);
        alert('❌ Application failed. Please try again.');
    } finally {
        submitBtn.textContent = origText;
        submitBtn.disabled    = false;
    }
}

// ─────────────────────────────────────────────────────────────
// COURSE ENROLLMENT
// ─────────────────────────────────────────────────────────────
async function handleCourseEnrollment(event) {
    event.preventDefault();

    const submitBtn = event.target.querySelector('button[type="submit"]');
    const origText  = submitBtn.textContent;
    submitBtn.textContent = 'Enrolling...';
    submitBtn.disabled    = true;

    const formData = {
        student_name:    document.getElementById('studentName').value.trim(),
        email:           document.getElementById('email').value.trim().toLowerCase(),
        phone:           document.getElementById('phone').value.trim(),
        course_name:     document.getElementById('courseName').value.trim(),
        course_category: document.getElementById('courseCategory')?.value || null
    };

    try {
        const { error } = await window.supabaseClient
            .from('course_enrollments')
            .insert([formData]);

        if (error) throw error;

        alert('🎉 Enrollment successful!\n\nWe\'ll send course details to your email within 24 hours.');
        event.target.reset();

    } catch (error) {
        console.error('Enrollment error:', error);
        alert('❌ Enrollment failed. Please try again.');
    } finally {
        submitBtn.textContent = origText;
        submitBtn.disabled    = false;
    }
}

// ─────────────────────────────────────────────────────────────
// VALIDATION HELPERS
// ─────────────────────────────────────────────────────────────
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
    return /^[0-9]{10}$/.test(phone.replace(/\s/g, ''));
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('input[type="email"]').forEach(input => {
        input.addEventListener('blur', function () {
            if (this.value && !validateEmail(this.value)) {
                this.setCustomValidity('Please enter a valid email address');
            } else {
                this.setCustomValidity('');
            }
        });
    });
});
