import { GetTaskByIdTask } from "../Tasks/GetTaskByIdTask";
import {UserRequest,UserWithRole} from "../Controllers/TaskController";
import {ErrorHandler} from "../../../Ship/Handlers/ErrorHandler";

interface TaskData {
    title?: string;
    description?: string;
    status?: 'pending' | 'in-progress' | 'completed';
    dueDate?: Date;
    userId?: number
}

export class UpdateTaskAction {
    static async run(req:UserRequest) {
        const taskId = Number(req.params.id);
        const taskData: TaskData = req.body;
        const user = req?.user as UserWithRole
        const task = await GetTaskByIdTask.run(taskId);

        if (user.role === 'admin' || task.userId === user.id){
            await task.update(taskData);
            return task;
        }
        else{
            throw new ErrorHandler('access denied', 403);
        }

    }
}
