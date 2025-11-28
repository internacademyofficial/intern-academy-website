# Intern Academy Deployment Guide
## Domain: internacademy.co.in

---

## Table of Contents
1. [Website Hosting Options](#website-hosting)
2. [Database Setup](#database-setup)
3. [Domain Connection](#domain-connection)
4. [Complete Setup Steps](#setup-steps)

---

## 🌐 Website Hosting Options

### Option 1: Netlify (Recommended - FREE)
**Pros:**
- ✅ Free hosting forever
- ✅ Automatic HTTPS/SSL
- ✅ Easy deployment from GitHub
- ✅ Fast global CDN
- ✅ Form handling built-in

**Cons:**
- ❌ Static sites only (need external database)

### Option 2: Vercel (Alternative - FREE)
**Pros:**
- ✅ Similar to Netlify
- ✅ Great for Next.js if you upgrade later
- ✅ Free hosting

### Option 3: GoDaddy Hosting (Paid - ₹199-499/month)
**Pros:**
- ✅ Domain and hosting in one place
- ✅ cPanel access
- ✅ Can run PHP/databases

**Cons:**
- ❌ Costs money
- ❌ Slower than modern platforms

---

## 💾 Database Options for Student/Company Data

### Option 1: Firebase (Google) - RECOMMENDED
**Free Tier:**
- 1 GB storage
- 50,000 reads/day
- 20,000 writes/day

**Perfect for:**
- Student registrations
- Company registrations
- Real-time data
- User authentication

**Cost:** FREE for small/medium apps

### Option 2: Supabase (Alternative to Firebase)
**Free Tier:**
- 500 MB database
- 50,000 monthly active users
- PostgreSQL database

**Perfect for:**
- More complex queries
- SQL database lovers

**Cost:** FREE tier available

### Option 3: MongoDB Atlas
**Free Tier:**
- 512 MB storage
- Great for JSON data

---

## 🚀 COMPLETE DEPLOYMENT STEPS

### STEP 1: Prepare Your Code

1. **Install Git** (if not installed)
   ```powershell
   winget install Git.Git
   ```

2. **Create GitHub Repository**
   - Go to github.com → Create account
   - New Repository → "intern-academy"
   - Keep it Public

3. **Upload Code to GitHub**
   ```powershell
   cd c:\Users\lenovo\.gemini\antigravity\scratch\intern_academy_v2
   git init
   git add .
   git commit -m "Initial commit - Intern Academy website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/intern-academy.git
   git push -u origin main
   ```

---

### STEP 2: Deploy to Netlify

1. **Sign up on Netlify**
   - Go to: https://www.netlify.com
   - Sign up with GitHub

2. **Deploy Site**
   - Click: "Add new site" → "Import an existing project"
   - Choose: GitHub
   - Select: "intern-academy" repository
   - Build settings: Leave empty (static site)
   - Click: "Deploy site"
   
3. **Your site is live!**
   - URL: `random-name.netlify.app`

---

### STEP 3: Connect Your GoDaddy Domain

#### In Netlify:
1. Go to: Site settings → Domain management
2. Click: "Add custom domain"
3. Enter: `internacademy.co.in`
4. Click: "Verify"
5. Note down the DNS records shown

#### In GoDaddy:
1. Login to GoDaddy.com
2. Go to: "My Products" → Domains
3. Find "internacademy.co.in" → Click "DNS"
4. Click: "Add" new record

**Add these records:**

**Record 1:**
```
Type: A
Name: @
Value: 75.2.60.5
TTL: 600
```

**Record 2:**
```
Type: CNAME
Name: www
Value: your-site-name.netlify.app
TTL: 600
```

5. Click "Save"
6. Wait 15-30 minutes for DNS propagation

---

### STEP 4: Setup Firebase for Database

1. **Create Firebase Project**
   - Go to: https://firebase.google.com
   - Click: "Get started" → "Add project"
   - Name: "Intern Academy"
   - Disable Analytics (optional)
   - Click: "Create project"

2. **Setup Firestore Database**
   - Left menu → Build → Firestore Database
   - Click: "Create database"
   - Mode: Start in **test mode** (for now)
   - Location: Choose "asia-south1 (Mumbai)"
   - Click: "Enable"

3. **Get Firebase Config**
   - Project Overview (gear icon) → Project settings
   - Scroll down → "Your apps"
   - Click: Web icon (</>)
   - Register app: "Intern Academy Web"
   - Copy the firebaseConfig object

4. **Add Firebase to Your Website**
   - Open `firebase-config.js` file I created
   - Replace the placeholder values with your actual config
   - Add to your HTML files:

```html
<!-- Add before closing </body> tag in registration pages -->
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>
<script src="firebase-config.js"></script>
```

---

### STEP 5: Update Registration Forms

Your forms need to submit data to Firebase. I'll update:
- `register-student.html` 
- `register-company.html`

The forms will now save data to Firebase Firestore!

---

## 📊 Viewing Your Data

### Firebase Console:
1. Go to: https://console.firebase.google.com
2. Select: "Intern Academy" project
3. Left menu → Firestore Database
4. You'll see collections:
   - `students` → All student registrations
   - `companies` → All company registrations

### You can:
- ✅ View all entries
- ✅ Export to CSV/JSON
- ✅ Search and filter
- ✅ Manually edit/delete

---

## 💰 Costs Summary

### Recommended Setup (Almost FREE):
- **Domain:** ₹800-1200/year (GoDaddy .co.in)
- **Hosting:** FREE (Netlify)
- **Database:** FREE (Firebase - up to limits)
- **SSL:** FREE (Auto from Netlify)

**Total:** ~₹100/month for domain only!

### Alternative (GoDaddy Full):
- **Domain + Hosting:** ₹2,500-4,000/year
- **Database:** Included with hosting
- **SSL:** ₹2,000-3,000/year extra

**Total:** ~₹400-600/month

---

## 🔒 Security Setup (Important!)

### Firebase Security Rules:
After testing, update Firestore rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write to students collection
    match /students/{document} {
      allow read: if request.auth != null; // Only authenticated users
      allow create: if true; // Anyone can register
    }
    
    // Allow read/write to companies collection
    match /companies/{document} {
      allow read: if request.auth != null;
      allow create: if true; // Anyone can register
    }
  }
}
```

---

## 📞 Support & Next Steps

### After Deployment:
1. Test all forms
2. Setup email notifications (Firebase Cloud Functions)
3. Add Google Analytics
4. Setup backup system
5. Monitor usage

### Need Help?
- Netlify Docs: https://docs.netlify.com
- Firebase Docs: https://firebase.google.com/docs
- GoDaddy DNS Help: https://in.godaddy.com/help

---

## 🎯 Quick Start Command Summary

```powershell
# 1. Initialize Git
cd c:\Users\lenovo\.gemini\antigravity\scratch\intern_academy_v2
git init
git add .
git commit -m "Initial commit"

# 2. Push to GitHub (after creating repo)
git remote add origin https://github.com/YOUR_USERNAME/intern-academy.git
git push -u origin main

# 3. Then deploy via Netlify website (no commands needed)
```

---

**Your website will be live at:**
- Production: `https://internacademy.co.in`
- Development: `https://your-site.netlify.app`

Good luck! 🚀
