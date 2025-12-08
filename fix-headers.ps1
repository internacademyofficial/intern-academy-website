# Fix section headers that got changed to flex-end, they should be space-between
$files = @("index.html")

foreach ($file in $files) {
    $content = Get-Content $file -Raw
    
    # Remove course fee price lines (lines with price spans)
    $lines = Get-Content $file
    $newlines = @()
    
    foreach ($line in $lines) {
        # Skip lines with course prices (font-weight: 700 with numbers)
        if ($line -match 'font-weight: 700.*\d+,\d+') {
            continue
        }
        
        # Fix section headers: they should have space-between 
        # Only change to flex-end for course card inner divs (which have margin-top: 1rem)
        if ($line -match 'margin-bottom: 3rem.*justify-content: space-between') {
            # Keep section headers as space-between
            $newlines += $line
        }
        elseif ($line -match 'margin-top: 1rem.*justify-content: space-between') {
            # Change course card price divs to flex-end
            $line = $line -replace 'justify-content: space-between', 'justify-content: flex-end'
            $newlines += $line
        }
        else {
            $newlines += $line
        }
    }
    
    $newlines | Set-Content -Path $file
    Write-Host "Fixed $file"
}

Write-Host "`nAll fixes applied!"
