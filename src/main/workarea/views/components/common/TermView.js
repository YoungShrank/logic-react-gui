// 项视图
import useTermHandler from "../../handler/useTermHandler";

function TermView({commonTermData}) {
    const { termData, setTermData, hanleChecked , handleInputChange } = useTermHandler(commonTermData);
    return (
        <div style={{backgroundColor:"green"}}>
            <label>{termData.index}</label>
            <input type="text" value={termData.inputValue} onChange={handleInputChange}></input>
            <input type="checkbox" checked={termData.checked} onChange={hanleChecked}></input>
        </div>
    )
}