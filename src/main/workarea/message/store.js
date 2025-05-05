import { legacy_createStore  as createStore, combineReducers } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import termsReducer from './reducer';
import {rulesReducer, localReducer, axiomReducer, localVarReducer, selectedSubTermReducer, commonReducer, textReducer, assistTermsReducer} from './reducer';
/**
 * - termState: 项数据
 */
const rootReducer = combineReducers({
  termState: termsReducer,
  ruleState: rulesReducer,
  localState: localReducer,
  axiomState: axiomReducer,
  localVarState: localVarReducer,
  selectedSubTermState: selectedSubTermReducer,
  commonState: commonReducer,
  anyTextState: textReducer,
  assistState: assistTermsReducer
  // 你可以在这里添加其他 reducers
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;