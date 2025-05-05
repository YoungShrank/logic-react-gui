import { useState } from "react";
import { writeLine } from "../api/api";
import { queryLocalVarList } from "../api/api";
import { useDispatch } from "react-redux";
import { UPDATE_LOCAL_VARS, UPDATE_TEXT } from "../message/actions";
import useReduxStateRegister from "../message/receiver/useReduxStateRegister";
const useLineAreaHandler = () => {
    const [line, setLine] = useState("");
    const dispatch = useDispatch();
    const anyText = useReduxStateRegister("anyTextState")
    console.log("init anyText", anyText)
    function handleLineChange(e) {
        setLine(e.target.value);
    }

    function handleClick() {
        console.log(line);
        writeLine(line).then((d)=>{console.log("after writeline: ", d)});
        queryLocalVarList().then(
            (d) => {
                console.log("after queryLocalVarList: ", d);
                dispatch({type: UPDATE_LOCAL_VARS, payload: {vars: d}});
            }
        );
    }

    function handleTextChange(e) {
        const text = e.target.value;
        dispatch({
            type: UPDATE_TEXT,
            payload: {text: text}
        })
    }

    return {line, setLine, handleClick, handleLineChange, handleTextChange, anyText}
}

export default useLineAreaHandler;