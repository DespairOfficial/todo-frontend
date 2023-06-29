import { ITask } from './task.interface';
export interface UpdateTaskDto extends Omit<ITask, 'id' | 'userId'> {}
