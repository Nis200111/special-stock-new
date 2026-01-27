#!/usr/bin/env node

/**
 * This script checks if NextAuth environment variables are set
 * and provides guidance if they're missing
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Checking NextAuth Configuration...\n');

const envPath = path.join(process.cwd(), '.env.local');
const hasEnvFile = fs.existsSync(envPath);

if (!hasEnvFile) {
    console.log('❌ .env.local file not found!\n');
    console.log('📝 Creating .env.local file with NextAuth configuration...\n');

    const envContent = `# Backend API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000

# NextAuth Configuration
NEXTAUTH_SECRET=your-secret-key-change-this-in-production-use-openssl-rand-base64-32
NEXTAUTH_URL=http://localhost:3000

# Optional: Google OAuth (uncomment and configure if needed)
# GOOGLE_CLIENT_ID=your-google-client-id
# GOOGLE_CLIENT_SECRET=your-google-client-secret
`;

    fs.writeFileSync(envPath, envContent, 'utf8');
    console.log('✅ Created .env.local file\n');
    console.log('⚠️  IMPORTANT: Change the NEXTAUTH_SECRET to a secure value!');
    console.log('   You can generate one with: openssl rand -base64 32\n');
    process.exit(0);
}

const envContent = fs.readFileSync(envPath, 'utf8');

const hasSecret = envContent.includes('NEXTAUTH_SECRET');
const hasUrl = envContent.includes('NEXTAUTH_URL');

if (hasSecret && hasUrl) {
    console.log('✅ NextAuth environment variables are configured!\n');

    // Check if using default secret
    if (envContent.includes('your-secret-key-change-this-in-production')) {
        console.log('⚠️  WARNING: You are using the default NEXTAUTH_SECRET!');
        console.log('   This is insecure for production.');
        console.log('   Generate a secure secret with: openssl rand -base64 32\n');
    } else {
        console.log('✅ Using custom NEXTAUTH_SECRET (good!)\n');
    }
} else {
    console.log('❌ Missing NextAuth environment variables in .env.local\n');

    if (!hasSecret) {
        console.log('   Missing: NEXTAUTH_SECRET');
    }
    if (!hasUrl) {
        console.log('   Missing: NEXTAUTH_URL');
    }

    console.log('\n📝 Adding missing variables to .env.local...\n');

    let updatedContent = envContent;

    if (!updatedContent.includes('# NextAuth Configuration')) {
        updatedContent += '\n\n# NextAuth Configuration\n';
    }

    if (!hasSecret) {
        updatedContent += 'NEXTAUTH_SECRET=your-secret-key-change-this-in-production-use-openssl-rand-base64-32\n';
    }

    if (!hasUrl) {
        updatedContent += 'NEXTAUTH_URL=http://localhost:3000\n';
    }

    fs.writeFileSync(envPath, updatedContent, 'utf8');
    console.log('✅ Added missing NextAuth variables to .env.local\n');
    console.log('⚠️  IMPORTANT: Change the NEXTAUTH_SECRET to a secure value!');
    console.log('   You can generate one with: openssl rand -base64 32\n');
}

console.log('📋 Summary:');
console.log('   - NextAuth API routes: src/app/api/auth/[...nextauth]/route.ts');
console.log('   - Seller dashboard: src/app/seller/dashboard/page.jsx');
console.log('   - Auth config: src/auth.ts');
console.log('   - Type definitions: src/types/next-auth.d.ts\n');

console.log('🚀 Next steps:');
console.log('   1. Restart your dev server: npm run dev');
console.log('   2. Test session endpoint: /api/auth/session');
console.log('   3. Test seller dashboard: /seller/dashboard\n');

console.log('✨ All set! Your NextAuth configuration is ready.\n');
