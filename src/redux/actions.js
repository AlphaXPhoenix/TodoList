export const registerUser = user => ({
  type: 'REGISTER_USER',
  payload: user,
});

export const loginUser = user => ({
  type: 'LOGIN_USER',
  payload: user,
});

export const logoutUser = () => ({
  type: 'LOGOUT_USER',
});

export const addTask = (user, task) => ({
  type: 'ADD_TASK',
  payload: {user, task},
});

export const updateTask = (user, task) => ({
  type: 'UPDATE_TASK',
  payload: {user, task},
});

export const setTasks = (user, tasks) => ({
  type: 'SET_TASKS',
  payload: {user, tasks},
});
