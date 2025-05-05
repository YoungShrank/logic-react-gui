// 处理事件，状态响应
import { UPDATE_ASSUMPTIONS, UPDATE_RULES, UPDATE_LOCALS, UPDATE_AXIOM , UPDATE_LOCAL_VARS, UPDATE_SELECTED_SUB_TERM, UPDATE_TEXT, INVOKE_SELECT_SUB_TERM, UPDATE_ASSIST_TERMS} from "./actions";
const initialState = [];
const initialMapState = {};
const initialTextState = "";
const initialCommonState = {
  subterm: {conclusion_id: -1, first: -1, last: -1, name: ""}
};

/**
 * 用来设置term, action.paylaod.terms 是termList
 * 
 * @param {*} state 
 * @param {*} action 
 * @returns 
 */
const termsReducer = (state = initialState, action) => {
    
    // 我直接用payload.selected传当前所有的selected了，而而不是新增的。
    
    switch (action.type) {
      case UPDATE_ASSUMPTIONS:
        return [...(action.payload.terms)];
      default:
        return state;
    }
  };

  const rulesReducer = (state = initialMapState, action) => {
    
    // 我直接用payload.selected传当前所有的selected了，而而不是新增的。
    
    switch (action.type) {
      case UPDATE_RULES:
        return {...(action.payload.rules)};
      default:
        return state;
    }
  };

  const localReducer = (state = initialMapState, action) => {
    
    // 我直接用payload.selected传当前所有的selected了，而而不是新增的。
    
    switch (action.type) {
      case UPDATE_LOCALS:
        console.log("localReducer", action.payload.terms);
        return {...(action.payload.terms)};
      default:
        return state;
    }
  };

  const axiomReducer = (state = initialMapState, action) => {
    
    // 我直接用payload.selected传当前所有的selected了，而而不是新增的。
    
    switch (action.type) {
      case UPDATE_AXIOM:
        return {...(action.payload.terms)};
      default:
        return state;
    }
  };

  const localVarReducer = (state = initialMapState, action) => {
    
    // 我直接用payload.selected传当前所有的selected了，而而不是新增的。
    
    switch (action.type) {
      case UPDATE_LOCAL_VARS:
        console.log("localVarReducer", action.payload.vars);
        return {...(action.payload.vars)};
      default:
        return state;
    }
  };

  const assistTermsReducer = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_ASSIST_TERMS:
        console.log("assistTermsReducer", action.payload.terms);
        return [...(action.payload.terms)];
      default:
        return state;
    }
  };

  const selectedSubTermReducer = (state = initialMapState, action) => {
    
    // 我直接用payload.selected传当前所有的selected了，而而不是新增的。
    
    switch (action.type) {
      case UPDATE_SELECTED_SUB_TERM:
        return {...(action.payload.subterm)};
      default:
        return state;
    }
  };
  const commonReducer = (state = initialCommonState, action) => {
    
    // 我直接用payload.selected传当前所有的selected了，而而不是新增的。
    
    switch (action.type) {
      case INVOKE_SELECT_SUB_TERM:
        return {...state, subterm:{...(action.payload.subterm)}};
      default:
        return state;
    }
  };
  
  const textReducer = (state = initialTextState, action) => {
    console.log('textReducer',state, action);
    switch (action.type) {
      case UPDATE_TEXT:
        return action.payload.text;
      default:
        return state;
    }
  };

  export default termsReducer;
  export {rulesReducer, localReducer, axiomReducer, localVarReducer, commonReducer, selectedSubTermReducer, textReducer, assistTermsReducer}