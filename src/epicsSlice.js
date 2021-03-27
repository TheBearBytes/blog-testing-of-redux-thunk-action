import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {removeTasksById} from './tasksSlice';

const initialState = {
  list: []
};

const epicsSlice = createSlice({
  name: 'epics',
  initialState,
  reducers: {
    removeEpicById: (state, action) => {
      state.list.splice(action.payload, 1);
    }
  }
});

export const {
  removeEpicById,
} = epicsSlice.actions;

export default epicsSlice.reducer;

export const removeEpicAndItsTasksThunk = createAsyncThunk('removeEpicAndItsTasks', async (epicId, {
  getState,
  dispatch
}) => {
  const state = getState();

  const tasksId = await new Promise((resolve) => {
    console.log('Waiting for some async action.');

    setTimeout(() => {
      const ids = state.tasks.list
        .filter((task) => task.epicId === epicId)
        .map((task) => task.id);

      console.log('Async action resolved after (at least) 2000ms.');
      resolve(ids);
    }, 2000);
  });

  dispatch(removeTasksById(tasksId));
  dispatch(removeEpicById(epicId));
});

export const getEpicsList = (state) => state.epics.list;
