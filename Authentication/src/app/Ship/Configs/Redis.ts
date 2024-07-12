import { createClient } from 'redis';

const RedisClient = createClient({
    url: 'redis://localhost:6379'
});

export default RedisClient;
