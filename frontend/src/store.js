import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./sclices/apiSlice";
import authSlicereducer from "./sclices/authSlice";
import candidateSlicereducer from "./sclices/CandidateSlice";

const Store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlicereducer,
    candidate: candidateSlicereducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default Store;
