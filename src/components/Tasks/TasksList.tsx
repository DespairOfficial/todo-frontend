import { FormEvent, FormEventHandler, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	useLazyCreateTaskQuery,
	useGetTasksQuery,
	useLazyUpdateTaskQuery,
} from '../../store/tasks/slices/tasks.api.slice';
import { addTask, editTask, selectCurrentTasks, setTasks } from '../../store/tasks/slices/tasks.slice';
import Header from '../Header/Header';
import Task from './Task/Task';

const TasksList = () => {
	const dispatch = useDispatch();
	const { data, isLoading, isSuccess, isError, error } = useGetTasksQuery({});

	useEffect(() => {
		if (isSuccess) {
			dispatch(setTasks(data));
		}
	}, [data]);

	const tasks = useSelector(selectCurrentTasks);
	console.log(tasks);

	const [createTaskRequest, createTaskResult] = useLazyCreateTaskQuery();
	const [updateTaskRequest, updateTaskResult] = useLazyUpdateTaskQuery();
	const [input, setInput] = useState('');
	const onChangeInput = (e: FormEvent<HTMLInputElement>) => {
		setInput(e.currentTarget.value);
	};

	const onCreateTask = async () => {
		const { data: task, isSuccess: isTaskCreated } = await createTaskRequest({ status: false, title: input });

		if (isTaskCreated) {
			dispatch(addTask(task));
		}
	};

	const onEditTask = async (id: number, status: boolean, title: string) => {
		const { data: task, isSuccess: isTaskCreated } = await updateTaskRequest({
			id,
			body: { status, title },
		});

		if (isTaskCreated) {
			dispatch(editTask(task));
		}
	};

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		onCreateTask();
	};

	let content = null;
	if (isLoading) {
		content = <p>Loading ...</p>;
	} else if (isSuccess) {
		content = (
			<>
				<Header />
				<section className="bg-gradient-to-b bg-white text-black w-1/3  border-solid border-2 border-[#e6e6e6]">
					<h1 className="bg-[#f7f7f7] p-3">Todos (5)</h1>
					<div className="m-3 flex">
						<form action="" onSubmit={onSubmit}>
							<input
								type="text"
								placeholder="Enter todo here"
								className="p-2 rounded-l-md border-solid border-2 border-[#e6e6e6]"
								onChange={onChangeInput}
							/>
							<button className="bg-[#007bff] p-3 rounded-r-md text-white">Submit</button>
						</form>
					</div>
					<div className="m-3 flex border-solid border-2 border-[#e6e6e6]">
						<ul>
							{tasks.map((task, i) => {
								return <Task item={task} key={task.id} isOdd={i % 2 !== 0} onEditTask={onEditTask} />;
							})}
						</ul>
					</div>
				</section>
			</>
		);
	} else if (isError) {
		content = <p>{JSON.stringify(error)}</p>;
	}
	return content;
};
export default TasksList;
