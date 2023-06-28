import FingerprintJS from '@fingerprintjs/fingerprintjs';

import {
	BaseQueryApi,
	BaseQueryFn,
	createApi,
	FetchArgs,
	fetchBaseQuery,
	FetchBaseQueryError,
	FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react';
import { RootState } from '.';
import { setCredentials, logOut } from './auth/slices/auth.slice';

const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta> = fetchBaseQuery(
	{
		baseUrl: process.env.REACT_APP_SERVER_URL,
		credentials: 'include',
		prepareHeaders: async (headers, api) => {
			const state = api.getState() as RootState;
			const token = state.auth.token;
			if (token) {
				headers.set('authorization', `Bearer ${token}`);
			}
			const fpPromise = await FingerprintJS.load();
			const result = await fpPromise.get();
			headers.set('fingerprint', result.visitorId);
			return headers;
		},
	}
);

const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
	let result = await baseQuery(args, api, extraOptions);
	//originalStatus
	if (result?.error?.status === 401) {
		const refreshResult = await baseQuery('/auth/refreshToken', {...api}, extraOptions);
		if (refreshResult?.data) {
			const state = api.getState() as RootState;
			const user = state.auth.user;
			// store the new token
			api.dispatch(setCredentials({ ...refreshResult.data, user }));
			// retry origin query with new acess token
			result = await baseQuery(args, api, extraOptions);
		} else {
			api.dispatch(logOut());
		}
	}
	return result;
};
export const apiSlice = createApi({
	baseQuery: baseQueryWithReauth,
	endpoints: (builder) => ({}),
});
