// term view event handler

import { useEffect, useState } from "react";

/**
 * 项数据和事件处理
 * @param {*} commonTermData 
 * @returns 
 */
function useTermHandler(commonTermData) {

    const [termData, setTermData] = useState(commonTermData);

    const hanleChecked = (e) => {
        commonTermData.checked = e.target.checked;
        setTermData({...commonTermData});
    }

    const handleInputChange = (e) => {
        console.log(e.target.value);
        commonTermData.inputValue = e.target.value;
        setTermData({...commonTermData});
        console.log("set term data: " + commonTermData.inputValue);
    }

    return { termData, setTermData, hanleChecked , handleInputChange };
}

export default useTermHandler;