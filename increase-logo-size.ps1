# PowerShell script to increase logo size
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
        
        # Replace the small logo with larger version
        $content = $content -replace 'height: 45px;', 'height: 65px;'
        
        Set-Content $file $content -NoNewline -Encoding UTF8
        Write-Host "Updated $file - Logo size increased to 65px"
    }
}

Write-Host ""
Write-Host "Logo size updated! The logo should now be more visible."
Write-Host "Refreshing browser pages to see the change..."
