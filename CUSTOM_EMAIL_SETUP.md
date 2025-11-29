# 📧 Custom Email Configuration Guide

## Sending Auth Emails from info@internacademy.co.in

This guide explains how to configure Supabase to send all authentication emails (registration, verification, password reset) from your custom domain email: **info@internacademy.co.in**

---

## 🎯 What You'll Need

1. ✅ Email hosting service (Gmail, Outlook, Zoho, etc.) configured for `info@internacademy.co.in`
2. ✅ SMTP credentials for your email
3. ✅ Access to your Supabase dashboard
4. ✅ App password (if using Gmail/Google Workspace)

---

## 📋 Step-by-Step Instructions

### Step 1: Get Your SMTP Credentials

#### Option A: Using Gmail/Google Workspace for internacademy.co.in

1. **Enable 2-Factor Authentication** (if not already enabled)
   - Go to: https://myaccount.google.com/security
   - Enable 2-Step Verification

2. **Create App Password**
   - Go to: https://myaccount.google.com/apppasswords
   - Select app: "Mail"
   - Select device: "Other (Custom name)" → Type: "Supabase"
   - Click "Generate"
   - **Copy the 16-character password** (you'll need this)

3. **Your SMTP Settings:**
   ```
   SMTP Host: smtp.gmail.com
   SMTP Port: 587
   Username: info@internacademy.co.in
   Password: [Your App Password from step 2]
   Sender Email: info@internacademy.co.in
   Sender Name: Intern Academy
   ```

#### Option B: Using Zoho Mail

1. **Create Zoho Mail Account** at zoho.com/mail
2. **SMTP Settings:**
   ```
   SMTP Host: smtp.zoho.com
   SMTP Port: 587
   Username: info@internacademy.co.in
   Password: [Your Zoho password]
   Sender Email: info@internacademy.co.in
   Sender Name: Intern Academy
   ```

#### Option C: Using Microsoft 365/Outlook

1. **SMTP Settings:**
   ```
   SMTP Host: smtp.office365.com
   SMTP Port: 587
   Username: info@internacademy.co.in
   Password: [Your Microsoft account password]
   Sender Email: info@internacademy.co.in
   Sender Name: Intern Academy
   ```

#### Option D: Using Custom Email Provider (cPanel/Hosting)

Contact your hosting provider for SMTP settings. Usually:
```
SMTP Host: mail.internacademy.co.in (or smtp.internacademy.co.in)
SMTP Port: 587 or 465
Username: info@internacademy.co.in
Password: [Your email password]
```

---

### Step 2: Configure Supabase Custom SMTP

1. **Go to Supabase Dashboard**
   - Navigate to: https://app.supabase.com
   - Select your project

2. **Open Settings**
   - Click on **"Settings"** (gear icon) in the left sidebar
   - Click on **"Authentication"**

3. **Scroll to "SMTP Settings"**
   - Find the section labeled **"SMTP Settings"** or **"Email Settings"**

4. **Enable Custom SMTP**
   - Toggle **"Enable Custom SMTP"** to ON

5. **Enter Your SMTP Details**
   ```
   Sender Email: info@internacademy.co.in
   Sender Name: Intern Academy
   
   SMTP Host: [Your SMTP host from Step 1]
   SMTP Port: 587
   
   SMTP Username: info@internacademy.co.in
   SMTP Password: [Your password/app password]
   
   Minimum interval: 60 (seconds)
   ```

6. **Save Settings**
   - Click **"Save"** at the bottom

---

### Step 3: Test Email Configuration

1. **Send Test Email** (if available)
   - Some versions of Supabase have a "Send Test Email" button
   - Click it to verify configuration

2. **Test with Real Registration**
   - Go to your website: `register-student.html`
   - Register a new test account
   - Check if verification email arrives from `info@internacademy.co.in`

3. **Check Email Inbox**
   - Verification email should arrive within 1-2 minutes
   - Check spam folder if not in inbox

---

## 🎨 Customize Email Templates (Optional)

### Customize Email Content

1. **In Supabase Dashboard**
   - Go to **Authentication** → **Email Templates**

2. **Available Templates:**
   - Confirm signup
   - Invite user
   - Magic link
   - Change email address
   - Reset password

3. **Customize Each Template:**
   - Use the built-in editor
   - Add your branding
   - Modify subject lines
   - Customize button text and colors

### Example: Welcome Email Template

```html
<h2>Welcome to Intern Academy! 🎓</h2>

<p>Hi {{ .Data.Name }},</p>

<p>Thank you for registering with Intern Academy! We're excited to help you find your dream internship.</p>

<p>Please confirm your email address by clicking the button below:</p>

<a href="{{ .ConfirmationURL }}" style="background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0;">
  Verify Email Address
</a>

<p>Or copy and paste this link into your browser:</p>
<p>{{ .ConfirmationURL }}</p>

<p>Welcome aboard!</p>

<p>Best regards,<br>
The Intern Academy Team<br>
<a href="https://internacademy.co.in">internacademy.co.in</a></p>
```

---

## 🔒 Security Best Practices

### 1. Use App Passwords (For Gmail)
- Never use your main account password
- Generate app-specific passwords
- Can be revoked anytime

### 2. Enable TLS/SSL
- Always use port 587 with STARTTLS
- Or port 465 with SSL/TLS
- Never use port 25 (unencrypted)

### 3. Monitor Email Sending
- Check Supabase logs for email errors
- Monitor your email provider's sending limits
- Set up alerts for failed emails

### 4. Domain Authentication (Advanced)
To improve email deliverability, add these DNS records:

**SPF Record:**
```
Type: TXT
Name: @
Value: v=spf1 include:_spf.google.com ~all
(Adjust based on your email provider)
```

**DKIM Record:**
- Generate from your email provider
- Add to DNS as instructed

**DMARC Record:**
```
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none; rua=mailto:info@internacademy.co.in
```

---

## 📊 Email Provider Limits

Be aware of sending limits:

| Provider | Daily Limit | Per Hour |
|----------|-------------|----------|
| Gmail (Personal) | 500 | 100 |
| Google Workspace | 2,000 | 500 |
| Zoho Mail Free | 500 | - |
| Zoho Mail Paid | 5,000 | - |
| Microsoft 365 | 10,000 | 300 |

For high-volume apps, consider dedicated email services:
- SendGrid
- Mailgun
- Amazon SES
- Postmark

---

## 🐛 Troubleshooting

### Issue: Emails Not Sending

**Check:**
1. ✅ SMTP credentials are correct
2. ✅ App password is used (not regular password for Gmail)
3. ✅ Port is correct (587 for TLS, 465 for SSL)
4. ✅ SMTP host is correct
5. ✅ Email provider allows SMTP access

**Solution:**
- Test SMTP credentials with a tool like: https://www.smtper.net/
- Check Supabase logs for error messages
- Verify email provider's SMTP status

---

### Issue: Emails Go to Spam

**Solutions:**
1. Add SPF, DKIM, DMARC records to your domain
2. Send from your actual domain email
3. Warm up your email sender (start slow)
4. Add unsubscribe links in emails
5. Avoid spammy words in subject lines

---

### Issue: "Authentication Failed" Error

**For Gmail:**
1. Enable "Less secure app access" (not recommended)
2. OR use App Password (recommended)
3. OR enable 2FA and create App Password

**For Other Providers:**
- Verify username/password are correct
- Check if SMTP is enabled in email settings
- Contact your email provider

---

### Issue: "Connection Timeout"

**Solutions:**
1. Check firewall settings
2. Verify SMTP port is not blocked
3. Try different port (587 vs 465)
4. Check with your hosting provider

---

## ✅ Verification Checklist

After setup, verify:

- [ ] Custom SMTP is enabled in Supabase
- [ ] SMTP credentials are entered correctly
- [ ] Sender email is `info@internacademy.co.in`
- [ ] Sender name is "Intern Academy"
- [ ] Test email was sent successfully
- [ ] Registration emails arrive from custom domain
- [ ] Emails are not going to spam
- [ ] Password reset emails work
- [ ] All email templates are customized

---

## 📧 Email Types That Will Be Sent

Once configured, these emails will come from `info@internacademy.co.in`:

1. **Welcome/Verification Email**
   - Sent when student registers
   - Contains email verification link

2. **Password Reset Email**
   - Sent when user requests password reset
   - Contains reset link

3. **Email Change Confirmation**
   - Sent when user changes email address
   - Contains confirmation link

4. **Magic Link Email** (if enabled)
   - Passwordless login link

---

## 🎯 Production Recommendations

For production use:

1. **Use Professional Email Service**
   - Google Workspace: $6/user/month
   - Microsoft 365: $5/user/month
   - Zoho Mail: $1/user/month

2. **Or Use Transactional Email Service**
   - SendGrid: Free tier (100 emails/day)
   - Mailgun: Free tier (5,000 emails/month)
   - Amazon SES: $0.10 per 1,000 emails

3. **Set Up Domain Authentication**
   - SPF, DKIM, DMARC records
   - Improves deliverability
   - Reduces spam score

4. **Monitor Email Performance**
   - Track delivery rates
   - Monitor bounce rates
   - Set up alerts for failures

---

## 🚀 Quick Start Summary

**Minimum Steps:**

1. Get SMTP credentials for `info@internacademy.co.in`
2. In Supabase: Settings → Authentication → SMTP Settings
3. Enable Custom SMTP
4. Enter your credentials
5. Save
6. Test with a registration

**That's it! All auth emails will now come from your custom domain.** 🎉

---

## 📞 Support

If you need help:
- Check Supabase logs for errors
- Test SMTP with external tools
- Contact your email provider
- Review Supabase SMTP documentation

**Pro Tip:** Always test with a new email address to ensure verification emails are working correctly!
