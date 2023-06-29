import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../../store';
import { useLoginMutation } from '../../../store/auth/slices/auth.api.slice';
import { setCredentials } from '../../../store/auth/slices/auth.slice';
import AuthPage from '../AuthPage';

const Login = () => {
	const emailRef = useRef<HTMLInputElement | null>(null);
	const errRef = useRef<HTMLInputElement | null>(null);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errMsg, setErrMsg] = useState('');
	const navigate = useNavigate();

	const [login, { isLoading }] = useLoginMutation();
	const dispatch: AppDispatch = useDispatch();

	useEffect(() => {
		emailRef?.current?.focus();
	}, []);

	useEffect(() => {
		setErrMsg('');
	}, [email, password]);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const userData = await login({ email, password }).unwrap();

			dispatch(setCredentials({ ...userData }));
			setEmail('');
			setPassword('');
			navigate('/tasksPage');
		} catch (err: any) {
			if (err.status === 400) {
				const msg = err.data.message ?? err.data[0];
				setErrMsg(msg);
			} else if (err.status === 401) {
				setErrMsg(err.data.message);
			} else {
				setErrMsg(err.data.message);
			}
			errRef?.current?.focus();
		}
	};

	const handleEmailInput = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handlePasswordInput = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	return (
		<AuthPage>
			<p ref={errRef} className={errMsg ? 'text-red-300' : 'hidden'}>
				{errMsg}
			</p>

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
					className="bg-[#5d5175] rounded-3xl p-3 mb-3 pl-3"
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
					className="bg-[#5d5175] rounded-3xl p-3 mb-5"
				/>

				<div>
					<input type="checkbox" id="keep" className="bg-[#eec110] mb-10 mx-2" />
					<label htmlFor="keep">Keep Me Signed In</label>
				</div>

				<button className="bg-[#eec110] rounded-3xl p-2 mb-3">SIGN IN</button>
			</form>
		</AuthPage>
	);
};
export default Login;
