# 🚀 Deployment Guide - Intern Academy Website

This guide will help you deploy your Intern Academy website to your custom domain **internacademy.co.in**.

## 📋 Table of Contents
1. [GitHub Pages Deployment (Recommended)](#option-1-github-pages-recommended)
2. [Netlify Deployment (Alternative)](#option-2-netlify-alternative)
3. [Vercel Deployment (Alternative)](#option-3-vercel-alternative)
4. [Traditional Web Hosting](#option-4-traditional-web-hosting)

---

## Option 1: GitHub Pages (Recommended)

GitHub Pages is **free** and works seamlessly with your GitHub repository.

### Step 1: Enable GitHub Pages

1. Go to your GitHub repository
2. Click on **Settings** (top navigation)
3. Scroll down to **Pages** section (left sidebar)
4. Under "Source", select:
   - **Branch**: `main` (or `master`)
   - **Folder**: `/ (root)`
5. Click **Save**

Your site will be initially available at: `https://[your-username].github.io/[repo-name]`

### Step 2: Add Custom Domain

1. In the same **GitHub Pages** settings section
2. Find the **Custom domain** field
3. Enter: `internacademy.co.in`
4. Click **Save**
5. ✅ Check the box "Enforce HTTPS" (after DNS propagates)

### Step 3: Configure DNS Settings

Go to your domain registrar (where you bought internacademy.co.in) and configure DNS:

#### **For Root Domain (internacademy.co.in):**

Add these **A Records**:
```
Type: A
Name: @ (or leave blank)
Value: 185.199.108.153

Type: A
Name: @ (or leave blank)
Value: 185.199.109.153

Type: A
Name: @ (or leave blank)
Value: 185.199.110.153

Type: A
Name: @ (or leave blank)
Value: 185.199.111.153
```

#### **For WWW Subdomain (www.internacademy.co.in):**

Add a **CNAME Record**:
```
Type: CNAME
Name: www
Value: [your-username].github.io
```

### Step 4: Create CNAME File

Create a file named `CNAME` (no extension) in your repository root:

**File: `CNAME`**
```
internacademy.co.in
```

Commit and push this file to GitHub.

### Step 5: Wait for DNS Propagation

- DNS changes can take **15 minutes to 48 hours** to propagate
- Check status: https://www.whatsmydns.net/
- Once propagated, enable HTTPS in GitHub Pages settings

✅ **Done!** Your site will be live at https://internacademy.co.in

---

## Option 2: Netlify (Alternative)

Netlify offers better build tools, redirects, and form handling.

### Step 1: Sign Up & Deploy

1. Go to [Netlify](https://www.netlify.com/)
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect your **GitHub** account
4. Select your repository
5. Click **Deploy site**

Your site will be live at: `https://[random-name].netlify.app`

### Step 2: Add Custom Domain

1. Go to **Site settings** → **Domain management**
2. Click **Add custom domain**
3. Enter: `internacademy.co.in`
4. Click **Verify**

### Step 3: Configure DNS

Netlify will provide you with DNS settings. Two options:

#### **Option A: Use Netlify DNS (Easier)**
1. Change your domain's nameservers to Netlify's nameservers
2. Netlify will automatically configure DNS

#### **Option B: Keep Your Current DNS Provider**
Add these records at your domain registrar:

```
Type: A
Name: @ (or leave blank)
Value: 75.2.60.5

Type: CNAME
Name: www
Value: [your-site-name].netlify.app
```

### Step 4: Enable HTTPS

1. In Netlify dashboard, go to **Domain settings**
2. Click **Verify DNS configuration**
3. Click **Provision certificate** under HTTPS

✅ **Done!** Your site will be live with automatic deployments on every GitHub push!

---

## Option 3: Vercel (Alternative)

Vercel is similar to Netlify with excellent performance.

### Step 1: Deploy to Vercel

1. Go to [Vercel](https://vercel.com/)
2. Sign up with **GitHub**
3. Click **"Add New Project"**
4. Select your repository
5. Click **Deploy**

### Step 2: Add Custom Domain

1. Go to your project **Settings**
2. Click **Domains**
3. Enter: `internacademy.co.in`
4. Click **Add**

### Step 3: Configure DNS

Add these records at your domain registrar:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

✅ **Done!** Auto-deploys on every Git push.

---

## Option 4: Traditional Web Hosting

If you have existing web hosting (cPanel, Hostinger, GoDaddy, etc.):

### Step 1: Download Your Code

1. Download your repository as a ZIP file from GitHub
2. Extract the files

### Step 2: Upload via FTP/File Manager

1. Log into your hosting control panel (cPanel)
2. Open **File Manager**
3. Navigate to `public_html` (or your domain's root directory)
4. Upload all files (`index.html`, `style.css`, `app.js`, etc.)

### Step 3: Configure Domain

1. In your hosting control panel
2. Go to **Domains** → **Addon Domains** (if needed)
3. Point `internacademy.co.in` to the uploaded files directory

✅ **Done!** Your site is live.

---

## 🎯 Recommended Option

I recommend **GitHub Pages** for your use case because:
- ✅ **Free hosting**
- ✅ **Automatic deployment** from GitHub
- ✅ **Free SSL certificate**
- ✅ **Good performance**
- ✅ **Easy to maintain**

---

## 🔧 Troubleshooting

### Issue: "Domain is already taken" on GitHub Pages
**Solution**: Make sure you don't have the domain configured in another repository

### Issue: DNS not propagating
**Solution**: Wait 24-48 hours, clear browser cache, try incognito mode

### Issue: HTTPS not working
**Solution**: 
1. Ensure DNS is fully propagated
2. Remove and re-add custom domain in GitHub Pages
3. Wait for certificate provisioning (can take up to 24 hours)

### Issue: 404 errors on page refresh
**Solution**: This is a static site, so this shouldn't happen. If using SPA framework in future, add proper redirects.

---

## 📞 Need Help?

If you face any issues during deployment:
1. Check GitHub Pages status: https://www.githubstatus.com/
2. Verify DNS propagation: https://www.whatsmydns.net/
3. Check SSL certificate: https://www.ssllabs.com/ssltest/

---

## 🎉 Post-Deployment Checklist

After deployment, verify:
- [ ] Site loads at https://internacademy.co.in
- [ ] Site loads at https://www.internacademy.co.in
- [ ] All pages are accessible
- [ ] All images and assets load correctly
- [ ] Navigation links work properly
- [ ] Forms work (if any)
- [ ] Mobile responsiveness works
- [ ] SSL certificate is active (🔒 padlock in browser)

---

**Good luck with your deployment! 🚀**
