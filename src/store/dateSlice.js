import { createSlice } from '@reduxjs/toolkit';
import { startOfToday,format } from 'date-fns';

const dateSlice = createSlice({
  name: 'selectedDate',
  initialState: {
    value: format(startOfToday(),'yyyy-MM-dd')
  },
  reducers: {
    updateDate: (state, action) => {
      state.value = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { updateDate } = dateSlice.actions

export default dateSlice;