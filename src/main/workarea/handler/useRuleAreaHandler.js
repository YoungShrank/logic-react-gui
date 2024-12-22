import { useState } from "react";
const useRuleAreaHandler = (commonTermList) => {

    const [termList, setTermList] = useState(commonTermList);

    function handleAddTerm() {
        console.log(commonTermList.length)
        commonTermList.push({checked: false, inputValue: ""})
        console.log(commonTermList.length, [...commonTermList])
        setTermList([...commonTermList]);
    }

    function handleInputChange(e) {
        console.log(e.target, commonTermList);
    }
    function handleChekedChange(e) {
        console.log(e.target, commonTermList);
    }

    

    return { termList, handleAddTerm , handleInputChange, handleChekedChange };

}

export default useRuleAreaHandler;