import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../../interfaces/user.interface';

export interface IAuthState {
	user: User | null;
	token: string | null;
}

const initialState: IAuthState = {
	user: null,
	token: localStorage.getItem('token'),
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setCredentials: (state, action) => {
			const payload = action.payload;
			state.user = payload.user;
			
			if (payload?.accessToken) {
				state.token = payload?.accessToken;
				localStorage.setItem('token', payload.accessToken);
			}
		},
		logOut: (state) => {
			state.user = null;
			state.token = null;
			localStorage.removeItem('token');
		},
	},
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: { auth: { user: User | null } }) => state.auth.user;
export const selectCurrentToken = (state: { auth: { token: string | null } }) => state.auth.token;
