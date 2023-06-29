import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../../store';
import { useRegisterMutation, useSendEmailVerificationCodeMutation } from '../../../store/auth/slices/auth.api.slice';
import { setCredentials } from '../../../store/auth/slices/auth.slice';
import AuthPage from '../AuthPage';

const Register = () => {
	const emailRef = useRef<HTMLInputElement | null>(null);
	const errRef = useRef<HTMLInputElement | null>(null);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [emailVerificationCode, setEmailVerificationCode] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [errMsg, setErrMsg] = useState('');
	const navigate = useNavigate();

	const [register, { isLoading }] = useRegisterMutation();
	const [sendEmailCode] = useSendEmailVerificationCodeMutation();
	const dispatch: AppDispatch = useDispatch();

	useEffect(() => {
		emailRef?.current?.focus();
	}, []);

	useEffect(() => {
		setErrMsg('');
	}, [password, email, confirmPassword, emailVerificationCode]);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (confirmPassword !== password) {
			setErrMsg('Passwords does not match');
			errRef?.current?.focus();
		}

		try {
			const userData = await register({ email, password, emailVerificationCode }).unwrap();
			dispatch(setCredentials({ ...userData }));
			setPassword('');
			setEmail('');
			navigate('/tasksPage');
		} catch (err: any) {
			if (err.status === 400) {
				setErrMsg(err.data.message);
			} else if (err.status === 401) {
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

	const handleEmailVerificationCode = (e: ChangeEvent<HTMLInputElement>) => {
		setEmailVerificationCode(e.target.value);
	};

	const onSendEmailCode = async () => {
		try {
			await sendEmailCode(email).unwrap();
		} catch (err: any) {
			console.log(err);

			if (err.status === 400) {
				setErrMsg(err.data.message);
			}
		}
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
				<div className="flex w-full items-center mb-3">
					<input
						type="text"
						id="email"
						ref={emailRef}
						value={email}
						onChange={handleEmailInput}
						autoComplete="off"
						required
						className=" bg-[#5d5175] rounded-l-3xl p-3  w-full"
					/>
					<button type="button" className="relative bg-[#eec110] p-3 rounded-r-3xl" onClick={onSendEmailCode}>
						Send
					</button>
				</div>

				<label htmlFor="password" className="text-[#5d5175] font-semibold mb-2 ml-2">
					Password
				</label>
				<input
					type="password"
					id="password"
					value={password}
					onChange={handlePasswordInput}
					required
					className="bg-[#5d5175] rounded-3xl p-3 mb-3"
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

				<label htmlFor="emailVerificationCode " className="text-[#5d5175] font-semibold mb-2 ml-2">
					Code from Email
				</label>
				<input
					type="text"
					id="emailVerificationCode  "
					value={emailVerificationCode}
					onChange={handleEmailVerificationCode}
					required
					className="bg-[#5d5175] rounded-3xl p-2 mb-10"
				/>
				<button className="bg-[#eec110] rounded-3xl p-2 mb-3">SIGN UP</button>
			</form>
		</AuthPage>
	);
};
export default Register;
