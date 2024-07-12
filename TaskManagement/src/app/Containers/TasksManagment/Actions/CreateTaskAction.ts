import {CreateTaskTask} from "../Tasks/CreateTaskTask";
import {UserRequest} from "../Controllers/TaskController";
import dayjs from "dayjs";

interface TaskData {
    title: string;
    description: string;
    status: 'pending' | 'in-progress' | 'completed';
    dueDate: Date;
    userId: number
}

export class CreateTaskAction {
    static async run(req:UserRequest) {
        const taskData: TaskData = req.body;

        taskData.userId = <number>req?.user?.id; // Assign user ID from authenticated user
        taskData.dueDate = new Date(dayjs(taskData.dueDate).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'));

        return CreateTaskTask.run(taskData)
    }
}
