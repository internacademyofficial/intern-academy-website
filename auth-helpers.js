// ========================================
// AUTHENTICATION HELPER UTILITIES
// Username validation and lookup functions
// ========================================

/**
 * Validate username format
 * @param {string} username - Username to validate
 * @returns {object} {valid: boolean, error: string}
 */
function validateUsername(username) {
    if (!username || username.trim().length === 0) {
        return { valid: false, error: 'Username is required' };
    }

    const trimmedUsername = username.trim();

    // Check length
    if (trimmedUsername.length < 3) {
        return { valid: false, error: 'Username must be at least 3 characters' };
    }
    if (trimmedUsername.length > 20) {
        return { valid: false, error: 'Username must be no more than 20 characters' };
    }

    // Check format (alphanumeric, underscores, hyphens only)
    const usernameRegex = /^[a-zA-Z0-9_-]+$/;
    if (!usernameRegex.test(trimmedUsername)) {
        return { valid: false, error: 'Username can only contain letters, numbers, underscores, and hyphens' };
    }

    return { valid: true, error: null };
}

/**
 * Check if input is an email address
 * @param {string} input - Input string to check
 * @returns {boolean} True if input looks like an email
 */
function isEmail(input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
}

/**
 * Check if username is available (not taken)
 * @param {string} username - Username to check
 * @returns {Promise<object>} {available: boolean, error: string}
 */
async function checkUsernameAvailable(username) {
    if (!supabase) {
        return { available: false, error: 'Database connection not initialized' };
    }

    try {
        // Call the database function to check availability
        const { data, error } = await supabase.rpc('is_username_available', {
            check_username: username
        });

        if (error) throw error;

        return { available: data === true, error: null };
    } catch (error) {
        console.error('Username availability check error:', error);
        return { available: false, error: 'Could not verify username availability' };
    }
}

/**
 * Get email address from username
 * @param {string} username - Username to lookup
 * @returns {Promise<object>} {email: string, error: string}
 */
async function getUsernameEmail(username) {
    if (!supabase) {
        return { email: null, error: 'Database connection not initialized' };
    }

    try {
        // Call the database function to get email from username
        const { data, error } = await supabase.rpc('get_email_from_username', {
            lookup_username: username
        });

        if (error) throw error;

        if (!data) {
            return { email: null, error: 'Username not found' };
        }

        return { email: data, error: null };
    } catch (error) {
        console.error('Username lookup error:', error);
        return { email: null, error: 'Could not find username' };
    }
}

/**
 * Add real-time username validation to an input field
 * @param {string} inputId - ID of the username input element
 * @param {string} feedbackId - ID of the feedback element (optional)
 */
function addUsernameValidation(inputId, feedbackId = null) {
    const usernameInput = document.getElementById(inputId);
    const feedbackElement = feedbackId ? document.getElementById(feedbackId) : null;

    if (!usernameInput) return;

    let checkTimeout;

    usernameInput.addEventListener('input', function () {
        const username = this.value.trim();

        // Clear previous timeout
        if (checkTimeout) clearTimeout(checkTimeout);

        // Validate format first
        const formatValidation = validateUsername(username);

        if (!formatValidation.valid) {
            this.style.borderColor = '#dc3545';
            if (feedbackElement) {
                feedbackElement.textContent = formatValidation.error;
                feedbackElement.style.color = '#dc3545';
            }
            return;
        }

        // Show checking state
        if (feedbackElement) {
            feedbackElement.textContent = 'Checking availability...';
            feedbackElement.style.color = '#6c757d';
        }

        // Check availability after 500ms delay
        checkTimeout = setTimeout(async () => {
            const availabilityCheck = await checkUsernameAvailable(username);

            if (availabilityCheck.available) {
                usernameInput.style.borderColor = '#28a745';
                if (feedbackElement) {
                    feedbackElement.textContent = '✓ Username available';
                    feedbackElement.style.color = '#28a745';
                }
            } else {
                usernameInput.style.borderColor = '#dc3545';
                if (feedbackElement) {
                    feedbackElement.textContent = availabilityCheck.error || '✗ Username already taken';
                    feedbackElement.style.color = '#dc3545';
                }
            }
        }, 500);
    });

    // Reset on blur if empty
    usernameInput.addEventListener('blur', function () {
        if (!this.value.trim()) {
            this.style.borderColor = '';
            if (feedbackElement) {
                feedbackElement.textContent = '';
            }
        }
    });
}

/**
 * Sanitize username input (remove invalid characters, enforce lowercase)
 * @param {string} username - Username to sanitize
 * @returns {string} Sanitized username
 */
function sanitizeUsername(username) {
    if (!username) return '';
    return username
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9_-]/g, ''); // Remove invalid characters
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateUsername,
        isEmail,
        checkUsernameAvailable,
        getUsernameEmail,
        addUsernameValidation,
        sanitizeUsername
    };
}
