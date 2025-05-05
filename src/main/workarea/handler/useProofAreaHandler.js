import { useState } from "react";
import { useContext } from "react";
import AssistContext from "../message/context/AssistContext";
/**
 * 证明区数据和事件处理
 * @param {*} commonTermList 
 * @param {*} commonAssitTermList 
 * @returns 
 */
const useProofAreaHandler = (commonTermList, commonAssitTermList) => {

    const [termList, setTermList] = useState(commonTermList);
    const [assitTermList, setAssitTermList] = useContext(AssistContext);
    const [selectedSub, setSelectedSub] = useState("");

    function handleAddTerm() {
        commonTermList.push({checked: false, inputValue: ""})
        setTermList([...commonTermList]);
    }

    function handleInputChange(e) {
        console.log(e.target, commonTermList);
    }
    function handleChekedChange(e) {

        
    }

    function handleSelectChange(e) {
        console.log("beforeselect change", selectedSub);
        const selection = window.getSelection();
        const selectedText = selection.toString();
        console.log("select change",  selectedText);
        if (selectedText && selectedText.trim()!== "") {
            setSelectedSub(selectedText);
        }
    }

    function handleKeyDown(e) {
        if (e.ctrlKey && e.key === "b") {
            e.preventDefault(); // prevent default behavior of bold
            console.log("ctrl+b pressed");
            commonAssitTermList.push({checked: false, inputValue: selectedSub})
            setAssitTermList([...commonAssitTermList]);
            console.log("the value is provided",e.target, commonTermList);
        }
    }

    return { termList, handleAddTerm , handleInputChange, handleChekedChange , handleSelectChange,
        handleKeyDown
    };

}

export default useProofAreaHandler;