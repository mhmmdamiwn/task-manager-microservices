import { Task } from '../Models';
import {ErrorHandler} from "../../../Ship/Handlers/ErrorHandler";

export class GetTaskByIdTask {
    static async run(taskId: number) {
        const task = await Task.findByPk(taskId);
        if (!task) {
            throw new ErrorHandler('task not found', 404);
        }
        return task;
    }
}
