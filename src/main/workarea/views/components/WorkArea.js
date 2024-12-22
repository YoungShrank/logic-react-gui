import ProofArea from "./ProofArea";
import RuleArea from "./RuleArea";
import VarArea from "./VarArea";
import Horizer from "../../../common/views/layout/Horizer";
import useWorkAreaHandler from "../../handler/useWorkAreaHandler";
import AssistContext from "../../message/context/AssistContext";
import AssitArea from "./AssitArea";
import { useState } from "react";
const RuleList = []
const ProofList = []
/**
 *     const head = [
        {key: "varName", value: "Variable Name"},
        {key: "mathType", value: "Math Type"},
        {key: "referType", value: "Refer Type"}
    ]
 */
const VarList = [
    {varName: "x", mathType: "Real", referType: "bound"},
    {varName: "y", mathType: "Tuple", referType: "one"},
    {varName: "z", mathType: "Func", referType: "any"}
]

const assitTermList = []
function WorkArea() {

    const {handleSave, handleChekedChange, handleInputChange} = useWorkAreaHandler();
    return (

        <div onInput={handleInputChange} onChange={handleChekedChange}>Work Area
            <AssistContext.Provider value={useState(assitTermList)}>
                <Horizer>
                    <RuleArea commonTermList={RuleList}/>
                    <ProofArea commonTermList = {ProofList} commonAssitTermList={assitTermList}/>
                    <AssitArea/>
                    <VarArea commonVarList={VarList}/>
                </Horizer>
                <button onClick= {handleSave}>Save</button>
            </AssistContext.Provider>
        </div>
    );
}


export default WorkArea;