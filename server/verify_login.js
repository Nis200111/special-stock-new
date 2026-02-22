
async function verifyLogin() {
    const baseURL = 'http://localhost:5000'; // Assuming port 5000 from server.js

    try {
        console.log('Testing System Admin Login (User model)...');
        // Login User
        try {
            const response = await fetch(`${baseURL}/api/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: 'admin@stockmedia.com', // changed to email as per controller logic
                    password: '1234567'
                })
            });
            const data = await response.json();

            if (response.ok) {
                console.log('✅ System Admin Login Successful');
                console.log('   Token:', data.accessToken ? 'Received' : 'Missing');
                console.log('   Role:', data.role);
            } else {
                console.error('❌ System Admin Login Failed:', data.message || response.statusText);
            }

        } catch (error) {
            console.error('❌ System Admin Login Error:', error.message);
        }

        console.log('\nTesting Customer Admin Login (Customer model)...');
        // Login Customer
        try {
            const response = await fetch(`${baseURL}/api/customers/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: 'admin@stockmedia.com',
                    password: '1234567'
                })
            });
            const data = await response.json();

            if (response.ok) {
                console.log('✅ Customer Admin Login Successful');
                console.log('   Token:', data.accessToken ? 'Received' : 'Missing');
                console.log('   Role:', data.role);
            } else {
                console.error('❌ Customer Admin Login Failed:', data.message || response.statusText);
            }

        } catch (error) {
            console.error('❌ Customer Admin Login Error:', error.message);
        }

    } catch (error) {
        console.error('Test Script Error:', error.message);
    }
}

verifyLogin();
