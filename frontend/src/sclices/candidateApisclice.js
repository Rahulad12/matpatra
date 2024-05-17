// Date: 03/20/2021
import { CANDIDATE_URL,UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const candidateApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCandidates: builder.query({
      query: () => ({ url: CANDIDATE_URL, method: "GET" }),
      keepUnusedDataFor: 5,
    }),

    getCandidatesById: builder.query({
      query: (candidateId) => ({
        url: `${CANDIDATE_URL}/${candidateId}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),

    voteCandidate: builder.mutation({
      query: (candidateId) => ({
        url: `${CANDIDATE_URL}/${candidateId}/vote`,
        method: "POST",
      }),
    }),

    getHighestVotedCandidate: builder.query({
      query: () => ({ url: `${CANDIDATE_URL}/highestvoted`, method: "GET" }),
      keepUnusedDataFor: 5,
    }),

    createCandidate: builder.mutation({
      query: () => ({
        url: CANDIDATE_URL,
        method: "POST",
      }),
      invalidatesTags: ["Candidate"],
    }),

    updateCandidate: builder.mutation({
      query: (data) => ({
        url: `${CANDIDATE_URL}/${data._id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Candidate"],
    }),

    uploadCandidateImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: data,
      })
    }),
    updateSymbol: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: data,
      })
    }),
  }),
});
export const {
  useGetCandidatesQuery,
  useGetCandidatesByIdQuery,
  useVoteCandidateMutation,
  useGetHighestVotedCandidateQuery,
  useCreateCandidateMutation,
  useUpdateCandidateMutation,
  useUploadCandidateImageMutation,
  useUpdateSymbolMutation,
} = candidateApiSlice;
