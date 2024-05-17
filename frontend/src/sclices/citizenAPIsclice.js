import { CITIZEN_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const citizenApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    Login: builder.mutation({
      query: (data) => ({
        url: `${CITIZEN_URL}/auth`,
        method: "post",
        body: data,
      }),
    }),

    Vote: builder.mutation({
      query: (data) => ({
        url: `${CITIZEN_URL}/vote`,
        method: "put",
        body: data,
      }),
    }),

    Logout: builder.mutation({
      query: () => ({
        url: `${CITIZEN_URL}/vote`,
        method: "post",
      }),
    }),

    DeleteCitizen: builder.mutation({
      query: (data) => ({
        url: `${CITIZEN_URL}/${data.citizenId}`,
        method: "delete",
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${CITIZEN_URL}/logout`,
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useVoteMutation,useDeleteCitizenMutation,useLogoutMutation } = citizenApiSlice;

export default citizenApiSlice;
