// models
import { Task } from '../Models';

export class CreateTaskTask {
    static async run(data: { title: string; description: string; status: 'pending' | 'in-progress' | 'completed'; dueDate: Date; userId: number }) {
        return Task.create(data);
    }
}
