# Remove course fees from HTML files
$files = @("index.html", "courses.html")

foreach ($file in $files) {
    $lines = Get-Content $file
    $newlines = @()
    
    foreach ($line in $lines) {
        # Skip lines that contain price spans  - look for pattern with numbers like 2,499 or 4,999
        if ($line -match 'font-weight: 700.*\d+,\d+') {
            # Skip this line
            continue
        }
        
        # Update justify-content if needed
        if ($line -match 'justify-content: space-between') {
            $line = $line -replace 'justify-content: space-between', 'justify-content: flex-end'
        }
        
        $newlines += $line
    }
    
    # Save the updated content
    $newlines | Set-Content -Path $file
    Write-Host "Updated $file - removed course fees"
}

Write-Host "`nCourse fees successfully removed from all files!"
