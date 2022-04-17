import thunk from 'redux-thunk';
import { createStore, combineReducers ,applyMiddleware, compose  } from 'redux';
// import authReducer from '../reducers/auth';
import taskReducer from '../reducers/task';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      // auth: authReducer,
      task: taskReducer,
    }),
   composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};



