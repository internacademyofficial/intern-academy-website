# 🔧 Supabase Troubleshooting Guide for Intern Academy

## ❌ Error: "Registration failed. Please try again or contact support."

This error appears when the student registration form submission fails. Here are the most common causes and solutions:

---

## 🎯 **Solution 1: Fix CORS Settings** (Most Common Issue)

When you publish your website to a custom domain, you **MUST** configure Supabase to allow requests from that domain.

### Steps:

1. **Go to Supabase Dashboard**:
   - Visit: https://app.supabase.com/
   - Login and select your project: `wzeiioymnkunimumvuvr`

2. **Navigate to Authentication Settings**:
   - Click **Authentication** in the left sidebar
   - Click **URL Configuration**
   
3. **Add Your Domain**:
   - Find **Site URL** field
   - Add: `https://internacademy.co.in`
   
4. **Add to Redirect URLs**:
   - Find **Redirect URLs** section
   - Add these URLs (one per line):
     ```
     https://internacademy.co.in
     https://www.internacademy.co.in
     https://internacademy.co.in/*
     https://www.internacademy.co.in/*
     ```

5. **Save Changes** and wait 2-3 minutes for them to take effect

---

## 📋 **Solution 2: Verify Database Tables Exist**

Make sure you've created the database tables.

### Steps:

1. **Go to Supabase Dashboard**:
   - Visit: https://app.supabase.com/project/wzeiioymnkunimumvuvr

2. **Open SQL Editor**:
   - Click **SQL Editor** in the left sidebar
   - Click **New Query**

3. **Run the Schema**:
   - Copy the entire contents of `supabase-schema.sql`
   - Paste into the SQL editor
   - Click **Run** (or press Ctrl/Cmd + Enter)

4. **Verify Tables**:
   - Click **Table Editor** in the left sidebar
   - You should see these tables:
     - ✅ `student_registrations`
     - ✅ `company_registrations`
     - ✅ `contact_messages`
     - ✅ `internship_applications`
     - ✅ `newsletter_subscriptions`
     - ✅ `course_enrollments`

---

## 🔐 **Solution 3: Check Row Level Security (RLS) Policies**

RLS might be blocking inserts if policies aren't configured correctly.

### Steps:

1. **Go to Table Editor**:
   - Click **Table Editor** → `student_registrations`

2. **Check RLS Policies**:
   - Click the **"RLS" badge** or **"Policies"** tab
   - You should see a policy named: **"Allow public insert student registrations"**
   - It should allow **INSERT** for **anon** role

3. **If Policy is Missing**:
   - Run the `supabase-schema.sql` file again (it will recreate policies)

---

## 🧪 **Solution 4: Test the Connection**

Add this temporary debugging code to check what's happening:

1. **Open Browser Console**:
   - On your website, press **F12** (or right-click → Inspect)
   - Go to the **Console** tab

2. **Check for Errors**:
   - Look for RED error messages
   - Common errors:
     - ❌ `CORS policy: No 'Access-Control-Allow-Origin'` → Go to Solution 1
     - ❌ `Failed to fetch` → Network or CORS issue
     - ❌ `permission denied for table` → Go to Solution 3
     - ❌ `relation "student_registrations" does not exist` → Go to Solution 2

3. **Test Supabase Connection**:
   - In the Console, type:
     ```javascript
     console.log('Supabase URL:', SUPABASE_URL);
     console.log('Supabase client:', supabase);
     ```
   - You should see your Supabase URL and the client object

---

## 🔍 **Solution 5: Enable Detailed Error Logging**

Temporarily add better error messages to see what's failing.

### Update `supabase-config.js`:

Find the `handleStudentRegistration` function (around line 39) and update the error handling:

```javascript
} catch (error) {
    console.error('Full Error Details:', error);
    console.error('Error Code:', error.code);
    console.error('Error Message:', error.message);
    console.error('Error Details:', error.details);
    console.error('Error Hint:', error.hint);

    if (error.code === '23505') {
        alert('❌ This email is already registered. Please use a different email or login.');
    } else if (error.message.includes('CORS')) {
        alert('❌ CORS Error: Please contact the administrator to add your domain to Supabase allowed origins.');
    } else if (error.code === '42P01') {
        alert('❌ Database table not found. Please contact the administrator.');
    } else {
        alert(`❌ Registration failed.\n\nError: ${error.message}\n\nPlease contact support with this error code: ${error.code || 'UNKNOWN'}`);
    }
}
```

This will show you the **exact error** in the browser alert.

---

## ✅ **Quick Checklist**

Before deploying, verify:

- [ ] **Supabase URL** and **API Key** are correct in `supabase-config.js`
- [ ] **Domain is added** to Supabase CORS/URL settings
- [ ] **Database tables** exist in Supabase Table Editor
- [ ] **RLS Policies** are enabled and configured
- [ ] **Form IDs** match between HTML and JavaScript
- [ ] **Browser console** shows no errors

---

## 📞 **Still Not Working?**

### Method 1: Check Browser Network Tab

1. Open **Developer Tools** (F12)
2. Go to **Network** tab
3. Submit the form
4. Look for the request to `supabase.co`
5. Click on it and check:
   - **Status Code**: Should be `200` or `201`
   - **Response**: Check for error messages
   - **Headers**: Check if CORS headers are present

### Method 2: Test with Simple Query

Run this in browser console to test basic connectivity:

```javascript
// Test Supabase connection
supabase.from('student_registrations').select('count').then(
  result => console.log('✅ Connection successful:', result),
  error => console.error('❌ Connection failed:', error)
);
```

### Method 3: Verify API Key

Make sure you're using the **anon (public)** key, NOT the service role key:

```javascript
// In supabase-config.js
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // Starts with eyJ
```

---

## 🎓 **Common Error Codes**

| Error Code | Meaning | Solution |
|------------|---------|----------|
| `23505` | Duplicate email (unique constraint) | Email already registered |
| `42P01` | Table doesn't exist | Run schema SQL |
| `42501` | Permission denied (RLS) | Check RLS policies |
| `PGRST116` | No rows returned | Query issue |
| `CORS` | Cross-origin request blocked | Add domain to Supabase |

---

## 🚀 **After Fixing**

1. **Clear browser cache** (Ctrl+Shift+Delete)
2. **Hard refresh** the page (Ctrl+F5)
3. **Try registering** again with a test email
4. **Check Supabase Table Editor** to verify the data was inserted

---

**Last Updated**: November 29, 2024  
**Supabase Project**: `wzeiioymnkunimumvuvr`  
**Domain**: `internacademy.co.in`
