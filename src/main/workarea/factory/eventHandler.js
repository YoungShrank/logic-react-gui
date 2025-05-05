import { select,  queryAssistList} from "../api/api";
import { useDispatch } from "react-redux";
import { UPDATE_ASSIST_TERMS } from "../message/actions";
/**
 * Assist组件响应contrl-B事件
 * @param {*} payload  参数
 */
function handleContrlBByAssist(payload, dispatch) {
    select(payload.conclusion_id, payload.first, payload.last, payload.name).then(
        (data) => {
            console.log("handleContrlBByLocal", data);
            queryAssistList().then(
                (data) => {
                    console.log("handleContrlBByLocal->queryAssistList", data);
                    dispatch({
                        type: UPDATE_ASSIST_TERMS,
                        payload: {terms: data}
                    });
                }
            );
        }
    );
}


export {handleContrlBByAssist};