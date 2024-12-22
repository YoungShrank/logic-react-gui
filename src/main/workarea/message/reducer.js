// 处理事件，状态响应

const initialState = [];

/**
 * 选择辅助项的状态转移函数， atcion.payload 为当前所有辅助项
 * 
 * @param {*} state 
 * @param {*} action 
 * @returns 
 */
const assistTermListReducer = (state = initialState, action) => {
    
    // 我直接用payload.selected传当前所有的selected了，而而不是新增的。
    
    switch (action.type) {
      case PUSH_ASSIST_TERM:
        return [...(action.payload)];
      default:
        return state;
    }
  };

  export default assistTermListReducer;