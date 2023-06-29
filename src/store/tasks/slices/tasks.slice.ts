import { createSlice } from '@reduxjs/toolkit';
import { ITask } from '../../../interfaces/task.interface';

export interface ITasksState {
	tasks: ITask[];
}

const initialState: ITasksState = {
	tasks: [],
};

const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		setTasks: (state, action) => {
			const payload: ITask[] = action.payload;
			state.tasks = payload;
		},

		addTask: (state, action) => {
			const payload: ITask = action.payload;

			state.tasks.push(payload);
		},

		editTask: (state, action) => {
			const payload: ITask = action.payload;

			const editedIndex = state.tasks.findIndex((item) => {
				return item.id === payload.id;
			});
			state.tasks[editedIndex] = payload;
		},

		deleteTask: (state, action) => {
			const payload: ITask = action.payload;

			const deletedIndex = state.tasks.findIndex((item) => {
				return item.id === payload.id;
			});
			state.tasks.splice(deletedIndex, 1);
		},
	},
});

export const { setTasks, addTask, editTask, deleteTask } = tasksSlice.actions;

export default tasksSlice.reducer;

export const selectCurrentTasks = (state: { tasks: { tasks: ITask[] } }) => state.tasks.tasks;
