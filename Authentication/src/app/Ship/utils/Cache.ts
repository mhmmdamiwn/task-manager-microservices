import redisClient from '../Configs/Redis';

export const getCachedData = async (key: string) => {
    const cachedData = await redisClient.get(key);
    return cachedData ? JSON.parse(cachedData) : null;
};

export const setCachedData = async (key: string, data: any, expiry: number) => {
    await redisClient.set(key, JSON.stringify(data), {
        EX: expiry,
    });
};

export const generateCacheKey = (model: string, method: string, params: any) => {
    return `${model}:${method}:${JSON.stringify(params)}`;
};
