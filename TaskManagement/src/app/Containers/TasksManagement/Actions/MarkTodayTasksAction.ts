import { Op } from 'sequelize';
import {UpdateTaskTask} from "../Tasks/UpdateTaskTask";
import {UserRequest} from "../Controllers/TaskController";
import dayjs from 'dayjs';


export class MarkTodayTasksAction {
    static async run(req: UserRequest) {
        const userId = <number>req?.user?.id;

        const today = dayjs();
        const startOfDay = today.startOf('day').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
        const endOfDay = today.endOf('day').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

        await UpdateTaskTask.run({ status: 'in-progress' },{ userId, dueDate: { [Op.gte]: startOfDay, [Op.lt]: endOfDay } })

        return { message: 'Tasks due today marked as in-progress' };
    }
}
