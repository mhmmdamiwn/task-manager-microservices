import { Sequelize } from 'sequelize';
import { UpdateTaskTask } from '../Tasks/UpdateTaskTask';
import { GetTaskByIdTask } from '../Tasks/GetTaskByIdTask';
import { Task } from '../Models';
import RedisClient from "../../../Ship/Configs/Redis";

interface TaskData {
    title?: string;
    description?: string;
    status?: 'pending' | 'in-progress' | 'completed';
    dueDate?: Date;
    userId?: number
}

describe('UpdateTaskTask', () => {
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

        // Create a task for testing update
        const createdTask = await Task.create({
            title: 'Test Task for Update',
            description: 'This is a test task for update',
            status: 'pending',
            dueDate: new Date(),
            userId: 1,
        });
        testTaskId = createdTask.id;
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('should update a task', async () => {
        const updateData:TaskData = {
            title: 'Updated Task Title',
            description: 'Updated description',
            status: 'completed',
        };

        await UpdateTaskTask.run(updateData, { id: testTaskId });

        const updatedTask = await GetTaskByIdTask.run(testTaskId);
        expect(updatedTask).toBeDefined();
        expect(updatedTask.title).toBe('Updated Task Title');
        expect(updatedTask.description).toBe('Updated description');
        expect(updatedTask.status).toBe('completed');
    });
});
