import { selectCurrentToken } from '../../store/auth/slices/auth.slice';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RequireAuth = () => {
	const token = useSelector(selectCurrentToken);

	const location = useLocation();
	return token ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};
export default RequireAuth;
