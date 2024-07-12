import { Sequelize } from 'sequelize';
import { GetTaskByIdTask } from '../Tasks/GetTaskByIdTask';
import { Task } from '../Models';
import RedisClient from "../../../Ship/Configs/Redis";

describe('GetTaskByIdTask', () => {
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

        // Create a task for testing retrieval
        const createdTask = await Task.create({
            title: 'Test Task for Retrieval',
            description: 'This is a test task for retrieval',
            status: 'pending',
            dueDate: new Date(),
            userId: 1,
        });

        testTaskId = createdTask.id;
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('should fetch a task by ID', async () => {
        const task = await GetTaskByIdTask.run(testTaskId);
        expect(task).toBeDefined();
        expect(task.id).toBe(testTaskId);
    });

    it('should throw an error if task does not exist', async () => {
        const nonExistingTaskId = testTaskId + 100; // Assume a non-existing ID
        await expect(GetTaskByIdTask.run(nonExistingTaskId)).rejects.toThrowError();
    });

    // Add more tests for other scenarios
});
