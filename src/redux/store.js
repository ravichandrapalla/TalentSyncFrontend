import { configureStore, createSlice } from "@reduxjs/toolkit";

const activeTabSlice = createSlice({
  name: "activeTabTracker",
  initialState: { tab: "Dashboard" },
  reducers: {
    setTab: (state, action) => {
      state.tab = action.payload;
    },
  },
});

const rootReducer = {
  tabSlice: activeTabSlice.reducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export const { setTab } = activeTabSlice.actions;
export default store;
