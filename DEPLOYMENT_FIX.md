# 🚀 Quick Fix for "Registration Failed" Error

## 📍 **What's Happening?**

You're seeing: **"Registration failed. Please try again or contact support."** on your live website (`internacademy.co.in`).

This is a **CORS (Cross-Origin Resource Sharing)** issue. Your custom domain needs to be whitelisted in Supabase.

---

## ✅ **THE SOLUTION** (5 minutes)

### **Step 1: Go to Supabase Dashboard**
1. Visit: https://app.supabase.com/
2. Login with your account
3. Select your project: **wzeiioymnkunimumvuvr**

### **Step 2: Configure URL Settings**
1. Click **Authentication** (🔐 icon) in the left sidebar
2. Click **URL Configuration**
3. Find the **"Site URL"** field
4. Enter: `https://internacademy.co.in`

### **Step 3: Add Redirect URLs**
In the **"Redirect URLs"** section, add these (one per line):
```
https://internacademy.co.in
https://www.internacademy.co.in
https://internacademy.co.in/*
https://www.internacademy.co.in/*
```

### **Step 4: Save Changes**
1. Click **Save** at the bottom
2. Wait **2-3 minutes** for changes to propagate
3. **Clear your browser cache** (Ctrl+Shift+Delete)
4. **Refresh** your website (Ctrl+F5)
5. Try registering again!

---

## 🧪 **Test Your Fix**

### Option 1: Use the Diagnostic Page
1. Upload `test-supabase.html` to your website
2. Visit: `https://internacademy.co.in/test-supabase.html`
3. Click **"Run Tests"**
4. Click **"Test Insert"**
5. If you see ✅ green checkmarks, it's working!

### Option 2: Check Browser Console
1. Go to your registration page
2. Press **F12** to open Developer Tools
3. Go to **Console** tab
4. Try to register
5. Check for detailed error messages (now with better logging!)

---

## 📋 **Other Possible Issues**

If CORS fix doesn't work, check these:

### ❌ **Database Tables Not Created**
**Symptoms**: Error code `42P01`

**Fix**:
1. Go to Supabase Dashboard → **SQL Editor**
2. Copy contents of `supabase-schema.sql`
3. Paste and click **Run**

### ❌ **RLS Policies Missing**
**Symptoms**: Error code `42501` (Permission denied)

**Fix**:
1. Go to **Table Editor** → `student_registrations`
2. Check if RLS is enabled with policies
3. If not, run `supabase-schema.sql` again

### ❌ **Wrong API Key**
**Symptoms**: Authentication errors

**Fix**:
1. Go to **Settings** → **API**
2. Copy the **anon public** key (NOT the service_role key)
3. Update `supabase-config.js`:
```javascript
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY_HERE';
```

---

## 🎯 **What I've Fixed**

### 1. **Enhanced Error Messages** ✅
- Updated `supabase-config.js` with detailed error logging
- Errors now show in browser console with helpful hints
- Users get specific error messages instead of generic ones

### 2. **Created Diagnostic Tool** ✅
- File: `test-supabase.html`
- Automatically tests connection
- Identifies exact issue
- Works on live domain

### 3. **Troubleshooting Guide** ✅
- File: `SUPABASE_TROUBLESHOOTING.md`
- Complete step-by-step solutions
- Error code reference table
- Quick checklist

---

## 📞 **Still Not Working?**

1. **Upload test-supabase.html to your domain**
2. **Visit it and run the tests**
3. **Take a screenshot** of the results
4. **Share the screenshot** and I'll help you fix it!

Or check the browser console for the detailed error output (now much more informative!).

---

## 🎓 **Files Modified**

| File | What Changed |
|------|--------------|
| `supabase-config.js` | ✅ Better error handling & logging |
| `test-supabase.html` | ✅ NEW: Diagnostic test page |
| `SUPABASE_TROUBLESHOOTING.md` | ✅ NEW: Complete guide |
| `DEPLOYMENT_FIX.md` | ✅ NEW: This quick fix guide |

---

**Last Updated**: November 29, 2024 09:57 IST  
**Issue**: CORS error on custom domain  
**Status**: Ready to fix ✅  
**Estimated Fix Time**: 5 minutes

---

## 🚀 **Next Steps**

1. ✅ Follow Step 1-4 above
2. ✅ Wait 2-3 minutes
3. ✅ Test the registration
4. 🎉 Celebrate when it works!

Good luck! 🍀
