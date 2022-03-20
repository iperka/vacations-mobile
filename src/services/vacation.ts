import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Helpers, Vacations} from 'vacations-api';
import {RootState} from '../store/store';

// Define a service using a base URL and expected endpoints
export const vacationApi = createApi({
  reducerPath: 'vacationApi',
  tagTypes: ['Vacations'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.vacations.iperka.com/v1/vacations',
    // baseUrl: 'http://localhost:8080/vacations',
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
    getAllVacations: builder.query<
      Helpers.GenericResponse<Vacations.Vacation[]>,
      number
    >({
      query: (page: number = 0) => `/?page=${page}&sort=startDate,desc`,
      providesTags: [{type: 'Vacations', id: 'LIST'}],
    }),
    getVacationByUuid: builder.query<
      Helpers.GenericResponse<Vacations.Vacation>,
      string
    >({
      query: (uuid: string) => `/${uuid}`,
      providesTags: [{type: 'Vacations', id: 'LIST'}],
    }),
    getNextVacation: builder.query<
      Helpers.GenericResponse<Vacations.Vacation>,
      void
    >({
      query: () => `/next`,
      providesTags: [{type: 'Vacations', id: 'LIST'}],
    }),
    getOverview: builder.query<
      Helpers.GenericResponse<number[]>,
      number
    >({
      query: (year: number = new Date().getFullYear()) => `/overview/${year}`,
      providesTags: [{type: 'Vacations', id: 'OVERVIEW'}],
    }),
    addVacation: builder.mutation<
      Helpers.GenericResponse<Vacations.Vacation[]>,
      Vacations.VacationDTO
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
      invalidatesTags: [{type: 'Vacations', id: 'LIST'}],
    }),
    deleteVacation: builder.mutation<Helpers.GenericResponse<null>, string>({
      query(uuid: string) {
        return {
          url: `/${uuid}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Vacations'],
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllVacationsQuery,
  useGetVacationByUuidQuery,
  useGetNextVacationQuery,
  useGetOverviewQuery,
  useAddVacationMutation,
  useDeleteVacationMutation,
} = vacationApi;
