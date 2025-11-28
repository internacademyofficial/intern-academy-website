# Step-by-Step Setup Guide for Intern Academy
## Complete Walkthrough: GitHub → Firebase → Netlify → GoDaddy

---

## 📌 PART 1: GitHub Personal Access Token

### Why You Need This:
GitHub doesn't accept passwords anymore. You need a Personal Access Token (PAT) to push code.

### Steps:

1. **Go to GitHub Settings**
   - Visit: https://github.com/settings/tokens
   - Or: Click your profile picture → Settings → Developer settings → Personal access tokens → Tokens (classic)

2. **Generate New Token**
   - Click: **"Generate new token"** → **"Generate new token (classic)"**

3. **Configure Token**
   - **Note:** `Intern Academy Website`
   - **Expiration:** `90 days` (or No expiration if you prefer)
   - **Select scopes:** Check these boxes:
     - ✅ `repo` (Full control of private repositories)
     - ✅ `workflow` (Update GitHub Action workflows)

4. **Generate Token**
   - Scroll down → Click **"Generate token"**
   - **IMPORTANT:** Copy the token immediately!
   - It looks like: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - **Save it somewhere safe** - you won't see it again!

5. **Use Token as Password**
   When Git asks for password, paste this token instead.

---

## 📌 PART 2: Firebase Setup (Database for Student/Company Registrations)

### Step 2.1: Create Firebase Project

1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com
   - Click **"Get Started"** or **"Add project"**

2. **Create Project**
   - **Project name:** `Intern Academy`
   - Click **"Continue"**
   
3. **Google Analytics** (Optional)
   - Toggle OFF if you don't want analytics
   - Click **"Continue"**
   
4. **Wait for Creation**
   - Takes 30 seconds
   - Click **"Continue"** when done

---

### Step 2.2: Setup Firestore Database

1. **Navigate to Firestore**
   - Left sidebar → **"Build"** → **"Firestore Database"**
   - Click **"Create database"**

2. **Choose Location**
   - Select: **"Start in test mode"** (we'll secure it later)
   - Click **"Next"**

3. **Select Region**
   - Choose: **"asia-south1 (Mumbai)"** - closest to India
   - Click **"Enable"**
   - Wait 1-2 minutes for setup

4. **Database Created!** ✅
   - You'll see an empty database
   - This is where student/company data will be stored

---

### Step 2.3: Get Firebase Configuration

1. **Go to Project Settings**
   - Click the **gear icon** ⚙️ next to "Project Overview"
   - Select **"Project settings"**

2. **Add Web App**
   - Scroll down to **"Your apps"**
   - Click the **Web icon** `</>`

3. **Register App**
   - **App nickname:** `Intern Academy Web`
   - ✅ Check **"Also set up Firebase Hosting"** (optional)
   - Click **"Register app"**

4. **Copy Configuration**
   - You'll see a code snippet like this:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXX",
     authDomain: "intern-academy-xxxx.firebaseapp.com",
     projectId: "intern-academy-xxxx",
     storageBucket: "intern-academy-xxxx.appspot.com",
     messagingSenderId: "123456789012",
     appId: "1:123456789012:web:abcdef123456789"
   };
   ```
   
5. **Save This Configuration**
   - Copy the entire `firebaseConfig` object
   - We'll use it in Step 2.4

6. **Click "Continue to console"**

---

### Step 2.4: Update firebase-config.js

1. **Open the file:**
   ```
   c:\Users\lenovo\.gemini\antigravity\scratch\intern_academy_v2\firebase-config.js
   ```

2. **Replace the placeholder values** with your actual config:
   ```javascript
   const firebaseConfig = {
       apiKey: "YOUR_ACTUAL_API_KEY",  // Paste your real values here
       authDomain: "YOUR_ACTUAL_PROJECT_ID.firebaseapp.com",
       projectId: "YOUR_ACTUAL_PROJECT_ID",
       storageBucket: "YOUR_ACTUAL_PROJECT_ID.appspot.com",
       messagingSenderId: "YOUR_ACTUAL_SENDER_ID",
       appId: "YOUR_ACTUAL_APP_ID"
   };
   ```

3. **Save the file**

---

### Step 2.5: Add Firebase to HTML Pages

Add these script tags to your registration pages:

**In `register-student.html` - before closing `</body>` tag:**
```html
<!-- Firebase SDKs -->
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>
<script src="firebase-config.js"></script>
```

**Same for `register-company.html`**

---

## 📌 PART 3: Deploy to Netlify

### Step 3.1: Sign Up for Netlify

1. **Go to Netlify**
   - Visit: https://app.netlify.com/signup
   - Click **"GitHub"** to sign up with your GitHub account
   - Authorize Netlify to access your GitHub

2. **Welcome to Netlify!**
   - You're now logged in

---

### Step 3.2: Deploy Your Site

1. **Add New Site**
   - Click **"Add new site"** → **"Import an existing project"**

2. **Connect to GitHub**
   - Click **"GitHub"**
   - Click **"Configure Netlify on GitHub"**
   - Select **"Only select repositories"**
   - Choose: `intern-academy-website`
   - Click **"Install"**

3. **Configure Build Settings**
   - **Branch to deploy:** `main`
   - **Build command:** Leave EMPTY (it's a static site)
   - **Publish directory:** Leave EMPTY or put `/`
   - Click **"Deploy site"**

4. **Wait for Deployment**
   - Takes 30-60 seconds
   - You'll see: "Site is live" ✅

5. **Your Site is Live!**
   - URL: `https://random-name-12345.netlify.app`
   - Click to visit!

---

### Step 3.3: Change Site Name (Optional)

1. **Site Settings**
   - Click **"Site settings"**
   - Under **"Site information"** → Click **"Change site name"**

2. **New Name**
   - Enter: `internacademy` (if available)
   - Now your site is: `https://internacademy.netlify.app`

---

### Step 3.4: Connect Your GoDaddy Domain

1. **In Netlify**
   - Go to **"Domain management"**
   - Click **"Add custom domain"**
   - Enter: `internacademy.co.in`
   - Click **"Verify"**
   - Click **"Add domain"**

2. **Get DNS Records**
   - Netlify will show you DNS records to add
   - Keep this page open!

---

## 📌 PART 4: Configure GoDaddy DNS

### Step 4.1: Login to GoDaddy

1. **Go to GoDaddy**
   - Visit: https://www.godaddy.com
   - Click **"Sign In"**
   - Enter your credentials

2. **Navigate to DNS**
   - Click **"My Products"**
   - Find `internacademy.co.in`
   - Click **"DNS"** or **"Manage DNS"**

---

### Step 4.2: Add DNS Records

**Delete existing A records (if any)** that point to GoDaddy's default parking page.

**Add Record 1: Main Domain**
```
Type: A
Name: @
Value: 75.2.60.5
TTL: 600 seconds
```

**Add Record 2: WWW Subdomain**
```
Type: CNAME
Name: www
Value: internacademy.netlify.app
TTL: 600 seconds
```

**How to Add:**
1. Click **"Add"** button
2. Select **Type** from dropdown
3. Fill in **Name** and **Value**
4. Click **"Save"**

---

### Step 4.3: Wait for DNS Propagation

- **Time:** 15 minutes to 24 hours (usually 15-30 minutes)
- **Check status:** https://dnschecker.org
  - Enter: `internacademy.co.in`
  - See if it points to Netlify

---

## 📌 PART 5: Enable HTTPS on Netlify

1. **Back in Netlify**
   - Go to **"Domain management"**
   - Scroll to **"HTTPS"**

2. **Verify DNS Configuration**
   - Click **"Verify DNS configuration"**
   - Wait for it to detect your domain

3. **Provision Certificate**
   - Click **"Provision certificate"**
   - Wait 1-2 minutes
   - **HTTPS enabled!** ✅

4. **Force HTTPS**
   - Toggle ON: **"Force HTTPS"**
   - All traffic will use secure HTTPS

---

## 📌 PART 6: Update Firebase Security Rules

**After everything is working**, secure your database:

1. **Go to Firebase Console**
   - Firestore Database → **"Rules"** tab

2. **Update Rules**
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Students collection
       match /students/{document} {
         allow create: if true;  // Anyone can register
         allow read, update, delete: if request.auth != null;  // Only authenticated users
       }
       
       // Companies collection
       match /companies/{document} {
         allow create: if true;  // Anyone can register
         allow read, update, delete: if request.auth != null;  // Only authenticated users
       }
     }
   }
   ```

3. **Publish Rules**
   - Click **"Publish"**

---

## ✅ VERIFICATION CHECKLIST

After completing all steps, verify:

- [ ] Code pushed to GitHub repository
- [ ] Firebase project created and configured
- [ ] Firestore database enabled
- [ ] firebase-config.js updated with real values
- [ ] Site deployed on Netlify
- [ ] Custom domain connected in Netlify
- [ ] DNS records added in GoDaddy
- [ ] HTTPS certificate provisioned
- [ ] All pages load correctly
- [ ] Registration forms submit to Firebase

---

## 🎯 FINAL RESULT

Your website will be accessible at:
- ✅ `https://internacademy.co.in` (main domain)
- ✅ `https://www.internacademy.co.in` (www subdomain)
- ✅ `https://internacademy.netlify.app` (Netlify subdomain)

**All with FREE SSL/HTTPS!** 🔒

---

## 🆘 TROUBLESHOOTING

### Problem: DNS not updating
**Solution:** Wait 24 hours, clear browser cache, try incognito mode

### Problem: HTTPS shows error
**Solution:** Wait for DNS to fully propagate, then re-provision certificate

### Problem: Forms not saving to Firebase
**Solution:** Check browser console for errors, verify firebase-config.js has correct values

### Problem: Git push fails
**Solution:** Make sure you're using Personal Access Token as password, not your GitHub password

---

## 📞 Need Help?

- **Netlify Support:** https://www.netlify.com/support/
- **Firebase Support:** https://firebase.google.com/support
- **GoDaddy DNS Help:** https://in.godaddy.com/help/manage-dns-680

---

**Good luck! Your website will be live soon! 🚀**
