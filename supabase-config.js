// Supabase Configuration for Intern Academy
// Replace these with your actual Supabase project credentials

const SUPABASE_URL = 'https://wzeiioymnkunimumvuvr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6ZWlpb3ltbmt1bmltdW12dXZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzNTE3NzQsImV4cCI6MjA3OTkyNzc3NH0.9_QMGXubInEviW6JGvU4S75otzuPLyQ3uWoZ47TF8w8';

// Initialize Supabase client
let supabase;

// Function to initialize Supabase when library is loaded
function initializeSupabase() {
    if (typeof window.supabase !== 'undefined' && window.supabase.createClient) {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log('✅ Supabase client initialized successfully');
        return true;
    } else {
        console.warn('⚠️ Supabase library not loaded yet, retrying...');
        return false;
    }
}

// Try to initialize immediately
if (!initializeSupabase()) {
    // If not loaded, wait for window load event
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (!initializeSupabase()) {
                console.error('❌ Failed to initialize Supabase client. Make sure the Supabase library script is loaded before this file.');
            }
        }, 100);
    });
}

// Form submission handlers

/**
 * Handle Student Registration Form Submission
 */
async function handleStudentRegistration(event) {
    event.preventDefault();

    // Check if Supabase is initialized
    if (!supabase) {
        alert('❌ Connection error. Please refresh the page and try again.');
        console.error('Supabase client not initialized');
        return;
    }

    // Show loading state
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;

    const formData = {
        full_name: document.getElementById('fullName').value.trim(),
        email: document.getElementById('email').value.trim().toLowerCase(),
        phone: document.getElementById('phone').value.trim(),
        college_name: document.getElementById('collegeName').value.trim(),
        graduation_year: parseInt(document.getElementById('graduationYear').value),
        field_of_study: document.getElementById('fieldOfStudy').value.trim(),
        skills: document.getElementById('skills').value.trim(),
        interests: document.getElementById('interests').value.trim()
    };

    try {
        const { data, error } = await supabase
            .from('student_registrations')
            .insert([formData])
            .select();

        if (error) throw error;

        // Success
        alert('🎉 Registration successful! Welcome to Intern Academy!\n\nWe\'ll send you a confirmation email shortly.');
        event.target.reset();

        // Optional: Redirect to success page
        // window.location.href = 'registration-success.html';

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
        if (error.code === '23505') {
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
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

/**
 * Handle Company Registration Form Submission
 */
async function handleCompanyRegistration(event) {
    event.preventDefault();

    // Check if Supabase is initialized
    if (!supabase) {
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
        const { data, error } = await supabase
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
    if (!supabase) {
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
        const { data, error } = await supabase
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
        const { data, error } = await supabase
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
        const { data, error } = await supabase
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
        const { data, error } = await supabase
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
