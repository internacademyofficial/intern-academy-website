// ========================================
// SUPABASE AUTHENTICATION HELPER
// ========================================

/**
 * Returns the active session or null.
 */
async function checkAuth() {
    const { data: { session } } = await window.supabaseClient.auth.getSession();
    return session;
}

/**
 * Returns the current authenticated user or null.
 */
async function getCurrentUser() {
    const { data: { user } } = await window.supabaseClient.auth.getUser();
    return user;
}

/**
 * Sign out then redirect to index.
 */
async function signOutUser() {
    try {
        const { error } = await window.supabaseClient.auth.signOut();
        if (error) throw error;
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Sign out error:', error);
        window.location.href = 'index.html';
    }
}

/**
 * Send password reset email.
 */
async function sendPasswordResetEmail(email) {
    try {
        const { error } = await window.supabaseClient.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password.html`
        });
        if (error) throw error;
        return { success: true };
    } catch (error) {
        console.error('Password reset error:', error);
        return { success: false, error };
    }
}

/**
 * Change password for the currently logged-in user.
 */
async function changeUserPassword(newPassword) {
    try {
        const { error } = await window.supabaseClient.auth.updateUser({ password: newPassword });
        if (error) throw error;
        return { success: true };
    } catch (error) {
        console.error('Password change error:', error);
        return { success: false, error };
    }
}

/**
 * Resend email verification link.
 */
async function resendVerificationEmail(email) {
    try {
        const { error } = await window.supabaseClient.auth.resend({
            type: 'signup',
            email
        });
        if (error) throw error;
        return { success: true };
    } catch (error) {
        console.error('Resend verification error:', error);
        return { success: false, error };
    }
}

/**
 * Update student profile in student_registrations.
 */
async function updateUserProfile(userId, profileData) {
    try {
        const { data, error } = await window.supabaseClient
            .from('student_registrations')
            .update({ ...profileData, updated_at: new Date().toISOString() })
            .eq('user_id', userId)
            .select();

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Profile update error:', error);
        return { success: false, error };
    }
}

/**
 * Get student profile from student_registrations.
 */
async function getUserProfile(userId) {
    try {
        const { data, error } = await window.supabaseClient
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
 * Update company profile in company_registrations.
 */
async function updateCompanyProfile(userId, companyData) {
    try {
        const { data, error } = await window.supabaseClient
            .from('company_registrations')
            .update({ ...companyData, updated_at: new Date().toISOString() })
            .eq('user_id', userId)
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
 * Get company profile from company_registrations.
 */
async function getCompanyProfile(userId) {
    try {
        const { data, error } = await window.supabaseClient
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
 * Update navbar to show user's name/logout if logged in.
 * Routes companies to company-dashboard.html, students to dashboard.html.
 */
async function updateNavbarAuth() {
    const session = await checkAuth();
    const authContainer = document.querySelector('.auth-buttons') || document.querySelector('.nav-links:last-child');
    if (!authContainer) return;

    if (session && session.user) {
        const meta        = session.user.user_metadata || {};
        const isCompany   = !!(meta.company_name);
        const dashLink    = isCompany ? 'company-dashboard.html' : 'dashboard.html';
        const displayName = meta.full_name || meta.company_name || session.user.email.split('@')[0];

        authContainer.innerHTML = `
            <a href="${dashLink}" class="btn btn-secondary">
                <i class="fas fa-user"></i> ${displayName}
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

/**
 * Sign in with Google OAuth.
 */
async function handleGoogleSignIn() {
    try {
        const { error } = await window.supabaseClient.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/dashboard.html`,
                queryParams: { access_type: 'offline', prompt: 'consent' }
            }
        });
        if (error) throw error;
    } catch (error) {
        console.error('Google sign-in error:', error);
        alert('❌ Failed to sign in with Google: ' + error.message);
    }
}

// Initialize auth state in navbar on page load
document.addEventListener('DOMContentLoaded', () => {
    if (window.supabaseClient) {
        updateNavbarAuth();
    }
});
