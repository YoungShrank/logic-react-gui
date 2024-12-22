// 证明区
import React, { useState } from "react";
import useTermHandler from "../../handler/useTermHandler";
import useProofAreaHandler from "../../handler/useProofAreaHandler";
function ProofArea({commonTermList, commonAssitTermList}) {
    const { termList, handleAddTerm ,
        handleChekedChange, handleInputChange, handleSelectChange,
        handleKeyDown } = useProofAreaHandler(
        commonTermList , commonAssitTermList);

    return (
        <div onChange={handleChekedChange} onInput={handleInputChange} onSelect={handleSelectChange}
         onKeyDown={handleKeyDown}>
            <p>证明区</p>
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
        <div style={{backgroundColor:"green"}}>
            <input type="text" value={termData.inputValue} onChange={handleInputChange}></input>
            <input type="checkbox" checked={termData.checked} onChange={hanleChecked}></input>
        </div>
    )
}

export default ProofArea;