# ✅ Deployment Checklist - Intern Academy
## Quick Reference for Going Live

---

## 🎯 THE 5-STEP PROCESS

```
GitHub → Firebase → Netlify → DNS → HTTPS
```

---

## STEP 1️⃣ : GITHUB SETUP (10 minutes)

### Before Starting:
- [ ] Git is installed (restart terminal if just installed)
- [ ] GitHub account created: `internacademyofficial`

### Actions:
1. [ ] Create Personal Access Token
   - Go to: https://github.com/settings/tokens
   - Generate new token (classic)
   - Select `repo` scope
   - **COPY TOKEN - SAVE IT!**

2. [ ] Create Repository on GitHub
   - Go to: https://github.com/internacademyofficial
   - New repository: `intern-academy-website`
   - Public, no README
   - Create repository

3. [ ] Push Code to GitHub
   ```powershell
   cd c:\Users\lenovo\.gemini\antigravity\scratch\intern_academy_v2
   git init
   git config user.name "internacademyofficial"
   git config user.email "your-email@gmail.com"
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/internacademyofficial/intern-academy-website.git
   git push -u origin main
   ```
   - Username: `internacademyofficial`
   - Password: **YOUR TOKEN** (not password!)

4. [ ] Verify code is on GitHub
   - Visit: https://github.com/internacademyofficial/intern-academy-website
   - See all files? ✅ Done!

---

## STEP 2️⃣ : FIREBASE SETUP (15 minutes)

### Actions:
1. [ ] Create Firebase Project
   - Visit: https://console.firebase.google.com
   - Name: `Intern Academy`
   - Disable Analytics

2. [ ] Create Firestore Database
   - Build → Firestore Database → Create
   - Test mode
   - Region: `asia-south1 (Mumbai)`

3. [ ] Get Firebase Config
   - Settings ⚙️ → Project settings
   - Your apps → Web `</>`
   - Register: `Intern Academy Web`
   - **COPY the firebaseConfig object**

4. [ ] Update firebase-config.js
   - Open: `firebase-config.js`
   - Replace placeholder values with YOUR config
   - Save file

5. [ ] Commit Firebase Config
   ```powershell
   git add firebase-config.js
   git commit -m "Add Firebase configuration"
   git push
   ```

---

## STEP 3️⃣ : NETLIFY DEPLOYMENT (10 minutes)

### Actions:
1. [ ] Sign up on Netlify
   - Visit: https://app.netlify.com
   - Sign up with GitHub

2. [ ] Deploy Site
   - Add new site → Import from Git
   - Choose GitHub
   - Select: `intern-academy-website`
   - Deploy!

3. [ ] Wait for Build
   - Status: "Site is live" ✅
   - Note the URL: `*.netlify.app`

4. [ ] Test Your Site
   - Click the URL
   - All pages working? ✅

5. [ ] (Optional) Change Site Name
   - Site settings → Change site name
   - New name: `internacademy`

---

## STEP 4️⃣ : CONNECT DOMAIN (20 minutes + waiting)

### In Netlify:
1. [ ] Add Custom Domain
   - Domain management → Add custom domain
   - Enter: `internacademy.co.in`
   - Add domain

2. [ ] Note DNS Records
   - Keep Netlify page open
   - You'll need these values

### In GoDaddy:
1. [ ] Login to GoDaddy
   - Visit: https://dcc.godaddy.com/control/portfolio
   - Find `internacademy.co.in`

2. [ ] Manage DNS
   - Click DNS or Manage

3. [ ] Delete Old A Records
   - Remove any existing A records

4. [ ] Add New A Record
   ```
   Type: A
   Name: @
   Value: 75.2.60.5
   TTL: 600
   ```

5. [ ] Add CNAME Record
   ```
   Type: CNAME
   Name: www  
   Value: internacademy.netlify.app
   TTL: 600
   ```

6. [ ] Save All Changes

7. [ ] Wait for DNS Propagation
   - Time: 15 min to 24 hours
   - Check: https://dnschecker.org
   - Enter: `internacademy.co.in`

---

## STEP 5️⃣ : ENABLE HTTPS (5 minutes)

### In Netlify (after DNS propagates):
1. [ ] Verify DNS Configuration
   - Domain management → Verify DNS

2. [ ] Provision SSL Certificate
   - HTTPS section → Provision certificate
   - Wait 1-2 minutes

3. [ ] Force HTTPS
   - Toggle ON: "Force HTTPS"

4. [ ] Test HTTPS
   - Visit: `https://internacademy.co.in`
   - See the 🔒 lock icon? ✅

---

## 📊 FINAL TESTING

### Test ALL These URLs:
- [ ] `https://internacademy.co.in` → Works ✅
- [ ] `https://www.internacademy.co.in` → Works ✅
- [ ] `http://internacademy.co.in` → Redirects to HTTPS ✅

### Test ALL Pages:
- [ ] Home page loads
- [ ] Courses page loads + filters work
- [ ] Internships page loads
- [ ] About page loads
- [ ] Contact page loads
- [ ] News page loads
- [ ] Login page loads
- [ ] Register Student page loads
- [ ] Register Company page loads

### Test Forms (AFTER Firebase is integrated in HTML):
- [ ] Student registration saves to Firebase
- [ ] Company registration saves to Firebase
- [ ] Can view data in Firebase Console

---

## 🔐 SECURE YOUR DATABASE

### In Firebase Console:
1. [ ] Update Firestore Rules
   - Firestore → Rules tab
   - Copy rules from COMPLETE_SETUP_GUIDE.md
   - Publish

2. [ ] Test Security
   - Try creating a student
   - Check Firebase console for data

---

## 🎉 LAUNCH CHECKLIST

All done? Check these final items:

- [ ] ✅ Website is live and accessible
- [ ] ✅ All pages work correctly
- [ ] ✅ HTTPS is enabled (🔒)  
- [ ] ✅ DNS points to Netlify
- [ ] ✅ Firebase is collecting data
- [ ] ✅ No console errors in browser
- [ ] ✅ Mobile responsive design works
- [ ] ✅ All links are working

---

## 📱 SHARE YOUR WEBSITE!

Your website is now live at:
### 🌐 https://internacademy.co.in

Share it on:
- [ ] LinkedIn
- [ ] Instagram
- [ ] Facebook
- [ ] Twitter
- [ ] WhatsApp

---

## 📞 SUPPORT LINKS

If you face issues:

| Service | Help Link |
|---------|-----------|
| GitHub | https://docs.github.com |
| Firebase | https://firebase.google.com/support |
| Netlify | https://docs.netlify.com |
| GoDaddy DNS | https://in.godaddy.com/help/manage-dns-680 |

---

## 🚀 NEXT STEPS (After Launch)

1. [ ] Set up Google Analytics
2. [ ] Add email notifications for registrations
3. [ ] Create admin dashboard
4. [ ] Add payment gateway
5. [ ] SEO optimization
6. [ ] Social media integration
7. [ ] Blog system
8. [ ] User authentication system

---

**Congratulations on launching Intern Academy! 🎊**

**Print this checklist and tick items as you complete them!**
