// models
import { Task } from '../Models';

export class GetAllTasks {
    static async run(options:{}={}) {
        return Task.findAll({
            where:options
        });
    }
}
