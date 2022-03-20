import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Friendships, Helpers} from 'vacations-api';
import {RootState} from '../store/store';

// Define a service using a base URL and expected endpoints
export const friendshipApi = createApi({
  reducerPath: 'friendshipApi',
  tagTypes: ['Friendships'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.vacations.iperka.com/v1/friendships',
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
    getAllFriendships: builder.query<
      Helpers.GenericResponse<Friendships.Friendship[]>,
      {page: number; owner?: string; user?: string}
    >({
      query: ({page = 0, owner, user}) =>
        `/?page=${page}${owner && '&owner=' + owner}${user && '&user=' + user}`,
      providesTags: result =>
        result && result.data !== null
          ? [
              // Provides a tag for each post in the current page,
              // as well as the 'PARTIAL-LIST' tag.
              ...result.data.map(({uuid}) => ({
                type: 'Friendships' as const,
                id: uuid,
              })),
              {type: 'Friendships', id: 'PARTIAL-LIST'},
            ]
          : [{type: 'Friendships', id: 'PARTIAL-LIST'}],
    }),
    addFriendShip: builder.mutation<
      Helpers.GenericResponse<Friendships.Friendship[]>,
      Friendships.FriendshipDTO
    >({
      query(body) {
        return {
          url: `/`,
          method: 'POST',
          body,
        };
      },
      // Invalidates all Post-type queries providing the `LIST` id - after all, depending of the sort order,
      // that newly created post could show up in any lists.
      invalidatesTags: [{type: 'Friendships', id: 'LIST'}],
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {useGetAllFriendshipsQuery, useAddFriendShipMutation} =
  friendshipApi;
