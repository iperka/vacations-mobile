import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Helpers, Users} from 'vacations-api';
import {RootState} from '../store/store';

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: 'userApi',
  tagTypes: ['Users'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.vacations.iperka.com/v1/users',
    prepareHeaders: (headers, {getState}) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    getUserById: builder.query<Helpers.GenericResponse<Users.User>, string>({
      query: (id: string) => `/${id}`,
      providesTags: [{type: 'Users', id: 'LIST'}],
      keepUnusedDataFor: 60 * 60 * 24,
    }),
    addUser: builder.mutation<Helpers.GenericResponse<null>, Users.UserDTO>({
      query(body) {
        return {
          url: `/`,
          method: 'POST',
          body,
        };
      },
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {useGetUserByIdQuery, useAddUserMutation} = userApi;
