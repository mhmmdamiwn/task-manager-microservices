import { Sequelize } from 'sequelize';
import { GetUserTasks } from '../Tasks/GetUserTasks';
import { Task } from '../Models';
import RedisClient from "../../../Ship/Configs/Redis";

describe('GetUserTasks', () => {
    let sequelize: Sequelize;
    let testUserId: number;

    beforeAll(async () => {
        // Connect to Redis
        RedisClient.connect()
            .then()
            .catch((err) => {
                console.error('Error connecting to Redis:', err);
            });
        sequelize = new Sequelize('sqlite::memory:');
        Task.initModel(sequelize);
        await sequelize.sync();

        // Insert tasks for different users
        await Task.bulkCreate([
            {
                title: 'Task 1 for User 1',
                description: 'Description for Task 1 for User 1',
                status: 'pending',
                dueDate: new Date(),
                userId: 1,
            },
            {
                title: 'Task 2 for User 2',
                description: 'Description for Task 2 for User 2',
                status: 'completed',
                dueDate: new Date(),
                userId: 2,
            },
        ]);

        testUserId = 1; // Assume we're testing for user with ID 1
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('should fetch tasks for a user', async () => {
        const tasks = await GetUserTasks.run(testUserId);
        expect(tasks).toHaveLength(1);
        expect(tasks[0].userId).toBe(testUserId);
    });

    // Add more tests for filtering, pagination, etc.
});
