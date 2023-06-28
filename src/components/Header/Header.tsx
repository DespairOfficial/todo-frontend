import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/auth/slices/auth.slice';

const Header = () => {
	const user = useSelector(selectCurrentUser);
		return <div className="absolute top-0 bg-[#343a40] w-full items-center flex p-4 font-medium text-white">{user ? user.email : 'Not authorized'}</div>;
};
export default Header;
