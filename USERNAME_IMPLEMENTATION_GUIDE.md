# Username/Password Authentication - Complete Implementation Guide

✅ **Files Already Created:**
- `username-schema-update.sql` - Complete database schema
- `auth-helpers.js` - All validation and helper functions
- This guide with exact code to implement

## Step 1: Run Database Schema (CRITICAL FIRST STEP)

1. Go to your Supabase Dashboard
2. Click "SQL Editor" in the left sidebar
3. Open the file: `username-schema-update.sql`
4. Copy ALL the SQL and paste into Supabase SQL Editor
5. Click "RUN" - this adds username support to both tables

---

## Step 2: Update Student Registration Form

Open `register-student.html` and add the username field.

**Find this section (around line 54):**
```html
                    <div style="margin-bottom: 1rem;">
                        <label class="form-label">Email Address *</label>
                        <input type="email" id="email" class="form-control" placeholder="john@example.com" required>
                    </div>

                    <div style="margin-bottom: 1rem;">
                        <label class="form-label">Password *</label>
```

**Replace with:**
```html
                    <div style="margin-bottom: 1rem;">
                        <label class="form-label">Email Address *</label>
                        <input type="email" id="email" class="form-control" placeholder="john@example.com" required>
                    </div>

                    <div style="margin-bottom: 1rem;">
                        <label class="form-label">Username *</label>
                        <input type="text" id="username" class="form-control" placeholder="john_doe" 
                            minlength="3" maxlength="20" pattern="[a-zA-Z0-9_-]+" required>
                        <small id="usernameFeedback" style="font-size: 0.85rem; display: block; margin-top: 0.25rem; color: var(--text-secondary);"></small>
                        <small style="color: var(--text-secondary); font-size: 0.85rem;">
                            3-20 characters: letters, numbers, underscores, hyphens
                        </small>
                    </div>

                    <div style="margin-bottom: 1rem;">
                        <label class="form-label">Password *</label>
```

**Then find the scripts section at the BOTTOM (around line 132):**
```html
    <script src="app.js"></script>
    <!-- Supabase JavaScript Client -->
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <script src="supabase-config.js"></script>
    <script src="auth.js"></script>
</body>
```

**Replace with:**
```html
    <script src="app.js"></script>
    <!-- Supabase JavaScript Client -->
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <script src="supabase-config.js"></script>
    <script src="auth-helpers.js"></script>
    <script src="auth.js"></script>
    
    <script>
        // Initialize username validation
        document.addEventListener('DOMContentLoaded', () => {
            if (typeof addUsernameValidation === 'function') {
                addUsernameValidation('username', 'usernameFeedback');
            }
        });
    </script>
</body>
```

---

## Step 3: Update Student Registration Handler

Open `supabase-config.js` and find the `handleStudentRegistration` function (starts around line 39).

**Find this code (around line 50-59):**
```javascript
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
```

**Replace with:**
```javascript
    // Get form values
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim().toLowerCase();
    const username = document.getElementById('username')?.value.trim().toLowerCase();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const phone = document.getElementById('phone').value.trim();
    const collegeName = document.getElementById('collegeName').value.trim();
    const graduationYear = parseInt(document.getElementById('graduationYear').value);
    const fieldOfStudy = document.getElementById('fieldOfStudy').value.trim();
    const skills = document.getElementById('skills').value.trim();
    const interests = document.getElementById('interests').value.trim();

    // Validate username if provided
    if (username && typeof validateUsername === 'function') {
        const usernameValidation = validateUsername(username);
        if (!usernameValidation.valid) {
            alert('❌ ' + usernameValidation.error);
            return;
        }

        // Check username availability
        if (typeof checkUsernameAvailable === 'function') {
            const availabilityCheck = await checkUsernameAvailable(username);
            if (!availabilityCheck.available) {
                alert('❌ Username already taken. Please choose a different username.');
                return;
            }
        }
    }
```

**Find the auth signup code (around line 75-82):**
```javascript
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
```

**Replace with:**
```javascript
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    full_name: fullName,
                    phone: phone,
                    username: username,
                    user_type: 'student'
                },
                emailRedirectTo: `${window.location.origin}/dashboard.html`
            }
        });
```

**Find the database insert code (around line 90-102):**
```javascript
        const { data: profileData, error: profileError } = await supabase
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
```

**Replace with:**
```javascript
        const { data: profileData, error: profileError } = await supabase
            .from('student_registrations')
            .insert([{
                user_id: authData.user.id,
                full_name: fullName,
                email: email,
                username: username,
                phone: phone,
                college_name: collegeName,
                graduation_year: graduationYear,
                field_of_study: fieldOfStudy,
                skills: skills,
                interests: interests
            }])
            .select();
```

---

## Step 4: Update Company Registration Form

Open `register-company.html`.

**ADD username field after email (find email field around line 58, add after it):**
```html
                    <div style="margin-bottom: 1rem;">
                        <label class="form-label">Work Email *</label>
                        <input type="email" id="email" class="form-control" placeholder="hr@acmecorp.com" required>
                    </div>

                    <div style="margin-bottom: 1rem;">
                        <label class="form-label">Username *</label>
                        <input type="text" id="username" class="form-control" placeholder="acme_corp" 
                            minlength="3" maxlength="20" pattern="[a-zA-Z0-9_-]+" required>
                        <small id="companyUsernameFeedback" style="font-size: 0.85rem; display: block; margin-top: 0.25rem; color: var(--text-secondary);"></small>
                        <small style="color: var(--text-secondary);font-size: 0.85rem;">
                            3-20 characters: letters, numbers, underscores, hyphens
                        </small>
                    </div>

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

**Add scripts at bottom (before </body>):**
```html
    <script src="app.js"></script>
    <!-- Supabase JavaScript Client -->
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <script src="supabase-config.js"></script>
    <script src="auth-helpers.js"></script>
    
    <script>
        // Initialize username validation
        document.addEventListener('DOMContentLoaded', () => {
            if (typeof addUsernameValidation === 'function') {
                addUsernameValidation('username', 'companyUsernameFeedback');
            }
        });
    </script>
</body>
```

---

## Step 5: UPDATE Company Registration Handler

This is the most important change! Open `supabase-config.js` and COMPLETELY REPLACE the `handleCompanyRegistration` function (starts around line 157).

**Find:**
```javascript
async function handleCompanyRegistration(event) {
```

**Replace THE ENTIRE FUNCTION with this:**

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
    const email = document.getElementById('email').value.trim().toLowerCase();
    const username = document.getElementById('username')?.value.trim().toLowerCase();
    const password = document.getElementById('password')?.value;
    const confirmPassword = document.getElementById('confirmPassword')?.value;
    const phone = document.getElementById('phone').value.trim();
    const website = document.getElementById('website').value.trim();
    const industry = document.getElementById('industry').value.trim();
    const companySize = document.getElementById('companySize').value;
    const description = document.getElementById('description').value.trim();

    // Validate username if provided
    if (username && typeof validateUsername === 'function') {
        const usernameValidation = validateUsername(username);
        if (!usernameValidation.valid) {
            alert('❌ ' + usernameValidation.error);
            return;
        }

        if (typeof checkUsernameAvailable === 'function') {
            const availabilityCheck = await checkUsernameAvailable(username);
            if (!availabilityCheck.available) {
                alert('❌ Username already taken. Please choose a different username.');
                return;
            }
        }
    }

    // Validate passwords match (if password fields exist)
    if (password && confirmPassword && password !== confirmPassword) {
        alert('❌ Passwords do not match!');
        return;
    }

    const submitBtn = event.target.querySelector('button[type=\"submit\"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
    submitBtn.disabled = true;

    try {
        let user_id = null;

        // If password is provided, create auth user
        if (password) {
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
            user_id = authData.user.id;
        }

        // Save company profile
        const { data, error } = await supabase
            .from('company_registrations')
            .insert([{
                user_id: user_id,
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

        if (error) throw error;

        if (password) {
            alert('🎉 Registration Successful!\\n\\n✉️ Please check your email to verify your account.');
            setTimeout(() => {
                window.location.href = 'verify-email.html?email=' + encodeURIComponent(email);
            }, 2000);
        } else {
            alert('🎉 Company registration successful!\\n\\nOur team will review your application and contact you within 2-3 business days.');
        }
        
        event.target.reset();

    } catch (error) {
        console.error('Company registration error:', error);
        
        if (error.code === '23505') {
            alert('❌ This email or username is already registered.');
        } else if (error.message?.includes('already registered')) {
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

---

## Step 6: Update Login to Support Username

Open `login.html`:

**Find (around line 51):**
```html
                        <label class="form-label">Email Address *</label>
                        <input type="email" id="email" class="form-control" placeholder="your@example.com" required>
```

**Replace with:**
```html
                        <label class="form-label">Email or Username *</label>
                        <input type="text" id="email" class="form-control" placeholder="your@example.com or username" required>
```

**Find the handleLogin function (around line 106), REPLACE IT with:**

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
                if (typeof isEmail === 'function' && !isEmail(loginInput)) {
                    // Look up email from username
                    if (typeof getUsernameEmail === 'function') {
                        const result = await getUsernameEmail(loginInput);
                        if (result.error || !result.email) {
                            throw new Error('Username not found');
                        }
                        email = result.email;
                    }
                }

                // Login with email
                const { data, error } = await supabase.auth.signInWithPassword({
                    email: email,
                    password: password
                });

                if (error) throw error;

                // Check email verification
                if (!data.user.email_confirmed_at) {
                    alert('⚠️ Email Not Verified\\n\\nPlease check your email and click the verification link before logging in.');
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    return;
                }

                // Success!
                alert('✅ Login Successful!\\n\\nWelcome back, ' + (data.user.user_metadata.full_name || 'User') + '!');

                const redirectTo = localStorage.getItem('redirectAfterLogin') || 'dashboard.html';
                localStorage.removeItem('redirectAfterLogin');
                window.location.href = redirectTo;

            } catch (error) {
                console.error('Login error:', error);

                if (error.message === 'Username not found') {
                    alert('❌ Username not found\\n\\nPlease check your username or use your email address.');
                } else if (error.message.includes('Invalid login credentials')) {
                    alert('❌ Invalid Email or Password\\n\\nPlease check your credentials and try again.');
                } else if (error.message.includes('Email not confirmed')) {
                    alert('⚠️ Email Not Verified\\n\\nPlease check your email and click the verification link.');
                } else {
                    alert('❌ Login Failed\\n\\n' + error.message);
                }

                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        }
```

**Add auth-helpers script before closing body tag:**
```html
    <script src="app.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <script src="supabase-config.js"></script>
    <script src="auth-helpers.js"></script>
    <script src="auth.js"></script>

    <script>
        // Login handler code above
    </script>
</body>
```

---

## Testing Checklist

1. ✅ **Run SQL in Supabase** first!
2. Test student registration with username
3. Test company registration with username and password
4. Test login with email
5. Test login with username
6. Check database records in Supabase

## Files Reference
- Database schema: `username-schema-update.sql`
- Helper functions: `auth-helpers.js`
- This guide: You're reading it!
