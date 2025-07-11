import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  tasks: {},
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const {user, task} = action.payload;
      const userEmail = user.email;
      if (!state.tasks[userEmail]) {
        state.tasks[userEmail] = [];
      }
      state.tasks[userEmail].push(task);
    },
    updateTask: (state, action) => {
      const {user, task} = action.payload;
      const userEmail = user.email;
      state.tasks[userEmail] = state.tasks[userEmail].map(t =>
        t.id === task.id ? task : t,
      );
    },
    setTasks: (state, action) => {
      const {user, tasks} = action.payload;
      state.tasks[user.email] = tasks;
    },
  },
});

export const {addTask, updateTask, setTasks} = taskSlice.actions;
export default taskSlice.reducer;
