import { apiSlice } from "../store/apiSlice";
import { IUser, IUserRecord } from "../interfaces/user.interfaces";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<IUserRecord[], Partial<IUserRecord>>({
      query: (params) => ({
        url: "users",
        params,
      }),
      providesTags: ["User"],
    }),

    getUserById: builder.query<IUserRecord, number>({
      query: (id) => `users/${id}`,
      providesTags: ["User"],
    }),

    createUser: builder.mutation<IUserRecord, IUser>({
      query: (body) => ({
        url: "users",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["User"],
    }),

    editUser: builder.mutation<IUserRecord, Partial<IUserRecord> & Pick<IUserRecord, "id">>({
      query: ({ id, ...body }) => ({
        url: `users/${id}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["User"],
    }),

    deleteUser: builder.mutation<IUserRecord, number>({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useEditUserMutation,
  useDeleteUserMutation,
} = userApi;
