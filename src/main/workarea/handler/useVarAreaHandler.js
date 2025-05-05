// var area view event handler

import { useEffect, useState } from "react";

/**
 * 变量区数据和事件处理
 * @param {*} commonVarList 
 * @returns 
 */
function useVarAreaHandler(commonVarList) {
    //console.log(useState(commonVarList))
    const [varList, setVarList] = useState(commonVarList);
    console.log(" useVarAreaHandler : var list : ",varList)
    console.log(" useVarAreaHandler : common var list : ",commonVarList)
    const head = [
        {key: "varName", text: "Variable Name"},
        {key: "mathType", text: "Math Type"},
        {key: "referType", text: "Refer Type"}
    ]

    return { head, varList, setVarList};
}

export default useVarAreaHandler;