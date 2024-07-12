import { Task } from '../Models';

export class UpdateTaskTask {
    static async run(
        data: { title?: string; description?: string; status?: 'pending' | 'in-progress' | 'completed'; dueDate?: Date; userId?: number },
        options:{}) {
        await Task.update(
            data,
            { where: options}
        );
    }
}
