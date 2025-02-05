
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { DB } from "../firebase";

export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  const querySnapshot = await getDocs(collection(DB, "blogs"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
});

const blogSlice = createSlice({
  name: "blogs",
  initialState: { blogs: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      });
  },
});

export default blogSlice.reducer;
