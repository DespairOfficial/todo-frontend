import { useEffect } from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Login from './components/Auth/Login/Login';
import RequireAuth from './components/Auth/RequireAuth';
import Register from './components/Auth/Register/Register';
import { selectCurrentToken, setCredentials } from './store/auth/slices/auth.slice';
import { useInitMutation } from './store/users/slices/users.api.slice';
import TasksPage from './components/Tasks/TasksPage';
import Page from './components/Page/Page';
import { useAppDispatch, useAppSelector } from './store/hooks';
function App() {
	const dispatch = useAppDispatch();

	const token = useAppSelector(selectCurrentToken);

	const [initRequest, { data }] = useInitMutation({});

	useEffect(() => {
		if (token) {
			initRequest({});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		dispatch(setCredentials({ user: data }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	// try trigger webhook
	return (
		<>
			<Routes>
				<Route path="/" element={<Layout />}>
					{/* public routes*/}

					<Route path="/" element={<Navigate to="tasksPage" replace />} />
					<Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
					<Route path="password/restore/:token" element={<Register />} />
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
