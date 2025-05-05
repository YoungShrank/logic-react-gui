import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
/**
 * 注册监听者
 * @param {*} stateName 
 * @returns 
 */
function useTermStateRegister(stateName) {
    const termState = useSelector(state => state[stateName]);
    const commonState = useSelector(state => state.commonState);
    console.log('useTermStateRegister', termState, stateName);
    let eventMap = {}

    function useKeyDown(e) {
        if (e.ctrlKey && e.key === "b") {
            e.preventDefault(); // prevent default behavior of bold
            console.log("ctrl+b pressed");
            console.log("the value is provided: ", commonState);
            
        }
    }
    
    if (stateName === 'assistState') {
        console.log('eventMap: ', stateName);
        eventMap = {
            "keydown" : useKeyDown
            }
    }

    return { termState, eventMap };
}

export default useTermStateRegister;