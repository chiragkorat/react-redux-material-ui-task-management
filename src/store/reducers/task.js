const initialState = {
  allTask: {
    Backlog: [],
    InProgress: [],
    Done: []
  },
  editableTask: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_TASK': {
      state.allTask[action.payload.status].push(action.payload)
      return {
        ...state,
        allTask: state.allTask,
      }
    }

    case 'UPDATE_TASK': {
      const index = state.allTask[state.editableTask.status].findIndex(({id}) => id === action.payload.id);
      state.allTask[state.editableTask.status][index] = action.payload.props;
      return {
        ...state,
        allTask: state.allTask,
        editableTask: null,
      }
    }

    case 'EDITABLE_TASK': {
      return {
        ...state,
        editableTask: action.payload,
      }
    }

    case 'MOVE_TASK': {
     const selectedObj = state.allTask[action.payload.oldStatus].find(({id}) => id === action.payload.taskId)
     selectedObj.status = action.payload.newStatus;
     selectedObj.spendTime = action.payload.spendTime;
     state.allTask[action.payload.oldStatus].filter(({id}) => id !== action.payload.taskId)
     state.allTask[action.payload.newStatus].push(selectedObj)
     return {
        ...state,
        allTask: state.allTask,
        editableTask: null,
      }
    }
    default: return state;
  }
};