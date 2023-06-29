import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Login from './components/Auth/Login/Login';
import RequireAuth from './components/Auth/RequireAuth';
import Register from './components/Auth/Register/Register';
import { setCredentials } from './store/auth/slices/auth.slice';
import { useDispatch } from 'react-redux';
import { useInitQuery } from './store/users/slices/users.api.slice';
import TasksPage from './components/Tasks/TasksPage';
import Page from './components/Page/Page';
function App() {
	const dispatch = useDispatch();

	const { data } = useInitQuery({});

	useEffect(() => {
		dispatch(setCredentials({ user: data }));
	}, [data]);

	return (
		<>
			<Routes>
				<Route path="/" element={<Layout />}>
					{/* public routes*/}

					<Route path="/" element={<Navigate to="tasksPage" replace />} />
					<Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
					{/* protected routes*/}
					<Route element={<RequireAuth />}>
						<Route
							path="tasksPage"
							element={
								<Page>
									<TasksPage />
								</Page>
							}
						/>
					</Route>
				</Route>
			</Routes>
		</>
	);
}

export default App;
