import { createSlice } from '@reduxjs/toolkit';
import { Task } from '../../../interfaces/task.interface';

export interface ITasksState {
	tasks: Task[];
}

const initialState: ITasksState = {
	tasks: [],
};

const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		setTasks: (state, action) => {
			const payload: Task[] = action.payload;
			state.tasks = payload;
		},

		addTask: (state, action) => {
			const payload: Task = action.payload;

			state.tasks.push(payload);
		},

		editTask: (state, action) => {
			const payload: Task = action.payload;

			const editedIndex = state.tasks.findIndex((item) => {
				return item.id === payload.id;
			});
			state.tasks[editedIndex] = payload;
		},
	},
});

export const { setTasks, addTask, editTask } = tasksSlice.actions;

export default tasksSlice.reducer;

export const selectCurrentTasks = (state: { tasks: { tasks: Task[] } }) => state.tasks.tasks;
