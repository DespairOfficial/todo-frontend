import { FormEvent, useState } from 'react';

interface Props {
	onCreateTask: (input: string) => void;
}

const TaskInput = ({ onCreateTask }: Props) => {
	const [input, setInput] = useState('');
	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		onCreateTask(input);
		setInput('');
	};

	const onChangeInput = (e: FormEvent<HTMLInputElement>) => {
		setInput(e.currentTarget.value);
	};

	return (
		<div className="m-3 flex">
			<form action="" onSubmit={onSubmit} className="w-full flex">
				<input
					type="text"
					placeholder="Enter todo here"
					className="p-2 rounded-l-md border-solid border border-[#e6e6e6] w-full"
					onChange={onChangeInput}
					value={input}
				/>
				<button className="bg-[#007bff] p-3 rounded-r-md text-white">Submit</button>
			</form>
		</div>
	);
};

export default TaskInput;
