# 📧 Quick Setup: Custom Email for Supabase

## Send Registration Emails from info@internacademy.co.in

---

## 🚀 5-Minute Setup

### Step 1️⃣: Get Your Email SMTP Settings

**If using Gmail/Google Workspace:**

1. Go to https://myaccount.google.com/apppasswords
2. Create app password for "Mail" → "Supabase"
3. Copy the 16-character password

**Your Settings:**
```
Host: smtp.gmail.com
Port: 587
User: info@internacademy.co.in
Pass: [Your App Password]
```

---

### Step 2️⃣: Configure Supabase

1. **Open Supabase Dashboard**: https://app.supabase.com
2. **Navigate**: Settings (⚙️) → Authentication
3. **Scroll to**: "SMTP Settings" section
4. **Toggle ON**: "Enable Custom SMTP"

**Fill in:**
```
✉️ Sender Email:    info@internacademy.co.in
👤 Sender Name:     Intern Academy

🌐 SMTP Host:       smtp.gmail.com (or your provider)
🔌 SMTP Port:       587

👤 Username:        info@internacademy.co.in
🔑 Password:        [Your SMTP password/app password]
```

5. **Click**: "Save"

---

### Step 3️⃣: Test It!

1. Go to your website: `register-student.html`
2. Register with a test email
3. Check inbox - email should come from **info@internacademy.co.in**

✅ **Done!** All auth emails now use your custom domain.

---

## 📝 Common SMTP Settings by Provider

### Gmail / Google Workspace
```
Host: smtp.gmail.com
Port: 587
TLS: Yes
```

### Zoho Mail
```
Host: smtp.zoho.com
Port: 587
TLS: Yes
```

### Microsoft 365 / Outlook
```
Host: smtp.office365.com
Port: 587
TLS: Yes
```

### cPanel / Hosting Provider
```
Host: mail.internacademy.co.in
Port: 587 or 465
TLS: Yes
(Contact your hosting provider)
```

---

## ⚠️ Important Notes

1. **Use App Password for Gmail** (not your regular password)
2. **Enable 2FA** on your email account first
3. **Port 587** is recommended (with STARTTLS)
4. **Test thoroughly** before going live

---

## 🐛 Not Working?

### Check:
- ✅ SMTP credentials are correct
- ✅ Using App Password (for Gmail)
- ✅ Port 587 or 465
- ✅ Firewall not blocking SMTP
- ✅ Email provider allows SMTP access

### Still stuck?
Read the full guide: `CUSTOM_EMAIL_SETUP.md`

---

## 📧 What Emails Will Be Sent?

Once configured, these will come from `info@internacademy.co.in`:

- ✉️ Email verification (registration)
- 🔑 Password reset
- 📨 Email change confirmation
- 🔗 Magic links (if enabled)

---

**That's all! Your users will now receive professional emails from your domain! ✨**
