import { createClient } from 'redis';

const RedisClient = createClient({
    url: 'redis://redis:6379'
});

export default RedisClient;
