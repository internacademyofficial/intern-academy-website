# GitHub Setup Script for Intern Academy
# Username: internacademyofficial

# STEP 1: Create repository on GitHub first!
# Go to: https://github.com/internacademyofficial
# Click: "New Repository"
# Name: intern-academy-website
# Description: Official website for Intern Academy - internacademy.co.in
# Keep it PUBLIC
# Don't initialize with README
# Click: "Create repository"

# STEP 2: After Git is installed, run these commands:

# Initialize Git repository
git init

# Configure Git (replace with your email)
git config user.name "internacademyofficial"
git config user.email "your-email@example.com"

# Add all files
git add .

# Create first commit
git commit -m "Initial commit - Intern Academy website with courses, registration, and responsive design"

# Rename branch to main
git branch -M main

# Add remote repository
git remote add origin https://github.com/internacademyofficial/intern-academy-website.git

# Push to GitHub
git push -u origin main

# DONE! Your code is now on GitHub ✅
