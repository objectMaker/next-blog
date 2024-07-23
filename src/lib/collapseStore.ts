import { createSlice } from '@reduxjs/toolkit';

export const collapseSlice = createSlice({
  name: 'collapse',
  initialState: {
    value: false,
  },
  reducers: {
    toggleCollapse(state) {
      state.value = !state.value;
    },
    initializeCollapse: (
      state,
      { payload }: { payload: boolean; type: string },
    ) => {
      state.value = payload;
    },
  },
  selectors: {
    selectCollapse: (collapse) => collapse.value,
  },
});

export const { toggleCollapse, initializeCollapse } = collapseSlice.actions;

export const { selectCollapse } = collapseSlice.selectors;

export default collapseSlice.reducer;
