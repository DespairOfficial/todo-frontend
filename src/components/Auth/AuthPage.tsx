import { NavLink } from 'react-router-dom';

interface Props {
	children: any;
}

const AuthPage: React.FC<Props> = ({ children }) => {
	return (
		<div className="bg-gradient-to-b from-[#38315a] to-[#2c0c3d] text-white p-10 w-1/3">
			<div className="mx-5">
				<div className="mb-5 space-x-10">
					<NavLink
						to="/login"
						style={({ isActive }) => ({
							borderBottom: isActive ? 'solid #eec110 2px' : '',
						})}
					>
						SIGN IN
					</NavLink>
					<NavLink
						to="/register"
						style={({ isActive }) => ({
							borderBottom: isActive ? 'solid #eec110 2px' : '',
						})}
					>
						SIGN UP
					</NavLink>
				</div>
				{children}

				<hr className="border-[#5d5175] border-2 my-8" />
				<div className="flex justify-center">
					<p className="text-[#5d5175] font-semibold">Forgot Password</p>
				</div>
			</div>
		</div>
	);
};
export default AuthPage;
