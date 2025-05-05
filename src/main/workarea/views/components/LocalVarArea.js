import useVarAreaHandler from "../../handler/useVarAreaHandler"
import VarMapArea from "./common/VarMapArea"
function LocalVarArea() {
    // handler
    // view
    return (
        <div>
            <p>变量区</p>
            <VarMapArea stateName="localVarState"></VarMapArea>
        </div>
    )
}

export default LocalVarArea