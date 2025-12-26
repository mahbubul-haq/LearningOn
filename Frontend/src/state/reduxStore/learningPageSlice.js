import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  courseInfo: {},
  courseId: null,
  progressData: null,
  answer: {},
};

export const submitQuiz = createAsyncThunk(
  "/learning/submitQuiz",
  async ({ courseId, token, lessonNo, answer }, { dispatch }) => {
    try {

      let tempAnswer = {};
      Object.keys(answer).forEach(key => {
        let lessonNumber = parseInt(key.split("_")[0].substring(1));
        if (lessonNumber == lessonNo) {
          tempAnswer[key] = answer[key];
        }
      })
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/learning/${courseId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
          body: JSON.stringify({
            lesson: lessonNo,
            answer: tempAnswer
          }),
        }
      );
      const data = await res.json();
      if (data.success) {
        let newObj = { ...answer };
        Object.keys(tempAnswer).forEach(key => {
          delete newObj[key];
        })
        dispatch(setAnswer(newObj));
        return data.progressData;
      }
    }
    catch (err) {
      //
    }
  }
);

export const fetchProgress = createAsyncThunk(
  "/learning",
  async ({ courseId, token }) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/learning/${courseId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        }
      );

      const data = await res.json();
      //console.log("progressData, ", data);
      if (data.success) {
        return data.courseProgress;
      }
    } catch (err) {
      //
    }
  }
);

export const fetchLessons = createAsyncThunk(
  "/course/fetchLessons",
  async ({ courseId, token }) => {
    // console.log("In fetchLessons", courseId, token);
    try {
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
    } catch (err) {
      //
    }
  }
);

const learningPageSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCourseId: (state, action) => {
      state.courseId = action.payload.courseId;
    },
    setAnswer: (state, action) => {
      state.answer = {
        ...action.payload
      }
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
      .addCase(fetchLessons.rejected, () => { });

    builder.addCase(fetchProgress.pending, () => {

    }).addCase(fetchProgress.fulfilled, (state, action) => {
      state.progressData = action.payload;
    }).addCase(fetchProgress.rejected, () => {

    });

    builder.addCase(submitQuiz.pending, () => {

    }).addCase(submitQuiz.fulfilled, (state, action) => {
      state.progressData = action.payload;
    }).addCase(submitQuiz.rejected, () => {

    });

  },
});

export const { setCourseId, setAnswer } = learningPageSlice.actions;

export default learningPageSlice.reducer;
