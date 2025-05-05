// 规则区
import React, { useState, useEffect, useRef} from "react";
import useTermStateRegister from "../../../message/receiver/useTermStateRegister"
import { cp2tp } from "../../../api/api";
import {useDispatch} from "react-redux";
import { UPDATE_SELECTED_SUB_TERM } from "../../../message/actions";
function TermMapArea({stateName, buttonProps = null, autoSelect = false}) {
    console.log("debug TermMapArea: ", stateName)
    const {termState, eventMap} = useTermStateRegister(stateName);
    const time = useRef(Date.now());
    const elem = useRef(null);
    const needSelectRef = useRef(false);
    const selectRef = useRef(null);
    const termAreaRef = useRef();

    const [init, setInit] = useState(false);
    const dispatch = useDispatch();


    console.log("event in map: " ,eventMap);
    // 绑定任意事件
    useEffect(() => {
        const termArea = termAreaRef.current;
        for (let key in eventMap) {
            if (key === "keydown") {// 只能用于可focus的元素
                document.addEventListener(key, eventMap[key]);
                continue;
            }
            console.log("useEffect -> event in map: " ,key);
            termArea.addEventListener(key, eventMap[key]);
            console.log("termArea", termArea)
        }

    }, []);

    // 定时，如果选区超过3s未发生变化，则选区优化
    if (autoSelect && !init) {
        setInit(true);
        console.log("init");
        setInterval(() => {
            const current = Date.now();
            console.log("needSelect", needSelectRef.current);
            console.log("time", time.current, "currrent", current);
            if (current - time.current > 3000 && needSelectRef.current) {
                console.log("optimize");
                // 创建 Range 对象
                console.log("elem", elem.current);
                // 获得兄弟
                const sibling = elem.current.previousSibling;
                console.log("sibling", sibling);
                // 获得兄弟(lable)的值
                const siblingValue = sibling.innerText;
                console.log("siblingValue", siblingValue);
                if (elem.current) {
                    console.log("select change",  elem.current);
                    
                    // 获得<input>子节点
                    const input = elem.current;
                    console.log("select change",  input)
                    //获得原选区
                    const selectionStart = input.selectionStart;
                    const selectionEnd = input.selectionEnd;

                    console.log("selection", selectionEnd);
                    cp2tp(siblingValue, selectionStart, selectionEnd, input.value).then(
                        res => {
                            console.log("cp2tp", res);
                            // 优化选区
                            input.setSelectionRange(res[2], res[3]);
                            // 更新 tocken、lable状态
                            dispatch({
                                type: UPDATE_SELECTED_SUB_TERM,
                                payload: {
                                    subterm: {
                                        conclusion_id: siblingValue,
                                        first: res[0],
                                        last: res[1]
                                    }
                                }
                            })
                            
                        }
                    )
                    needSelectRef.current = (false);
                }
            }
        }, 1000)
    }

    function handleSelectChange(e) {
        time.current = Date.now();
        elem.current = e.target
        needSelectRef.current = true;
    }

    console.log("debug stateName: ", stateName)
    return (
        <div onSelect={handleSelectChange} ref={termAreaRef}>
            <p>{stateName}项区</p>
            {Object.keys(termState).map((key, index) => (
                <Term buttonProps = {buttonProps} key={key} termData = {{"index": key,"term":termState[key], "selected" : false}}/>
            ))}
        </div>
    )
}

function Term({termData, buttonProps = null}) {
    const [ termDataState, setTermDataState] = useState(termData);
    return (
        <div style={{backgroundColor:"blue"}}>
            <label>{termDataState.index}</label>
            <input type="text" value={termDataState.term} ></input>
            <input type="checkbox" checked={termDataState.selected} onChange={(e) => {
                setTermDataState({...termDataState, selected: e.target.checked})
            }}></input>
            {buttonProps && <button onClick={() => buttonProps.onClick(termDataState)}>{buttonProps.name}</button>}
        </div>
    )
}

export default TermMapArea;