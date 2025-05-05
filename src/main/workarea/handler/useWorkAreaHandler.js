import { useState } from "react";
import { useDispatch } from 'react-redux';
import {UPDATE_ASSUMPTIONS, UPDATE_RULES, UPDATE_AXIOM} from "../message/actions.js"

import { RuleList } from "../views/data/data.js";
import {queryRuleList, queryAxiomList} from "../api/api.js"
/**
 * 工作区数据和事件处理
 * @returns 
 */
const useWorkAreaHandler = () => {
    const dispatch = useDispatch();

    
    function handleSave() {
        console.log("Save clicked");
    }

    function handleInputChange(e) {
        //console.log(e.target);
    }
    function handleChekedChange(e) {
        //console.log(e.target);
    }

    function handleBroadCast() {
        queryRuleList().then(data =>{
            console.log("rulelist data", data)
            const payload = {rules: data}
            dispatch({ type: UPDATE_RULES, payload: payload });
        })
        queryAxiomList().then(data =>{
            console.log("axiomlist data", data)
            const payload = {terms: data}
            dispatch({ type: UPDATE_AXIOM, payload: payload });
        })
        console.log("Broadcast clicked", RuleList);
        const payload = {terms: [
            ...RuleList
        ]}

        dispatch({ type: UPDATE_ASSUMPTIONS, payload: payload });

    }
    return { handleSave , handleInputChange, handleChekedChange, handleBroadCast };

}

export default useWorkAreaHandler;
