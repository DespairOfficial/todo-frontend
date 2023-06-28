import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../../store';
import { useRegisterMutation } from '../../../store/auth/slices/auth.api.slice';
import { setCredentials } from '../../../store/auth/slices/auth.slice';
import AuthPage from '../AuthPage';

const Register = () => {
	const emailRef = useRef<HTMLInputElement | null>(null);
	const errRef = useRef<HTMLInputElement | null>(null);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [errMsg, setErrMsg] = useState('');
	const navigate = useNavigate();

	const [register, { isLoading }] = useRegisterMutation();
	const dispatch: AppDispatch = useDispatch();

	useEffect(() => {
		emailRef?.current?.focus();
	}, []);

	useEffect(() => {
		setErrMsg('');
	}, [password, email, confirmPassword]);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const userData = await register({ email, password }).unwrap();
			dispatch(setCredentials({ ...userData }));
			// setPassword('');
			// setEmail('');
			navigate('/tasksList');
		} catch (err: any) {
			if (!err?.response) {
				setErrMsg('No server respose');
			} else if (err.response?.status === 400) {
				setErrMsg('Missing Email or Password');
			} else if (err.response?.status === 401) {
				setErrMsg('Unauthorized');
			} else {
				setErrMsg('Login Failed');
			}
			errRef?.current?.focus();
		}
	};

	const handlePasswordInput = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleConfirmPasswordInput = (e: ChangeEvent<HTMLInputElement>) => {
		setConfirmPassword(e.target.value);
	};

	const handleEmailInput = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const content = isLoading ? (
		<h1>Loading...</h1>
	) : (
		<AuthPage>
			<p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'}></p>

			<form action="" onSubmit={handleSubmit} className="flex flex-col">
				<label htmlFor="email" className="text-[#5d5175] font-semibold mb-2 ml-2">
					Email
				</label>
				<input
					type="text"
					id="email"
					ref={emailRef}
					value={email}
					onChange={handleEmailInput}
					autoComplete="off"
					required
					className="bg-[#5d5175] rounded-3xl p-2 mb-3"
				/>

				<label htmlFor="password" className="text-[#5d5175] font-semibold mb-2 ml-2">
					Password
				</label>
				<input
					type="password"
					id="password"
					value={password}
					onChange={handlePasswordInput}
					required
					className="bg-[#5d5175] rounded-3xl p-2 mb-3"
				/>

				<label htmlFor="confirmPassword" className="text-[#5d5175] font-semibold mb-2 ml-2">
					Repeat password
				</label>
				<input
					type="password"
					id="confirmPassword"
					value={confirmPassword}
					onChange={handleConfirmPasswordInput}
					required
					className="bg-[#5d5175] rounded-3xl p-2 mb-10"
				/>
				<button className="bg-[#eec110] rounded-3xl p-2 mb-3">SIGN UP</button>
			</form>
		</AuthPage>
	);

	return content;
};
export default Register;
