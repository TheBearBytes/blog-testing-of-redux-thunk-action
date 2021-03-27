import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  list: []
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    removeTasksById: (state, action) => {
      action.payload.forEach(id => {
        const idxToDelete = state.list.findIndex((el) => el.id === id);
        state.list.splice(idxToDelete, 1);
      });
    }
  }
});

export const {
  removeTasksById,
} = tasksSlice.actions;

export default tasksSlice.reducer;

export const getTasksList = (state) => state.tasks.list;
