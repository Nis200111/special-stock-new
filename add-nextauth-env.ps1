# Add NextAuth environment variables to .env.local

Write-Host "Adding NextAuth configuration to .env.local..." -ForegroundColor Cyan

$envPath = ".env.local"
$nextAuthSecret = "NEXTAUTH_SECRET=your-secret-key-change-this-in-production-use-openssl-rand-base64-32"
$nextAuthUrl = "NEXTAUTH_URL=http://localhost:3000"

# Check if file exists
if (Test-Path $envPath) {
    # Read current content
    $content = Get-Content $envPath -Raw
    
    # Check if NextAuth variables already exist
    if ($content -match "NEXTAUTH_SECRET") {
        Write-Host "✓ NEXTAUTH_SECRET already exists" -ForegroundColor Green
    } else {
        Add-Content $envPath "`n# NextAuth Configuration"
        Add-Content $envPath $nextAuthSecret
        Write-Host "✓ Added NEXTAUTH_SECRET" -ForegroundColor Green
    }
    
    if ($content -match "NEXTAUTH_URL") {
        Write-Host "✓ NEXTAUTH_URL already exists" -ForegroundColor Green
    } else {
        Add-Content $envPath $nextAuthUrl
        Write-Host "✓ Added NEXTAUTH_URL" -ForegroundColor Green
    }
} else {
    Write-Host "✗ .env.local file not found!" -ForegroundColor Red
    Write-Host "Creating .env.local with NextAuth configuration..." -ForegroundColor Yellow
    
    @"
# Backend API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000

# NextAuth Configuration
$nextAuthSecret
$nextAuthUrl
"@ | Out-File -FilePath $envPath -Encoding UTF8
    
    Write-Host "✓ Created .env.local with NextAuth configuration" -ForegroundColor Green
}

Write-Host "`nDone! Please restart your dev server for changes to take effect." -ForegroundColor Cyan
Write-Host "Run: npm run dev" -ForegroundColor Yellow
