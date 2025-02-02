import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  courseInfo: {},
  courseId: null,
};

export const fetchLessons = createAsyncThunk(
  "/course/fetchLessons",
  async ({ courseId, token }) => {
    console.log("In fetchLessons", courseId, token);
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/course/getlessons/${courseId}`,
      {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      }
    );

    const data = await res.json();

    console.log("lessons", data);
    return data.courseInfo;
  }
);

const learningPageSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCourseId: (state, action) => {
      state.courseId = action.payload.courseId;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLessons.pending, () => {
        //console.log("extra pending");
      })
      .addCase(fetchLessons.fulfilled, (state, action) => {
        //console.log("extra fulfilled");
        state.courseInfo = action.payload;
      })
      .addCase(fetchLessons.rejected, () => {});
  },
});

export const {setCourseId} = learningPageSlice.actions;

export default learningPageSlice.reducer;
