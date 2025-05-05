import { useState } from "react";
import {queryRuleList} from "../api/api"
/**
 * 规则数据和事件处理
 * @param {*} commonTermList 
 * @returns 
 */
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

    function handleQueryRuleList() {
        queryRuleList().then((data)=>{
            console.log(data)
            // dict values 转list
            data = Object.keys(data).map(key => {
                return {
                    checked: false,
                    inputValue: data[key]
                }
            })

            setTermList(data)
        })
    }

    

    return { termList, handleAddTerm , handleInputChange, handleChekedChange, handleQueryRuleList};

}

export default useRuleAreaHandler;