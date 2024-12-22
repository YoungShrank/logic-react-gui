// 规则区
import React, { useState } from "react";
import useRuleAreaHandler from "../../handler/useRuleAreaHandler";
import useTermHandler from "../../handler/useTermHandler";
function RuleArea({commonTermList}) {
    const { termList, handleAddTerm } = useRuleAreaHandler(commonTermList);
    console.log("term list: ", termList)
    return (
        <div>
            <p>规则区</p>
            {termList.map((term, index) => (
                <Term key={index} commonTermData = {term}/>
            ))}
            <button onClick={handleAddTerm}>添加</button>
        </div>
    )
}


function Term({commonTermData}) {
    const { termData, setTermData, hanleChecked , handleInputChange } = useTermHandler(commonTermData);
    return (
        <div style={{backgroundColor:"blue"}}>
            <input type="text" value={termData.inputValue} onChange={handleInputChange}></input>
            <input type="checkbox" checked={termData.checked} onChange={hanleChecked}></input>
        </div>
    )
}

export default RuleArea;