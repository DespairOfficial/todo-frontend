import { useState } from 'react';
import { Task } from '../../../interfaces/task.interface';

interface Props {
	item: Task;
	isOdd: boolean;
	onEditTask: (id: number, status: boolean, title: string) => void;
}

const TaskItem = ({ item, onEditTask }: Props) => {
	const [checked, setChecked] = useState(item.status);
	const onCheckTask = () => {
		onEditTask(item.id, item.status, item.title);
	};
	return (
		<div className="bg-[#f2f2f2]">
			<input type="checkbox" checked={checked} onChange={onCheckTask} />
			{item.status} {item.title}
		</div>
	);
};
export default TaskItem;
