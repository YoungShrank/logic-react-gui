// 规则区
import React, { useState } from "react";
import useTermStateRegister from "../../../message/receiver/useTermStateRegister"
function TermsArea({stateName}) {
    const {termState} = useTermStateRegister(stateName);
    console.log("stateName: ", stateName)
    return (
        <div>
            <p>{stateName}项区</p>
            {termState.map((term, index) => (
                <Term key={index} termData = {term}/>
            ))}
        </div>
    )
}


function Term({termData}) {
    const [ termDataState, setTermDataState] = useState(termData);
    return (
        <div style={{backgroundColor:"blue"}}>
            <input type="text" value={termDataState.inputValue} ></input>
            <input type="checkbox" checked={termDataState.checked} ></input>
        </div>
    )
}

export default TermsArea;