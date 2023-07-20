import { selectCurrentUser, selectCurrentToken, logOut } from '../../store/auth/slices/auth.slice';
import { Link } from 'react-router-dom';
import { useLogoutMutation } from '../../store/auth/slices/auth.api.slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const Welcome = () => {
    const user = useAppSelector(selectCurrentUser);
    const token = useAppSelector(selectCurrentToken);

    const welcome = user ? `Welcome ${user.email}!` : 'Welcome!';
    const tokenAbbr = `${token?.slice(0, 9)}...`;
    const dispatch = useAppDispatch();
    const [logoutRequest, { isLoading }] = useLogoutMutation();
    const logout = async () => {
        await logoutRequest({}).unwrap();
        dispatch(logOut());
    };
    const content = (
        <section className="welcome">
            <h1>{welcome}</h1>
            <p>Token: {tokenAbbr}</p>
            <p>
                <Link to="/tasksPage"> Go to tasks list</Link>
            </p>
            <button onClick={logout}> Logout</button>
        </section>
    );

    return content;
};
export default Welcome;
