import {getEpicsList, removeEpicAndItsTasksThunk} from './epicsSlice';
import {getStore} from './getStore';
import {getTasksList} from './tasksSlice';

it('removeEpicAndItsTasksThunk removes given epic and all tasks that belong to it', async () => {
  // Arrange
  const preloadedState = {
    epics: {
      list: [
        {id: 0, name: 'epic 0'}, // epic to remove
        {id: 1, name: 'epic 1'},
      ]
    },
    tasks: {
      list: [
        {id: 0, epicId: 0, name: 'epic 0 first task'}, // task to remove (epicId: 0)
        {id: 1, epicId: 0, name: 'epic 0 second task'}, // task to remove (epicId: 0)
        {id: 2, epicId: 1, name: 'epic 1 first task'},
        {id: 3, epicId: 1, name: 'epic 1 second task'},
      ]
    }
  };

  const expectedEpicList = [
    {id: 1, name: 'epic 1'},
  ];

  const expectedTaskList = [
    {id: 2, epicId: 1, name: 'epic 1 first task'},
    {id: 3, epicId: 1, name: 'epic 1 second task'},
  ];

  const store = getStore(preloadedState);

  // Act
  await store.dispatch(removeEpicAndItsTasksThunk(0));

  // Assert
  const state = store.getState();
  const epicList = getEpicsList(state);
  const taskList = getTasksList(state);

  expect(epicList).toEqual(expectedEpicList);
  expect(taskList).toEqual(expectedTaskList);
});
