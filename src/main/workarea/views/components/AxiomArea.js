// 局部结论
import TermMapArea from "./common/TermMapArea";
import useAxiomAreaHandler from "../../handler/useAxiomAreaHandler";
function AxiomArea() {
    const {handleClick} = useAxiomAreaHandler();
    return (
        <TermMapArea stateName={"axiomState"} buttonProps={
            {
                onClick:  handleClick,
                name : "USE"
            }
        }></TermMapArea>
    )
}

export default AxiomArea;