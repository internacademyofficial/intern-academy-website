// Supabase Configuration for Intern Academy
// Project: https://utwdwlnvempgfrfocrps.supabase.co

const SUPABASE_URL = 'https://utwdwlnvempgfrfocrps.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0d2R3bG52ZW1wZ2ZyZm9jcnBzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5ODQ2OTgsImV4cCI6MjA4ODU2MDY5OH0._AxIYZnLYIpUuaBQkfIbSlNWjFgrqbgE6unVpR6FWu4';

// Initialize Supabase client
// The Supabase CDN exposes its library namespace on window.supabase.
// We call createClient() to produce the actual *client* object and store
// it on window.supabaseClient so the two don't get confused.
window.supabaseClient = null;

// Function to initialize Supabase when library is loaded
function initializeSupabase() {
    // The CDN UMD build exposes the library as window.supabase with a createClient method
    const supabaseLib = window.supabase;
    if (supabaseLib && typeof supabaseLib.createClient === 'function') {
        window.supabaseClient = supabaseLib.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        // Overwrite window.supabase with the client so bare `supabase` references work
        window.supabase = window.supabaseClient;
        console.log('✅ Supabase client initialized successfully');
        return true;
    } else {
        console.warn('⚠️ Supabase library not loaded yet, retrying...');
        return false;
    }
}

// Try to initialize immediately (works when script order is correct)
if (!initializeSupabase()) {
    // Fallback: wait for page load + small delay
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (!initializeSupabase()) {
                console.error('❌ Failed to initialize Supabase client. The Supabase CDN script must be loaded before supabase-config.js.');
            }
        }, 100);
    });
}

// Form submission handlers

/**
 * Handle Student Registration Form Submission with Authentication
 */
async function handleStudentRegistration(event) {
    event.preventDefault();

    // Check if Supabase is initialized
    if (!window.supabaseClient) {
        alert('❌ Connection error. Please refresh the page and try again.');
        console.error('Supabase client not initialized');
        return;
    }

    // Get form values
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim().toLowerCase();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const phone = document.getElementById('phone').value.trim();
    const collegeName = document.getElementById('collegeName').value.trim();
    const graduationYear = parseInt(document.getElementById('graduationYear').value);
    const fieldOfStudy = document.getElementById('fieldOfStudy').value.trim();
    const skills = document.getElementById('skills').value.trim();
    const interests = document.getElementById('interests').value.trim();

    // Validate passwords match
    if (password !== confirmPassword) {
        alert('❌ Passwords do not match!\n\nPlease make sure both password fields are the same.');
        return;
    }

    // Show loading state
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
    submitBtn.disabled = true;

    try {
        // Step 1: Sign up user with Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    full_name: fullName,
                    phone: phone
                },
                emailRedirectTo: `${window.location.origin}/dashboard.html`
            }
        });

        if (authError) throw authError;

        // Step 2: Save additional profile data to student_registrations table
        const { data: profileData, error: profileError } = await window.supabaseClient
            .from('student_registrations')
            .insert([{
                user_id: authData.user.id,
                full_name: fullName,
                email: email,
                phone: phone,
                college_name: collegeName,
                graduation_year: graduationYear,
                field_of_study: fieldOfStudy,
                skills: skills,
                interests: interests
            }])
            .select();

        if (profileError) throw profileError;

        // Success!
        alert('🎉 Registration Successful!\n\n✉️ Please check your email to verify your account.\n\nWe\'ve sent a verification link to: ' + email + '\n\nAfter verifying, you can log in to your dashboard.');

        // Reset form
        event.target.reset();

        // Redirect to verification page
        setTimeout(() => {
            window.location.href = 'verify-email.html?email=' + encodeURIComponent(email);
        }, 2000);

    } catch (error) {
        // Detailed error logging for debugging
        console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.error('❌ STUDENT REGISTRATION ERROR');
        console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.error('Full Error:', error);
        console.error('Error Code:', error.code);
        console.error('Error Message:', error.message);
        console.error('Error Details:', error.details);
        console.error('Error Hint:', error.hint);
        console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

        // User-friendly error messages
        if (error.message && error.message.toLowerCase().includes('already registered')) {
            alert('❌ This email is already registered.\n\nPlease login or use the "Forgot Password" option.');
        } else if (error.message && error.message.toLowerCase().includes('password')) {
            alert('❌ Password Error\n\nPassword must be at least 6 characters long.');
        } else if (error.code === '23505') {
            alert('❌ This email is already registered.\n\nPlease use a different email or login to your existing account.');
        } else if (error.message && error.message.toLowerCase().includes('cors')) {
            alert('❌ Connection Error (CORS)\n\nThe website domain needs to be configured in the database.\nPlease contact the administrator at contact@internacademy.co.in');
        } else if (error.code === '42P01') {
            alert('❌ Database Configuration Error\n\nThe registration system is not fully set up.\nPlease contact support at contact@internacademy.co.in');
        } else if (error.code === '42501') {
            alert('❌ Permission Error\n\nDatabase access is restricted.\nPlease contact support at contact@internacademy.co.in');
        } else if (error.message && error.message.toLowerCase().includes('fetch')) {
            alert('❌ Network Error\n\nCould not connect to the database.\nPlease check your internet connection and try again.');
        } else {
            alert(`❌ Registration failed. Please try again or contact support.\n\nError Code: ${error.code || 'NETWORK_ERROR'}\nError: ${error.message || 'Unknown error'}\n\nContact: contact@internacademy.co.in`);
        }
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

/**
 * Handle Company Registration Form Submission
 */
async function handleCompanyRegistration(event) {
    event.preventDefault();

    // Check if Supabase is initialized
    if (!window.supabaseClient) {
        alert('❌ Connection error. Please refresh the page and try again.');
        console.error('Supabase client not initialized');
        return;
    }

    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;

    const formData = {
        company_name: document.getElementById('companyName').value.trim(),
        contact_person: document.getElementById('contactPerson').value.trim(),
        email: document.getElementById('email').value.trim().toLowerCase(),
        phone: document.getElementById('phone').value.trim(),
        website: document.getElementById('website').value.trim(),
        industry: document.getElementById('industry').value.trim(),
        company_size: document.getElementById('companySize').value,
        description: document.getElementById('description').value.trim()
    };

    try {
        const { data, error } = await window.supabaseClient
            .from('company_registrations')
            .insert([formData])
            .select();

        if (error) throw error;

        alert('🎉 Company registration successful!\n\nOur team will review your application and contact you within 2-3 business days.');
        event.target.reset();

    } catch (error) {
        console.error('Error:', error);

        if (error.code === '23505') {
            alert('❌ This company email is already registered.');
        } else {
            alert('❌ Registration failed. Please try again or contact support.');
        }
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

/**
 * Handle Contact Form Submission
 */
async function handleContactForm(event) {
    event.preventDefault();

    // Check if Supabase is initialized
    if (!window.supabaseClient) {
        alert('❌ Connection error. Please refresh the page and try again.');
        console.error('Supabase client not initialized');
        return;
    }

    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim().toLowerCase(),
        phone: document.getElementById('phone')?.value.trim() || null,
        subject: document.getElementById('subject')?.value.trim() || 'General Inquiry',
        message: document.getElementById('message').value.trim()
    };

    try {
        const { data, error } = await window.supabaseClient
            .from('contact_messages')
            .insert([formData])
            .select();

        if (error) throw error;

        alert('✅ Message sent successfully!\n\nWe\'ll get back to you within 24-48 hours.');
        event.target.reset();

    } catch (error) {
        console.error('Error:', error);
        alert('❌ Failed to send message. Please try again or email us directly at contact@internacademy.co.in');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

/**
 * Handle Newsletter Subscription
 */
async function subscribeToNewsletter(email) {
    if (!email || !email.includes('@')) {
        alert('❌ Please enter a valid email address.');
        return false;
    }

    try {
        const { data, error } = await window.supabaseClient
            .from('newsletter_subscriptions')
            .insert([{ email: email.trim().toLowerCase() }])
            .select();

        if (error) {
            if (error.code === '23505') {
                alert('✅ You are already subscribed to our newsletter!');
                return true;
            }
            throw error;
        }

        alert('🎉 Successfully subscribed to our newsletter!\n\nWe\'ll keep you updated with the latest internships and courses.');
        return true;

    } catch (error) {
        console.error('Error:', error);
        alert('❌ Subscription failed. Please try again.');
        return false;
    }
}

/**
 * Handle Internship Application Form
 */
async function handleInternshipApplication(event) {
    event.preventDefault();

    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Applying...';
    submitBtn.disabled = true;

    const formData = {
        student_name: document.getElementById('studentName').value.trim(),
        email: document.getElementById('email').value.trim().toLowerCase(),
        phone: document.getElementById('phone').value.trim(),
        internship_title: document.getElementById('internshipTitle').value.trim(),
        company_name: document.getElementById('companyName').value.trim(),
        cover_letter: document.getElementById('coverLetter')?.value.trim() || null,
        resume_url: document.getElementById('resumeUrl')?.value.trim() || null
    };

    try {
        const { data, error } = await window.supabaseClient
            .from('internship_applications')
            .insert([formData])
            .select();

        if (error) throw error;

        alert('🎉 Application submitted successfully!\n\nThe company will review your application and contact you if selected.');
        event.target.reset();

        // Optional: Redirect back to internships page
        // window.location.href = 'internships.html';

    } catch (error) {
        console.error('Error:', error);
        alert('❌ Application failed. Please try again.');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

/**
 * Handle Course Enrollment
 */
async function handleCourseEnrollment(event) {
    event.preventDefault();

    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Enrolling...';
    submitBtn.disabled = true;

    const formData = {
        student_name: document.getElementById('studentName').value.trim(),
        email: document.getElementById('email').value.trim().toLowerCase(),
        phone: document.getElementById('phone').value.trim(),
        course_name: document.getElementById('courseName').value.trim(),
        course_category: document.getElementById('courseCategory')?.value || null
    };

    try {
        const { data, error } = await window.supabaseClient
            .from('course_enrollments')
            .insert([formData])
            .select();

        if (error) throw error;

        alert('🎉 Enrollment successful!\n\nWe\'ll send course details to your email within 24 hours.');
        event.target.reset();

    } catch (error) {
        console.error('Error:', error);
        alert('❌ Enrollment failed. Please try again.');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

/**
 * Validate form inputs (client-side validation)
 */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[0-9]{10}$/;
    return re.test(phone.replace(/\s/g, ''));
}

// Add real-time email validation
function addEmailValidation(emailInputId) {
    const emailInput = document.getElementById(emailInputId);
    if (emailInput) {
        emailInput.addEventListener('blur', function () {
            if (this.value && !validateEmail(this.value)) {
                this.style.borderColor = 'red';
                alert('Please enter a valid email address');
            } else {
                this.style.borderColor = '';
            }
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    console.log('Supabase integration loaded');

    // Add email validation to all email inputs
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', function () {
            if (this.value && !validateEmail(this.value)) {
                this.setCustomValidity('Please enter a valid email address');
            } else {
                this.setCustomValidity('');
            }
        });
    });
});
