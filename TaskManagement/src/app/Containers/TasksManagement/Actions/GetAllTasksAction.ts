// tasks
import {GetAllTasks} from "../Tasks/GetAllTasks";
import {GetUserTasks} from "../Tasks/GetUserTasks";
import {UserRequest} from "../Controllers/TaskController";

export class GetAllTasksAction {
    static async run(req:UserRequest) {
        const userId = req?.user?.id as number; // Assign user ID from authenticated user
        const role = req.user?.role as 'admin' | 'user'; // Access role property from User model

        if(role==='admin'){
            return GetAllTasks.run()
        }

        return GetUserTasks.run(userId)
    }
}
