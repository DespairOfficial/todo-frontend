import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Login from './components/Auth/Login/Login';
import RequireAuth from './components/Auth/RequireAuth';
import Register from './components/Auth/Register/Register';
import TasksList from './components/Tasks/TasksList';
import { setCredentials } from './store/auth/slices/auth.slice';
import { useDispatch } from 'react-redux';
import { useInitQuery } from './store/users/slices/users.api.slice';
function App() {
	const dispatch = useDispatch();

	const { data } = useInitQuery({});

	useEffect(() => {
		dispatch(setCredentials(data));
	}, [data]);

	return (
		<>
			<Routes>
				<Route path="/" element={<Layout />}>
					{/* public routes*/}

					<Route path="/" element={<Navigate to="tasksList" replace />} />
					<Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
					{/* protected routes*/}
					<Route element={<RequireAuth />}>
						<Route path="tasksList" element={<TasksList />} />
					</Route>
				</Route>
			</Routes>
		</>
	);
}

export default App;
