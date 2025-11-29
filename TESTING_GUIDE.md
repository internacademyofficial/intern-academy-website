# ✅ Supabase Integration Testing Guide

## 🎯 Current Status

Your Supabase integration is **READY TO TEST**! Here's what's been set up:

### ✅ Completed Steps:
1. **Configuration Updated** - Your API keys are configured in `supabase-config.js`
2. **Forms Updated** - All registration and contact forms have proper IDs and handlers
3. **Scripts Added** - Supabase library integrated into all relevant pages
4. **Schema Ready** - Database schema prepared in `supabase-schema.sql`

---

## 🚀 STEP 1: Set Up Database (5 minutes)

### Go to Supabase SQL Editor:
1. Open your Supabase project: https://supabase.com/dashboard/project/wzeiioymnkunimumvuvr
2. Click **"SQL Editor"** in the left sidebar
3. Click **"New query"**
4. Open the file `supabase-schema.sql` in your project folder
5. **Copy ALL the SQL code** from the file
6. **Paste it** into the SQL Editor
7. Click **"Run"** ▶️
8. You should see success messages!

### Verify Tables Were Created:
1. Click **"Table Editor"** in the left sidebar
2. You should see these tables:
   - ✅ `student_registrations`
   - ✅ `company_registrations`
   - ✅ `contact_messages`
   - ✅ `internship_applications`
   - ✅ `newsletter_subscriptions`
   - ✅ `course_enrollments`

---

## 🧪 STEP 2: Test Your Forms

### Test 1: Student Registration Form
1. Open `register-student.html` in your browser
2. Fill out the form with test data:
   - Full Name: Test Student
   - Email: test@example.com
   - Phone: +91 9876543210
   - College: Test University
   - Graduation Year: 2025
   - Field of Study: Computer Science
   - Skills: JavaScript, Python
   - Interests: Web Development
3. Click **"Register"**
4. You should see: **"🎉 Registration successful! Welcome to Intern Academy!"**

### Verify in Supabase:
1. Go to Supabase → **Table Editor**
2. Select `student_registrations` table
3. You should see your test entry!

---

### Test 2: Company Registration Form
1. Open `register-company.html` in your browser
2. Fill out with test data:
   - Company Name: Test Corp
   - Contact Person: John Doe
   - Email: company@test.com
   - Phone: +91 9876543210
   - Website: https://test.com
   - Industry: Technology
   - Company Size: 11-50
   - Description: We are a test company
3. Click **"Register Company"**
4. You should see: **"🎉 Company registration successful!"**

### Verify in Supabase:
1. Go to **Table Editor** → `company_registrations`
2. Your test company should appear!

---

### Test 3: Contact Form
1. Open `contact.html` in your browser
2. Fill out the form:
   - Name: Test User
   - Email: user@test.com
   - Phone: +91 9876543210
   - Subject: General Inquiry
   - Message: This is a test message
3. Click **"Send Message"**
4. You should see: **"✅ Message sent successfully!"**

### Verify in Supabase:
1. Go to **Table Editor** → `contact_messages`
2. Your message should be there!

---

## 🔍 Common Issues & Solutions

### ❌ "Supabase is not defined" Error

**Problem**: Supabase library not loading

**Solution**:
1. Check browser console (F12)
2. Make sure you see:
   ```
   <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
   <script src="supabase-config.js"></script>
   ```
3. The Supabase CDN script must come BEFORE supabase-config.js

---

### ❌ "Failed to fetch" or CORS Error

**Problem**: Wrong API credentials or network issue

**Solution**:
1. Check `supabase-config.js`:
   - URL: `https://wzeiioymnkunimumvuvr.supabase.co`
   - Make sure there are no extra spaces or quotes
2. Check your internet connection
3. Verify your Supabase project is active

---

### ❌ "Row Level Security" Policy Error

**Problem**: RLS policies not created

**Solution**:
1. Go to Supabase SQL Editor
2. Re-run the entire `supabase-schema.sql` file
3. Make sure you ran the ENTIRE SQL (including policies at the bottom)

---

### ❌ Form Submits but No Data Appears

**Problem**: Form field IDs don't match JavaScript

**Solution**:
1. Open browser console (F12) → Check for errors
2. Make sure form fields have correct IDs:
   - **Student form**: `fullName`, `email`, `phone`, `collegeName`, etc.
   - **Company form**: `companyName`, `contactPerson`, `email`, etc.
   - **Contact form**: `name`, `email`, `phone`, `subject`, `message`

---

### ❌ Duplicate Email Error

**Problem**: Email already exists in database (this is by design!)

**Solution**:
- This is expected! The database prevents duplicate emails
- Try with a different email address
- Or delete the old record from Supabase Table Editor

---

## 📊 View Your Data in Supabase

### Option 1: Table Editor (Visual)
1. Go to **Table Editor**
2. Select any table
3. View, edit, or delete records
4. Export to CSV if needed

### Option 2: SQL Queries
1. Go to **SQL Editor**
2. Run queries like:

```sql
-- See all student registrations
SELECT * FROM student_registrations ORDER BY created_at DESC;

-- Count total students
SELECT COUNT(*) FROM student_registrations;

-- See unread contact messages
SELECT * FROM contact_messages WHERE is_read = false;

-- See all applications by status
SELECT * FROM internship_applications WHERE status = 'pending';
```

---

## 🎉 Next Steps After Testing

Once everything works:

### 1. **Test in Browser Console**
Open any page with forms and test in console:
```javascript
// Check if Supabase is loaded
console.log(supabase);

// Should show: { ... client object ... }
```

### 2. **Real-World Testing**
- Ask friends to test the forms
- Try submitting from different devices
- Test with real email addresses

### 3. **Monitor Your Data**
- Check Supabase daily for new submissions
- Export data regularly
- Set up email notifications (advanced)

### 4. **Deploy Your Website**
Your forms will work on any hosting:
- Netlify (recommended - free)
- Vercel
- GitHub Pages
- Any static hosting

The Supabase integration will work automatically!

---

## 🔒 Security Notes

✅ **SAFE** to share:
- Your `anon` public key (already in your code)
- Your Project URL

❌ **NEVER SHARE**:
- Your `service_role` key (it has full database access!)
- Your database password

The current setup is secure because:
- Only INSERT permissions are granted to public users
- Row Level Security (RLS) prevents reading others' data
- Users can submit forms but can't see what others submitted

---

## 📞 Need Help?

If something doesn't work:

1. **Check Browser Console** (F12) for error messages
2. **Check Supabase Logs**: Dashboard → Logs
3. **Verify Form IDs**: Make sure they match the JavaScript
4. **Test Simple Query**: Try a basic SQL query in Supabase editor

---

## ✅ Testing Checklist

Mark these as you test:

- [ ] Ran SQL schema in Supabase
- [ ] Verified all 6 tables were created
- [ ] Tested student registration form
- [ ] Tested company registration form
- [ ] Tested contact form
- [ ] Verified data appears in Supabase Table Editor
- [ ] Checked browser console for errors
- [ ] Tested with different email addresses
- [ ] Exported data to CSV (optional)

---

**You're all set! Your Supabase integration is complete and ready to use! 🚀**
