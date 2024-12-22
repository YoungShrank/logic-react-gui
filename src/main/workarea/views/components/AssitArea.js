// 证明区
import React, { useState } from "react";
import useTermHandler from "../../handler/useTermHandler";
import useAssitAreaCReceiver from "../../message/creceiver/useAssitAreaCReceiver";
function AssitArea() {
    const {assitTermList} = useAssitAreaCReceiver();

    return (
        <div >
            <p>辅助区</p>
            {assitTermList.map((term, index) => (
                <Term key={index} commonTermData = {term}/>
            ))}
        </div>
    )
}



function Term({commonTermData}) {
    const { termData, setTermData, hanleChecked , handleInputChange } = useTermHandler(commonTermData);
    return (
        <div style={{backgroundColor:"green"}}>
            <input type="text" value={termData.inputValue} onChange={handleInputChange}></input>
            <input type="checkbox" checked={termData.checked} onChange={hanleChecked}></input>
        </div>
    )
}

export default AssitArea;
