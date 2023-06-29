import { FormEvent, useState } from 'react';
import { ITask } from '../../../interfaces/task.interface';

interface Props {
	item: ITask;
	isOdd: boolean;
	onEditTask: (id: number, status: boolean, title: string) => void;
	onDeleteTask: (id: number) => void;
}

const TaskItem = ({ item, onEditTask, isOdd, onDeleteTask }: Props) => {
	const [checked, setChecked] = useState(item.status);
	const [isEditing, setIsEditing] = useState(false);

	const [title, setTitle] = useState(item.title);

	const toggleEdit = () => {
		if (isEditing) {
			onEditTask(item.id, item.status, title);
		}
		setIsEditing((value) => {
			return !value;
		});
	};

	const onChangeTitle = (e: FormEvent<HTMLInputElement>) => {
		console.log(e.currentTarget.value);

		setTitle(e.currentTarget.value);
	};

	const onCheck = () => {
		setChecked(!checked);
		onEditTask(item.id, !checked, item.title);
	};

	const onDelete = () => {
		onDeleteTask(item.id);
	};

	const bgColor = isOdd ? 'bg-white' : 'bg-[#f2f2f2]';
	const disabledBg = isOdd ? 'disabled:bg-white' : 'disabled:bg-[#f2f2f2]';

	return (
		<div className={'w-full flex  border-solid border border-[#e6e6e6] p-3 ' + `${bgColor}`}>
			<div className=" w-full flex justify-between space-x-5">
				<div className='flex w-full'>
					<input type="checkbox" checked={checked} onChange={onCheck} className="mr-3" />
					<input
						type={'text'}
						value={title}
						onChange={onChangeTitle}
						disabled={!isEditing}
						className={
							'enabled:border-black enabled:border-2 p-2 rounded-md w-full min-w-0' + `${bgColor}` + ` ${disabledBg}`
						}
					></input>
				</div>

				<div className="flex text-white space-x-1">
					<div className="bg-[#28a745] p-2 rounded-md" onClick={toggleEdit}>
						{isEditing ? (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9"
								/>
							</svg>
						) : (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
								/>
							</svg>
						)}
					</div>
					<div className="bg-[#dc3545] p-2 rounded-md" onClick={onDelete}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
							/>
						</svg>
					</div>
				</div>
			</div>
		</div>
	);
};
export default TaskItem;
