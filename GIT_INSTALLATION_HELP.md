# Git Installation Alternative Methods

## Method 1: Download Git for Windows Directly

1. **Download Git**
   - Visit: https://git-scm.com/download/win
   - Click: "Click here to download" (64-bit version)
   - File: `Git-2.43.0-64-bit.exe` (or latest version)

2. **Install Git**
   - Run the downloaded `.exe` file
   - Click "Next" for all options (defaults are fine)
   - Important screens:
     - Editor: Choose "Use Visual Studio Code" if you have it
     - PATH: Select "Git from the command line and also from 3rd-party software"
     - HTTPS: Choose "Use the OpenSSL library"
     - Line endings: "Checkout Windows-style, commit Unix-style"
   - Click "Install"
   - Click "Finish"

3. **Verify Installation**
   - Open NEW Command Prompt or PowerShell
   - Run: `git --version`
   - Should show: `git version 2.43.0` or similar

---

## Method 2: Use GitHub Desktop (Easier!)

If you prefer a graphical interface:

1. **Download GitHub Desktop**
   - Visit: https://desktop.github.com
   - Click "Download for Windows"
   - Install the application

2. **Sign In**
   - Open GitHub Desktop
   - Sign in with `internacademyofficial`

3. **Add Repository**
   - File → Add Local Repository
   - Choose: `c:\Users\lenovo\.gemini\antigravity\scratch\intern_academy_v2`
   - Click "Create Repository"

4. **Publish to GitHub**
   - Click "Publish repository"
   - Name: `intern-academy-website`
   - Description: `Official website for Intern Academy`
   - Uncheck "Keep this code private"
   - Click "Publish repository"

5. **Done!**
   - Your code is now on GitHub
   - Much easier than command line!

---

## Method 3: Use VS Code Built-in Git

If you're using VS Code:

1. **Open Terminal in VS Code**
   - View → Terminal (or Ctrl+`)

2. **If Git is not found**
   - Install Git using Method 1 first
   - Restart VS Code

3. **Use Source Control**
   - Click Source Control icon (left sidebar)
   - Click "Initialize Repository"
   - Stage all changes (+ button)
   - Commit with message
   - Click "Publish to GitHub"

---

## RECOMMENDED: Use GitHub Desktop

**For beginners, GitHub Desktop is the EASIEST option!**

### Quick Steps:
1. Download: https://desktop.github.com
2. Install and sign in
3. Add your folder
4. Publish to GitHub
5. Done in 5 clicks!

---

## After Git is Installed

Once Git is installed, come back to:
- `DEPLOYMENT_CHECKLIST.md` - Follow Step 1
- `COMPLETE_SETUP_GUIDE.md` - For detailed instructions

---

## Alternative: Manual Upload to GitHub

If Git installation keeps failing:

1. **Create Repository on GitHub**
   - Go to: https://github.com/internacademyofficial
   - New repository: `intern-academy-website`
   - Public

2. **Upload Files Manually**
   - Click "uploading an existing file"
   - Drag and drop ALL your files
   - Commit changes

3. **Done!**
   - Not ideal for updates, but works for first deployment

---

## Need Help?

- GitHub Desktop Guide: https://docs.github.com/en/desktop
- Git Installation Help: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
