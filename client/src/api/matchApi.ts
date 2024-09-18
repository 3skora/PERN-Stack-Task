import { apiSlice } from "../store/apiSlice";
import { IMatch, IMatchPopulatedRecord, IMatchRecord } from "../interfaces/match.interfaces";

const matchApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMatch: builder.query<IMatchPopulatedRecord[], Partial<IMatchRecord>>({
      query: (params) => ({
        url: "match",
        params,
      }),
      providesTags: ["Match"],
    }),

    getMatchById: builder.query<IMatchRecord, number>({
      query: (id) => `match/${id}`,
      providesTags: ["Match"],
    }),

    createMatch: builder.mutation<IMatchRecord, IMatch>({
      query: (body) => ({
        url: "match",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Match"],
    }),

    editMatch: builder.mutation<IMatchRecord, Partial<IMatchRecord> & Pick<IMatchRecord, "id">>({
      query: ({ id, ...body }) => ({
        url: `match/${id}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["Match"],
    }),

    deleteMatch: builder.mutation<IMatchRecord, number>({
      query: (id) => ({
        url: `match/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Match"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetMatchQuery,
  useGetMatchByIdQuery,
  useCreateMatchMutation,
  useEditMatchMutation,
  useDeleteMatchMutation,
} = matchApi;
