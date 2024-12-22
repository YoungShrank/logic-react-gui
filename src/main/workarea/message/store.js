import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import assistTermListReducer from './reducer';

const rootReducer = combineReducers({
  formData: assistTermListReducer,
  // 你可以在这里添加其他 reducers
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;