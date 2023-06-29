import { apiSlice } from '../../base-api.slice';

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (credentials) => ({
				url: '/auth/login',
				method: 'POST',
				body: { ...credentials },
			}),
		}),
		register: builder.mutation<{}, { email: string; password: string; emailVerificationCode: string }>({
			query: (credentials) => ({
				url: '/auth/register',
				method: 'POST',
				body: { ...credentials },
			}),
		}),
		logout: builder.mutation({
			query: () => ({
				url: '/auth/logout',
				method: 'PATCH',
			}),
		}),

		sendEmailVerificationCode: builder.mutation<string, string>({
			query: (email) => ({
				url: '/auth/emailVerification',
				method: 'POST',
				body: { email },
			}),
		}),
	}),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useSendEmailVerificationCodeMutation } =
	authApiSlice;
