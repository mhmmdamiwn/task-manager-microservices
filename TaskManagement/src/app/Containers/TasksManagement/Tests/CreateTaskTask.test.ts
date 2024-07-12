import { Sequelize } from 'sequelize';
import { CreateTaskTask } from '../Tasks/CreateTaskTask';
import { Task } from '../Models';

interface TaskData {
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  dueDate: Date;
  userId: number
}

describe('CreateTaskTask', () => {
    let sequelize: Sequelize;

    beforeAll(async () => {
        sequelize = new Sequelize('sqlite::memory:');
        Task.initModel(sequelize);
        await sequelize.sync();
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('should create a task', async () => {
        const taskData:TaskData = {
            title: 'Test Task',
            description: 'This is a test task',
            status: 'pending',
            dueDate: new Date(),
            userId: 1, // Replace with appropriate user ID
        }
        const createdTask = await CreateTaskTask.run(taskData);
        expect(createdTask).toBeDefined();
        expect(createdTask.title).toBe('Test Task');
        expect(createdTask.description).toBe('This is a test task');
        expect(createdTask.status).toBe('pending');
    });

    it('should throw an error if userId is not provided', async () => {
        const taskData = {
            title: 'Test Task',
            description: 'This is a test task',
            status: 'pending',
            dueDate: new Date(),
        };

        await expect(CreateTaskTask.run(taskData as TaskData)).rejects.toThrowError();
    });

    // Add more tests as needed for error handling, edge cases, etc.
});
