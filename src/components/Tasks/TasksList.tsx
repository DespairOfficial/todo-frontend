import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { ITask } from '../../interfaces/task.interface';
import Task from './Task/Task';

interface Props {
	isSuccess: boolean;
	tasks: ITask[];
	onDeleteTask: (id: number) => void;
	onEditTask: (id: number, status: boolean, title: string) => void;
	isError: boolean;
	error: FetchBaseQueryError | SerializedError | undefined;
}

const TasksList = ({ isSuccess, tasks, onDeleteTask, onEditTask, isError, error }: Props) => {
	let content = null;
	if (isSuccess) {
		content = (
			<div className="m-3 flex border-solid border border-[#e6e6e6]">
				<ul className="w-full">
					{tasks.map((task, i) => {
						return (
							<Task item={task} key={task.id} isOdd={i % 2 !== 0} onEditTask={onEditTask} onDeleteTask={onDeleteTask} />
						);
					})}
				</ul>
			</div>
		);
	} else if (isError) {
		content = <p>{JSON.stringify(error)}</p>;
	}
	return content;
};
export default TasksList;
