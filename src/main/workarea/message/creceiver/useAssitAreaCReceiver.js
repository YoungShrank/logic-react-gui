import React, { useContext, useState } from'react';
import  AssistContext from '../context/AssistContext';
function useAssitAreaCReceiver() {
    const [assitTermList, setAssitTermList] = useContext(AssistContext);
    return { assitTermList };
}

export default useAssitAreaCReceiver;