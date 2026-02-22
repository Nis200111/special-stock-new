const https = require('https');

const url = 'https://s3.us-east-005.backblazeb2.com';

console.log(`Checking time against ${url}...`);
console.log(`Local Time: ${new Date().toISOString()}`);

https.get(url, (res) => {
    const serverDate = res.headers.date;
    console.log(`Server Date Header: ${serverDate}`);

    if (serverDate) {
        const serverTime = new Date(serverDate).getTime();
        const localTime = Date.now();
        const diff = localTime - serverTime;
        console.log(`Time Difference (Local - Server): ${diff} ms`);
        console.log(`Time Difference (days): ${diff / (1000 * 60 * 60 * 24)}`);
    } else {
        console.log("No Date header received.");
    }
}).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
});
