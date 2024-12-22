// term view event handler

import { useEffect, useState } from "react";


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