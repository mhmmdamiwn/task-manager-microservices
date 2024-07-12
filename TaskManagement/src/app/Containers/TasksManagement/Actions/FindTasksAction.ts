import {GetAllTasks} from "../Tasks/GetAllTasks";
import {Op} from "sequelize";
import {UserRequest,UserWithRole} from "../Controllers/TaskController";


export class FindTasksAction {
    static async run(req: UserRequest) {
        const query = req.query;
        const user = req?.user as UserWithRole
        const options: any = {};

        // Map query parameters to options
        if (query.title) {
            options.title = { [Op.like]: `%${query.title}%` };
        }
        if (query.description) {
            options.description = { [Op.like]: `%${query.description}%` };
        }
        if (query.status) {
            options.status = query.status;
        }
        if (query.userId) {
            options.userId = query.userId;
        }
        if (query.dueDate) {
            options.dueDate = query.dueDate;
        }
        if(user.role !== 'admin'){
            options.userId = user.id
        }

        return GetAllTasks.run(options);
    }
}
