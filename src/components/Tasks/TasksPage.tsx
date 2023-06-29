import { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	useDeleteTaskMutation,
	useGetTasksQuery,
	useLazyCreateTaskQuery,
	useUpdateTaskMutation,
} from '../../store/tasks/slices/tasks.api.slice';
import { deleteTask, editTask, selectCurrentTasks, setTasks } from '../../store/tasks/slices/tasks.slice';
import Paginator from '../Pagination/Paginator';
import TaskInput from './TaskInput/TaskInput';
import TasksList from './TasksList';

const TasksPage = () => {
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(5);
	const dispatch = useDispatch();
	const { data, isFetching, isSuccess, isError, error, refetch } = useGetTasksQuery({ page, limit });

	useEffect(() => {
		refetch();
	}, [page]);

	useEffect(() => {
		if (isSuccess) {
			dispatch(setTasks(data.body));
		}
	}, [data]);

	const tasks = useSelector(selectCurrentTasks);

	const [createTaskRequest] = useLazyCreateTaskQuery();
	const [updateTaskTrigger, { data: updatedTask, isSuccess: isTaskUpdated }] = useUpdateTaskMutation();
	const [deleteTaskTrigger, { data: deletedTask, isSuccess: isTaskDeleted }] = useDeleteTaskMutation();


	const onCreateTask = async (input: string) => {
		await createTaskRequest({ status: false, title: input });
		await refetch();
	};

	const onDeleteTask = async (id: number) => {
		await deleteTaskTrigger({
			id,
		});
	};

	useEffect(() => {
		if (deletedTask) {
			dispatch(deleteTask(deletedTask));
			refetch();
		}
	}, [isTaskDeleted]);

	const onEditTask = async (id: number, status: boolean, title: string) => {
		await updateTaskTrigger({
			id,
			body: { status, title },
		});
	};

	useEffect(() => {
		if (updatedTask) {
			dispatch(editTask(updatedTask));
		}
	}, [isTaskUpdated]);


	return (
		<>
			{data && data.meta ? <Paginator isFetching={isFetching} meta={data?.meta} setPage={setPage} /> : null}
			<TaskInput  onCreateTask={onCreateTask} />
			<TasksList
				onDeleteTask={onDeleteTask}
				onEditTask={onEditTask}
				isError={isError}
				error={error}
				isSuccess={isSuccess}
				tasks={tasks}
			/>
		</>
	);
};

export default TasksPage;
