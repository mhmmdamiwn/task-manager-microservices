import { Request, Response } from 'express';

// actions
import {CreateTaskAction}  from '../Actions/CreateTaskAction';
import {DeleteTaskAction}  from '../Actions/DeleteTaskAction';
import {UpdateTaskAction}  from '../Actions/UpdateTaskAction';
import {FindTasksAction}  from '../Actions/FindTasksAction';
import {MarkTodayTasksAction}  from '../Actions/MarkTodayTasksAction';
import {GetTaskByIdAction}  from '../Actions/GetTaskByIdAction';
import {GetAllTasksAction} from "../Actions/GetAllTasksAction";

// interfaces
export interface UserRequest extends Request{
    user?: {id:number} & { role?: string }; // Extend User with role property
}
interface MyError extends Error {
    statusCode?: number; // Optional property for status code
    message: string;
    code?: string; // Optional property for specific error codes (e.g., from the database)
}
export interface UserWithRole {
    id: number
    role: string; // Ensure role is a string
}

export class TaskController {
    public static async getAllTasks(req: Request, res: Response) {
        const tasks = await GetAllTasksAction.run(req)
        res.json(tasks);
    }

    public static async getTaskById(req: Request, res: Response) {
        const task = await GetTaskByIdAction.run(req);
        res.json(task);
    }

    public static async createTask(req: Request, res: Response) {
        const task = await CreateTaskAction.run(req);
        res.json(task);
    }

    public static async updateTask(req: Request, res: Response) {
        const updatedTask = await UpdateTaskAction.run(req);
        res.json(updatedTask);
    }

    public static async deleteTask(req: Request, res: Response) {
        const result = await DeleteTaskAction.run(req);
        res.json(result);
    }

    public static async searchTasks(req: Request, res: Response) {
        const tasks = await FindTasksAction.run(req);
        res.json(tasks);
    }

    public static async markTasksToday(req: Request, res: Response) {
        const result = await MarkTodayTasksAction.run(req);
        res.json(result);
    }
}
