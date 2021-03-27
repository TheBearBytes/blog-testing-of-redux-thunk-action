import thunk from 'redux-thunk';
import {configureStore, combineReducers} from '@reduxjs/toolkit';
import epicsReducer from './epicsSlice';
import tasksReducer from './tasksSlice';

const rootReducer = combineReducers({
  epics: epicsReducer,
  tasks: tasksReducer
});

export const getStore = (preloadedState) => configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  preloadedState
});
