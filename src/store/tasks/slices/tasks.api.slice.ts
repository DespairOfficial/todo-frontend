import { PaginationResult } from './../../../interfaces/pagination/paginationResult';
import { UpdateTaskDto } from './../../../interfaces/update-task.dto';
import { CreateTaskDto } from './../../../interfaces/create-task.dto';
import { ITask } from '../../../interfaces/task.interface';
import { apiSlice } from '../../base-api.slice';

export const tasksApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getTasks: builder.query<PaginationResult<ITask>, { page: number; limit: number }>({
			query: ({ page, limit }) => `/todos?page=${page}&limit=${limit}`,
			keepUnusedDataFor: 60,
		}),
		createTask: builder.query<ITask, CreateTaskDto>({
			query: (body: CreateTaskDto) => ({
				url: '/todos',
				method: 'POST',
				body,
			}),
			keepUnusedDataFor: 60,
		}),
		updateTask: builder.mutation<ITask, { id: number; body: UpdateTaskDto }>({
			query: ({ body, id }) => ({
				url: `/todos/${id}`,
				method: 'PATCH',
				body,
			}),
		}),
		deleteTask: builder.mutation<ITask, { id: number }>({
			query: ({ id }) => ({
				url: `/todos/${id}`,
				method: 'DELETE',
			}),
		}),
	}),
});

export const { useGetTasksQuery, useLazyCreateTaskQuery, useUpdateTaskMutation, useDeleteTaskMutation } = tasksApiSlice;
