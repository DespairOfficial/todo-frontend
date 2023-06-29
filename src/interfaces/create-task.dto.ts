import { ITask } from './task.interface';

export interface CreateTaskDto extends Omit<ITask, 'id' | 'userId'> {}
