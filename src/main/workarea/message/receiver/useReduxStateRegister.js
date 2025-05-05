import { useDispatch, useSelector } from 'react-redux';
/**
 * 注册监听者
 * @param {*} stateName 
 * @returns 
 */
function useReduxStateRegister(stateName) {
    const state = useSelector(state => state[stateName]);
    console.log('useReduxStateRegister', state);
    return state;
}

export default useReduxStateRegister;