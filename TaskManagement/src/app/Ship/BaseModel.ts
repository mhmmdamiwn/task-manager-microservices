import { Model, ModelStatic } from 'sequelize';
import { getCachedData, setCachedData, generateCacheKey } from './utils/Cache';

// BaseModel for adding the cache mechanism to the repository methods that get used in the entire app
export class BaseModel<TModelAttributes extends {} = any, TCreationAttributes extends {} = any> extends Model<TModelAttributes, TCreationAttributes> {
    static async findByPk<M extends BaseModel>(
        this: ModelStatic<M>,
        identifier: number | string | Buffer,
        options?: any
    ): Promise<M | null> {
        const cacheKey = generateCacheKey(this.name, 'findByPk', { identifier, options });
        let cachedData = await getCachedData(cacheKey);

        if (cachedData) {
            return this.build(cachedData, { isNewRecord: false }) as M;
        }

        const result = await super.findByPk(identifier, { ...options, raw: false });

        if (result) {
            await setCachedData(cacheKey, result.toJSON(), 60); // Cache for 1 minute
        }

        return result as M | null;
    }

    static async findAll<M extends BaseModel>(
        this: ModelStatic<M>,
        options?: any
    ): Promise<M[]> {
        const cacheKey = generateCacheKey(this.name, 'findAll', { options });
        let cachedData = await getCachedData(cacheKey);

        if (cachedData) {
            return cachedData.map((data: any) => this.build(data, { isNewRecord: false }) as M);
        }

        const results = await super.findAll({ ...options, raw: false });

        if (results?.length > 0) {
            await setCachedData(cacheKey, results.map(result => result.toJSON()), 60); // Cache for 1 minute
        }

        return results as M[];
    }
}
