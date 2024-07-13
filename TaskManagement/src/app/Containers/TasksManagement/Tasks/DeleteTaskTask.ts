// models
import { Task } from '../Models';

// bases
import {ErrorHandler} from "../../../Ship/Handlers/ErrorHandler";

export class DeleteTaskTask {
    static async run(taskId: number) {
        const task = await Task.findByPk(taskId);
        if (!task) {
            throw new ErrorHandler('task not found', 404);
        }
        await Task.destroy({
            where:{
                id:taskId
            }
        })
        return { message: 'Task deleted successfully' };
    }
}
