import { createSlice } from "@reduxjs/toolkit";

// Function to safely get candidateInfo from localStorage
const getCandidateInfo = () => {
  const data = localStorage.getItem("candidateInfo");
  if (data) {
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error("Failed to parse candidateInfo from localStorage:", error);
      localStorage.removeItem("candidateInfo");  // Optional: clear the invalid data
    }
  }
  return null;
};

const initialState = {
  candidateInfo: getCandidateInfo(),
};

const candidateSlice = createSlice({
  name: "candidate",
  initialState,
  reducers: {
    setCandidateCredentials: (state, action) => {
      state.candidateInfo = action.payload;
      localStorage.setItem("candidateInfo", JSON.stringify(action.payload));
    },

    clearCandidateCredentials: (state) => {
      state.candidateInfo = null;
      localStorage.removeItem("candidateInfo");
    },

  },
  
});

export const { setCandidateCredentials,clearCandidateCredentials } = candidateSlice.actions;

export default candidateSlice.reducer;
