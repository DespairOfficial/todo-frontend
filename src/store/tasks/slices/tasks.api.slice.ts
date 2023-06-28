import { UpdateTaskDto } from './../../../interfaces/update-task.dto';
import { CreateTaskDto } from './../../../interfaces/create-task.dto';
import { Task } from '../../../interfaces/task.interface';
import { apiSlice } from '../../base-api.slice';

export const tasksApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getTasks: builder.query<Task[], {}>({
			query: () => '/todos',
			keepUnusedDataFor: 60,
		}),
		createTask: builder.query<Task, CreateTaskDto>({
			query: (body: CreateTaskDto) => ({
				url: '/todos',
				method: 'post',
				body,
			}),
			keepUnusedDataFor: 60,
		}),
		updateTask: builder.query<Task, { id: number; body: UpdateTaskDto }>({
			query: ({ body, id }) => ({
				url: `/todos/${id}`,
				method: 'patch',
				body,
			}),
		}),
	}),
});
export const { useGetTasksQuery, useLazyCreateTaskQuery, useLazyUpdateTaskQuery } = tasksApiSlice;
