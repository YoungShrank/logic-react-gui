import useLineAreaHandler from "../../handler/useLineAreaHandler";
function LineArea()
{
    const {line, setLine, handleClick, handleLineChange, anyText, handleTextChange} = useLineAreaHandler();

    return (
        <div>
            <p>输入区</p>
            <div>
                <label>项输入</label>
                <input type="text"  value={line} onChange={handleLineChange}/>
                <button onClick={handleClick}>确定</button>
            </div>
            <div>
                <label>通用输入</label>
                <input type="text" value={anyText} onChange={handleTextChange}/>
            </div>
        </div>
    )
}

export default LineArea;