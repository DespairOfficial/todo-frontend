import { User } from '../../../interfaces/user.interface';
import { apiSlice } from '../../base-api.slice';

export const usersApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getUsers: builder.query<User[], {}>({
			query: () => '/users',
			keepUnusedDataFor: 60,
		}),
		init: builder.mutation<User, {}>({
			query: () => '/auth/init',
		}),
	}),
});
export const { useGetUsersQuery, useInitMutation } = usersApiSlice;
