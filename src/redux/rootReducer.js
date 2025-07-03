const initialState = {
  users: [],
  currentUser: null,
  tasks: {},
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REGISTER_USER':
      return {
        ...state,
        users: [...state.users, action.payload],
      };

    case 'LOGIN_USER':
      return {
        ...state,
        currentUser: action.payload,
      };

    case 'LOGOUT_USER':
      return {
        ...state,
        currentUser: null,
      };

    case 'ADD_TASK': {
      const {user, task} = action.payload;
      const userEmail = user.email;
      const userTasks = state.tasks[userEmail] || [];
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [userEmail]: [...userTasks, task],
        },
      };
    }

    case 'UPDATE_TASK': {
      const {user, task} = action.payload;
      const userEmail = user.email;
      const updatedTasks = state.tasks[userEmail].map(t =>
        t.id === task.id ? task : t,
      );
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [userEmail]: updatedTasks,
        },
      };
    }

    case 'SET_TASKS': {
      const {user, tasks} = action.payload;
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [user.email]: tasks,
        },
      };
    }

    default:
      return state;
  }
};
