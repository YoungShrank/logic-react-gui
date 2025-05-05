import { useState } from "react";
import { queryLocalVarList } from "../api/api";
import { useSelector } from "react-redux";

const useLocalVarHandler = () => {
    const [localVar, setLocalVar] = ({});
    const head = [
        {key: "name", text: "Variable Name"},
        {key: "sort", text: "Math Type"},
        {key: "type_", text: "Refer Type"}
    ]

    function updateLocalVarList() {
        queryLocalVarList().then(res => {
            // 获得res的values
            setLocalVar(res);
        })
    }

}