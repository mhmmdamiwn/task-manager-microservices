import { Sequelize } from 'sequelize';
import { GetAllTasks } from '../Tasks/GetAllTasks';
import { Task } from '../Models';
import RedisClient from "../../../Ship/Configs/Redis";

describe('GetAllTasks', () => {
    let sequelize: Sequelize;

    beforeAll(async () => {
        // Connect to Redis
        RedisClient.connect()
            .then(()=>{
                console.log('redis connected')
            })
            .catch((err) => {
                console.error('Error connecting to Redis:', err);
            });
        sequelize = new Sequelize('sqlite::memory:');
        Task.initModel(sequelize);
        await sequelize.sync();

        // Insert test tasks
        await Task.bulkCreate([
            {
                title: 'Task 1',
                description: 'Description for Task 1',
                status: 'pending',
                dueDate: new Date(),
                userId: 1,
            },
            {
                title: 'Task 2',
                description: 'Description for Task 2',
                status: 'completed',
                dueDate: new Date(),
                userId: 1,
            },
        ]);
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('should fetch all tasks', async () => {
        const tasks = await GetAllTasks.run();
        expect(tasks).toHaveLength(2);
    });

    // Add more tests for filtering, pagination, etc.
});
