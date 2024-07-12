import {GetTaskByIdTask} from "../Tasks/GetTaskByIdTask";
import {DeleteTaskTask} from "../Tasks/DeleteTaskTask";
import {UserRequest,UserWithRole} from "../Controllers/TaskController";
import {ErrorHandler} from "../../../Ship/Handlers/ErrorHandler";

export class DeleteTaskAction {
    static async run(req: UserRequest) {
        const taskId = Number(req.params.id);
        const user = req?.user as UserWithRole
        const task = await GetTaskByIdTask.run(taskId)

        if (user.role === 'admin' || task.userId === user.id){
            return DeleteTaskTask.run(taskId);
        }
        else{
            throw new ErrorHandler('access denied', 403);
        }
    }
}
