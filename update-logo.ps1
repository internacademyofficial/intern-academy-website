# PowerShell script to replace logo in all HTML files
$files = @(
    "index.html",
    "internships.html",
    "courses.html",
    "news.html",
    "about.html",
    "contact.html",
    "login.html",
    "register-student.html",
    "register-company.html",
    "dashboard.html",
    "company-dashboard.html",
    "forgot-password.html",
    "reset-password.html",
    "verify-email.html"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "Updating $file..."
        $content = Get-Content $file -Raw -Encoding UTF8
        
        # Replace the logo HTML
        $content = $content -replace '<i class="fas fa-graduation-cap"></i>\s*Intern<span>Academy</span>', '<img src="logo-cropped.png" alt="Intern Academy" style="height: 45px; width: auto; object-fit: contain;">'
        
        Set-Content $file $content -NoNewline -Encoding UTF8
        Write-Host "Updated $file"
    } else {
        Write-Host "Skipped $file (not found)"
    }
}

Write-Host ""
Write-Host "Logo update complete! All pages now use logo-cropped.png"
Write-Host "To rollback, run: git checkout *.html"
