import { Sequelize } from 'sequelize';
import { DeleteTaskTask } from '../Tasks/DeleteTaskTask';
import { Task } from '../Models';
import RedisClient from "../../../Ship/Configs/Redis";

describe('DeleteTaskTask', () => {
    let sequelize: Sequelize;
    let testTaskId: number;

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

        // Create a task for testing deletion
        const createdTask = await Task.create({
            title: 'Test Task for Deletion',
            description: 'This is a test task for deletion',
            status: 'pending',
            dueDate: new Date(),
            userId: 1,
        });

        testTaskId = createdTask.id;
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('should delete a task', async () => {
        const result = await DeleteTaskTask.run(testTaskId);
        expect(result).toBeDefined();
        expect(result.message).toBe('Task deleted successfully');
    });

    it('should throw an error if task does not exist', async () => {
        const nonExistingTaskId = testTaskId + 100; // Assume a non-existing ID
        await expect(DeleteTaskTask.run(nonExistingTaskId)).rejects.toThrowError();
    });
});
