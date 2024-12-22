import { useState } from "react";
const useWorkAreaHandler = () => {

    
    function handleSave() {
        console.log("Save clicked");
    }

    function handleInputChange(e) {
        //console.log(e.target);
    }
    function handleChekedChange(e) {
        //console.log(e.target);
    }
    return { handleSave , handleInputChange, handleChekedChange };

}

export default useWorkAreaHandler;
