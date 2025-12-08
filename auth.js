// ========================================
// SUPABASE AUTHENTICATION HELPER
// Handles all authentication operations
// ========================================

/**
 * Check if user is authenticated
 */
async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
}

/**
 * Get current user
 */
async function getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
}

/**
 * Sign up new user with email and password
 */
async function signUpUser(email, password, metadata = {}) {
    try {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: metadata,
                emailRedirectTo: `${window.location.origin}/dashboard.html`
            }
        });

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Sign up error:', error);
        return { success: false, error };
    }
}

/**
 * Sign in with email and password
 */
async function signInUser(email, password) {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Sign in error:', error);
        return { success: false, error };
    }
}

/**
 * Sign out current user
 */
async function signOutUser() {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        window.location.href = 'index.html';
        return { success: true };
    } catch (error) {
        console.error('Sign out error:', error);
        return { success: false, error };
    }
}

/**
 * Send password reset email
 */
async function sendPasswordResetEmail(email) {
    try {
        const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password.html`
        });

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Password reset error:', error);
        return { success: false, error };
    }
}

/**
 * Update password (when user has reset token)
 */
async function updatePassword(newPassword) {
    try {
        const { data, error } = await supabase.auth.updateUser({
            password: newPassword
        });

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Update password error:', error);
        return { success: false, error };
    }
}

/**
 * Resend email verification
 */
async function resendVerificationEmail(email) {
    try {
        const { data, error } = await supabase.auth.resend({
            type: 'signup',
            email: email
        });

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Resend verification error:', error);
        return { success: false, error };
    }
}

/**
 * Verify OTP
 */
async function verifyOTP(email, token, type = 'email') {
    try {
        const { data, error } = await supabase.auth.verifyOtp({
            email: email,
            token: token,
            type: type
        });

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('OTP verification error:', error);
        return { success: false, error };
    }
}

/**
 * Protect page - redirect to login if not authenticated
 */
async function protectPage() {
    const session = await checkAuth();
    if (!session) {
        // Store the current page to redirect back after login
        localStorage.setItem('redirectAfterLogin', window.location.pathname);
        window.location.href = 'login.html';
    }
    return session;
}

/**
 * Update user profile in student_registrations table
 */
async function updateUserProfile(userId, profileData) {
    try {
        const { data, error } = await supabase
            .from('student_registrations')
            .upsert({
                user_id: userId,
                ...profileData,
                updated_at: new Date().toISOString()
            });

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Profile update error:', error);
        return { success: false, error };
    }
}

/**
 * Get user profile from student_registrations
 */
async function getUserProfile(userId) {
    try {
        const { data, error } = await supabase
            .from('student_registrations')
            .select('*')
            .eq('user_id', userId)
            .single();

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Get profile error:', error);
        return { success: false, error };
    }
}

/**
 * Listen to auth state changes
 */
function onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange((event, session) => {
        callback(event, session);
    });
}

/**
 * Update company profile in company_registrations table
 */
async function updateCompanyProfile(userId, companyData) {
    try {
        const { data, error } = await supabase
            .from('company_registrations')
            .upsert({
                user_id: userId,
                ...companyData,
                updated_at: new Date().toISOString()
            })
            .select()
            .single();

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Company profile update error:', error);
        return { success: false, error };
    }
}

/**
 * Get company profile from company_registrations
 */
async function getCompanyProfile(userId) {
    try {
        const { data, error } = await supabase
            .from('company_registrations')
            .select('*')
            .eq('user_id', userId)
            .single();

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Get company profile error:', error);
        return { success: false, error };
    }
}

/**
 * Change password for logged-in user
 */
async function changeUserPassword(newPassword) {
    try {
        const { data, error } = await supabase.auth.updateUser({
            password: newPassword
        });

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Password change error:', error);
        return { success: false, error };
    }
}

/**
 * Display user info in navbar (if logged in)
 */
async function updateNavbarAuth() {
    const session = await checkAuth();
    const authContainer = document.querySelector('.auth-buttons') || document.querySelector('.nav-links:last-child');

    if (!authContainer) return;

    if (session && session.user) {
        const userEmail = session.user.email;
        const userName = session.user.user_metadata?.full_name || userEmail.split('@')[0];

        authContainer.innerHTML = `
            <a href="dashboard.html" class="btn btn-secondary">
                <i class="fas fa-user"></i> ${userName}
            </a>
            <button onclick="signOutUser()" class="btn btn-primary" style="background: #dc3545;">
                <i class="fas fa-sign-out-alt"></i> Logout
            </button>
        `;
    } else {
        authContainer.innerHTML = `
            <a href="login.html" class="btn btn-outline">Login</a>
            <a href="register-student.html" class="btn btn-primary">Get Started</a>
        `;
    }
}

// Initialize auth state in navbar on page load
document.addEventListener('DOMContentLoaded', () => {
    if (typeof supabase !== 'undefined') {
        updateNavbarAuth();
    }
});
