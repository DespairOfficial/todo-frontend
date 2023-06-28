import { Task } from './task.interface';
export interface CreateTaskDto extends Omit<Task, 'id' | 'userId'> {}
