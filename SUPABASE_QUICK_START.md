# 🚀 Quick Start - Supabase Integration

Follow these steps to get Supabase working on your website in **under 10 minutes**!

## Step 1: Create Supabase Project (5 minutes)

1. Go to [supabase.com](https://supabase.com)
2. Sign up with GitHub
3. Click "New Project"
4. Fill in:
   - Name: `intern-academy`
   - Password: (choose strong password and save it!)
   - Region: `ap-south-1` (India)
5. Click "Create new project"
6. Wait 2-3 minutes ⏱️

## Step 2: Run Database Setup (2 minutes)

1. In Supabase dashboard, click **SQL Editor** (left sidebar)
2. Click "New query"
3. Open `SUPABASE_SETUP_GUIDE.md` file
4. Copy the entire **"Database Schema SQL"** section
5. Paste into SQL Editor
6. Click **"Run"** ▶️
7. You should see "Success. No rows returned"

✅ **Tables created!**

## Step 3: Get Your API Keys (1 minute)

1. Click **Settings** ⚙️ (left sidebar)
2. Click **API**
3. Copy these two values:

```
Project URL: https://xxxxx.supabase.co
anon public key: eyJhbGc...
```

## Step 4: Configure Your Website (2 minutes)

1. Open `supabase-config.js`
2. Replace line 4 with your **Project URL**:
   ```javascript
   const SUPABASE_URL = 'https://xxxxx.supabase.co';
   ```
3. Replace line 5 with your **anon key**:
   ```javascript
   const SUPABASE_ANON_KEY = 'eyJhbGc...';
   ```
4. Save the file

## Step 5: Add to Your HTML Pages

Add these lines **before the closing `</body>` tag** in pages with forms:

```html
<!-- Add to: index.html, contact.html, register-student.html, register-company.html, internships.html -->

<!-- Supabase JavaScript Client -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="supabase-config.js"></script>
```

## Step 6: Connect Forms to Handlers

### For Student Registration Form (register-student.html)
```html
<form onsubmit="handleStudentRegistration(event)">
    <!-- your form fields -->
</form>
```

### For Contact Form (contact.html)
```html
<form onsubmit="handleContactForm(event)">
    <!-- your form fields -->
</form>
```

### For Company Registration (register-company.html)
```html
<form onsubmit="handleCompanyRegistration(event)">
    <!-- your form fields -->
</form>
```

## Step 7: Test It! 🧪

1. Open your website locally or deploy it
2. Fill out a form (e.g., contact form)
3. Submit it
4. Go to Supabase → **Table Editor**
5. Select the table (e.g., `contact_messages`)
6. **You should see your data!** 🎉

## Troubleshooting

### ❌ "Supabase is not defined"
**Solution**: Make sure you added the Supabase script tag BEFORE supabase-config.js

### ❌ "Failed to fetch"
**Solution**: 
- Check if SUPABASE_URL and SUPABASE_ANON_KEY are correct
- Remove any extra spaces or quotes
- Check browser console for errors

### ❌ "Row Level Security" error
**Solution**: 
- Make sure you ran the ENTIRE SQL schema (including policies at the bottom)
- Re-run the SQL if needed

### ❌ Form submits but no data appears
**Solution**:
- Open browser console (F12) and check for errors
- Make sure form field IDs match the JavaScript (e.g., `id="fullName"`)
- Check if the table name is correct in the JavaScript

## What Forms Need Which IDs?

### Student Registration Form Fields:
```html
<input id="fullName" />
<input id="email" />
<input id="phone" />
<input id="collegeName" />
<input id="graduationYear" />
<input id="fieldOfStudy" />
<textarea id="skills"></textarea>
<textarea id="interests"></textarea>
```

### Contact Form Fields:
```html
<input id="name" />
<input id="email" />
<input id="phone" />
<input id="subject" />
<textarea id="message"></textarea>
```

### Company Registration Form Fields:
```html
<input id="companyName" />
<input id="contactPerson" />
<input id="email" />
<input id="phone" />
<input id="website" />
<input id="industry" />
<select id="companySize"></select>
<textarea id="description"></textarea>
```

## Security Note 🔒

✅ The `anon` key is **safe to expose** in your frontend code
- It only has INSERT permissions on tables
- Row Level Security (RLS) prevents unauthorized reads
- Users can only submit data, not read others' data

❌ **NEVER** expose your `service_role` key in frontend code!

## Next Steps

After basic setup works:

1. **View Data**: Go to Supabase → Table Editor
2. **Export Data**: Click "Export to CSV" in any table
3. **Add Authentication**: Enable user login/signup
4. **Email Notifications**: Set up email triggers (advanced)
5. **Build Admin Panel**: Create a dashboard to manage data

## Need Help?

- Check `SUPABASE_SETUP_GUIDE.md` for detailed explanations
- Supabase Docs: [supabase.com/docs](https://supabase.com/docs)
- Discord: [discord.supabase.com](https://discord.supabase.com)

---

**You're all set! Start collecting data! 🚀**
