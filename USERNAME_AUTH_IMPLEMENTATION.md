# Username/Password Auth Implementation - README

## What Has Been Completed

✅ **Database Schema** - `username-schema-update.sql`
- SQL script to add `username` columns to both `student_registrations` and `company_registrations` tables
- Unique constraints and format validation (3-20 chars, alphanumeric + underscores/hyphens)
- Helper functions:  `is_username_available()` and `get_email_from_username()`
- Database indexes for performance

✅ **Auth Helper Utilities** - `auth-helpers.js`
- `validateUsername(username)` - Format validation
- `isEmail(input)` - Detect if input is email or username
- `checkUsernameAvailable(username)` - Async check against database
- `getUsernameEmail(username)` - Look up email from username
- `addUsernameValidation(inputId, feedbackId)` - Real-time validation for form inputs

## What Still Needs To Be Done

### 1. Apply Database Schema
Run the SQL in Supabase SQL Editor:
```
c:\Users\lenovo\.gemini\antigravity\scratch\intern_academy_v2\username-schema-update.sql
```

### 2. Update Student Registration Form
Edit `register-student.html`:

**Add username field after email (around line 54):**
```html
<div style="margin-bottom: 1rem;">
    <label class="form-label">Username *</label>
    <input type="text" id="username" class="form-control" placeholder="Choose a unique username" 
        minlength="3" maxlength="20" pattern="[a-zA-Z0-9_-]+" required>
    <small id="usernameFeedback" style="font-size: 0.85rem; display: block; margin-top: 0.25rem;"></small>
    <small style="color: var(--text-secondary); font-size: 0.85rem;">
        3-20 characters, letters, numbers, underscores, and hyphens only
    </small>
</div>
```

**Add auth-helpers.js script (before closing body tag):**
```html
<script src="auth-helpers.js"></script>
<script>
    document.addEventListener('DOMContentLoaded', () => {
        addUsernameValidation('username', 'usernameFeedback');
    });
</script>
```

### 3. Update Student Registration Handler
Edit `handleStudentRegistration` in `supabase-config.js` (around line 39):

**Add username extraction:**
```javascript
const username = document.getElementById('username').value.trim().toLowerCase();
```

**Validate username format:**
```javascript
const usernameValidation = validateUsername(username);
if (!usernameValidation.valid) {
    alert('❌ ' + usernameValidation.error);
    return;
}
```

**Check username availability:**
```javascript
const availabilityCheck = await checkUsernameAvailable(username);
if (!availabilityCheck.available) {
    alert('❌ Username already taken. Please choose a different username.');
    return;
}
```

**Add username to auth metadata (in signUp options.data):**
```javascript
options: {
    data: {
        full_name: fullName,
        phone: phone,
        username: username  // ADD THIS
    },
    // ...
}
```

**Add username to student_registrations insert:**
```javascript
.insert([{
    user_id: authData.user.id,
    full_name: fullName,
    email: email,
    username: username,  // ADD THIS
    phone: phone,
    // ... rest of fields
}])
```

### 4. Update Company Registration Form
Edit `register-company.html`:

**Add username field after email:**
```html
<div style="margin-bottom: 1rem;">
    <label class="form-label">Username *</label>
    <input type="text" id="username" class="form-control" placeholder="Choose a unique username" 
        minlength="3" maxlength="20" pattern="[a-zA-Z0-9_-]+" required>
    <small id="usernameFeedback" style="font-size: 0.85rem;"></small>
</div>
```

**Add password fields:**
```html
<div style="margin-bottom: 1rem;">
    <label class="form-label">Password *</label>
    <input type="password" id="password" class="form-control" placeholder="Create a strong password"
        minlength="6" required>
    <small style="color: var(--text-secondary); font-size: 0.85rem;">
        Must be at least 6 characters
    </small>
</div>

<div style="margin-bottom: 1rem;">
    <label class="form-label">Confirm Password *</label>
    <input type="password" id="confirmPassword" class="form-control"
        placeholder="Re-enter your password" minlength="6" required>
</div>
```

**Add auth-helpers.js script:**
```html
<script src="auth-helpers.js"></script>
<script>
    document.addEventListener('DOMContentLoaded', () => {
        addUsernameValidation('username', 'usernameFeedback');
    });
</script>
```

### 5. Rewrite Company Registration Handler
Completely rewrite `handleCompanyRegistration` in `supabase-config.js` to match student pattern:

```javascript
async function handleCompanyRegistration(event) {
    event.preventDefault();

    if (!supabase) {
        alert('❌ Connection error. Please refresh the page and try again.');
        return;
    }

    // Get form values
    const companyName = document.getElementById('companyName').value.trim();
    const contactPerson = document.getElementById('contactPerson').value.trim();
    const email = document.getElement ById('email').value.trim().toLowerCase();
    const username = document.getElementById('username').value.trim().toLowerCase();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const phone = document.getElementById('phone').value.trim();
    const website = document.getElementById('website').value.trim();
    const industry = document.getElementById('industry').value.trim();
    const companySize = document.getElementById('companySize').value;
    const description = document.getElementById('description').value.trim();

    // Validate passwords match
    if (password !== confirmPassword) {
        alert('❌ Passwords do not match!');
        return;
    }

    // Validate username
    const usernameValidation = validateUsername(username);
    if (!usernameValidation.valid) {
        alert('❌ ' + usernameValidation.error);
        return;
    }

    // Check username availability
    const availabilityCheck = await checkUsernameAvailable(username);
    if (!availabilityCheck.available) {
        alert('❌ Username already taken. Please choose a different username.');
        return;
    }

    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
    submitBtn.disabled = true;

    try {
        // Step 1: Sign up with Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    full_name: contactPerson,
                    company_name: companyName,
                    username: username,
                    user_type: 'company'
                },
                emailRedirectTo: `${window.location.origin}/company-dashboard.html`
            }
        });

        if (authError) throw authError;

        // Step 2: Save company profile
        const { data: profileData, error: profileError } = await supabase
            .from('company_registrations')
            .insert([{
                user_id: authData.user.id,
                company_name: companyName,
                contact_person: contactPerson,
                email: email,
                username: username,
                phone: phone,
                website: website,
                industry: industry,
                company_size: companySize,
                description: description
            }])
            .select();

        if (profileError) throw profileError;

        alert('🎉 Registration Successful!\\n\\n✉️ Please check your email to verify your account.');
        event.target.reset();
        
        setTimeout(() => {
            window.location.href = 'verify-email.html?email=' + encodeURIComponent(email);
        }, 2000);

    } catch (error) {
        console.error('Company registration error:', error);
        
        if (error.message?.includes('already registered')) {
            alert('❌ This email is already registered.');
        } else {
            alert('❌ Registration failed: ' + error.message);
        }
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}
```

### 6. Update Login System
Edit `login.html`:

**Change label:**
```html
<label class="form-label">Email or Username *</label>
<input type="text" id="email" class="form-control" placeholder="your@example.com or username" required>
```

**Update handleLogin function:**
```javascript
async function handleLogin(event) {
    event.preventDefault();

    let loginInput = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
    submitBtn.disabled = true;

    try {
        let email = loginInput;

        // Check if input is username instead of email
        if (!isEmail(loginInput)) {
            // Look up email from username
            const result = await getUsernameEmail(loginInput);
            if (result.error || !result.email) {
                throw new Error('Username not found');
            }
            email = result.email;
        }

        // Now login with email
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) throw error;

        // Check email verification
        if (!data.user.email_confirmed_at) {
            alert('⚠️ Email Not Verified\\n\\nPlease check your email and click the verification link.');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            return;
        }

        // Success!
        alert('✅ Login Successful!');
        
        const redirectTo = localStorage.getItem('redirectAfterLogin') || 'dashboard.html';
        localStorage.removeItem('redirectAfterLogin');
        window.location.href = redirectTo;

    } catch (error) {
        console.error('Login error:', error);
        
        if (error.message === 'Username not found') {
            alert('❌ Username not found. Please check your username or use your email address.');
        } else if (error.message.includes('Invalid login credentials')) {
            alert('❌ Invalid credentials. Please check your login details.');
        } else {
            alert('❌ Login Failed: ' + error.message);
        }

        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}
```

## Testing Steps

1. Run SQL in Supabase
2. Test student registration with username
3. Test company registration with username/password
4. Test login with email
5. Test login with username
6. Verify database records

## Files Created
- `username-schema-update.sql` - Database schema
- `auth-helpers.js` - Authentication utilities
- This README for manual completion
