import { createClient } from 'redis';

const client = createClient({
    url: 'redis://localhost:6379',
});

client.on('error', (err) => console.log('Redis Client Error', err));

client.connect().then(() => {
    console.log('Connected to Redis');
    client.quit();
}).catch((err) => {
    console.error('Error connecting to Redis:', err);
});
