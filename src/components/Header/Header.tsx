import { logOut, selectCurrentUser } from '../../store/auth/slices/auth.slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const Header = () => {
	const dispatch = useAppDispatch();
	const user = useAppSelector(selectCurrentUser);
	const onSubmit = () => {
		dispatch(logOut());
	};
	console.log(user);

	return (
		<div className="absolute top-0 bg-[#343a40] w-full items-center flex p-4 font-medium text-white justify-between">
			<div>{user ? user.email : 'Not authorized'}</div>
			<form action="" onSubmit={onSubmit}>
				<button className="bg-[#007bff] p-3 rounded-md text-white">Logout</button>
			</form>
		</div>
	);
};
export default Header;
