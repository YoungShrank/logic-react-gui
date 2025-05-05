import ProofArea from "./ProofArea";
import RuleArea from "./RuleArea";
import LocalVarArea from "./LocalVarArea";
import TermsArea from "./common/TermsArea";
import Horizer from "../../../common/views/layout/Horizer";
import useWorkAreaHandler from "../../handler/useWorkAreaHandler";
import AssistContext from "../../message/context/AssistContext";
import AssitArea from "./AssitArea";
import LineArea from "./LineArea";
import LocalArea from "./LocalArea";
import { useState } from "react";
import { RuleList, ProofList, VarList, assitTermList } from "../data/data";
import { Provider } from "react-redux";
import store from "../../message/store";
import AxiomArea from "./AxiomArea";
import AssistMapArea from "./AssitMapArea";

/**
 * 工作区View
 * @returns 
 */
function WorkArea() {

    const {handleSave, handleChekedChange, handleInputChange, handleBroadCast} = useWorkAreaHandler();
    return (

        <div onInput={handleInputChange} onChange={handleChekedChange}>Work Area
            <AssistContext.Provider value={useState(assitTermList)}>
                <Provider store={store}>
                    <Horizer>
                        <RuleArea commonTermList={RuleList}/>
                        <AxiomArea></AxiomArea>
                        <LineArea/>
                        <LocalArea/>
                    </Horizer>
                    <Horizer>
                        <AssistMapArea></AssistMapArea>
                        <LocalVarArea />
                    </Horizer>
                    
                    <button onClick= {handleSave}>Save</button>
                    <button onClick= {handleBroadCast}>BroadCast</button>
                    <button onClick= {handleInputChange}>InputChange</button>
                    <button onClick= {handleChekedChange}>ChekedChange</button>
                    <button onClick= {handleSave}>Save</button>
                    
                </Provider>
            </AssistContext.Provider>
        </div>
    );
}


export default WorkArea;