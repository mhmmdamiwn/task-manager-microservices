// models
import { Task } from '../Models';

// bases
import {ErrorHandler} from "../../../Ship/Handlers/ErrorHandler";

export class GetUserTasks {
    static async run(userId: number) {
        const tasks = await Task.findAll({
            where:{
                userId
            }
        });
        if (!tasks) {
            throw new ErrorHandler('task not found', 404);
        }
        return tasks;
    }
}
