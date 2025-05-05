// 变量区
import React, { useState } from "react";
import useTermStateRegister from "../../../message/receiver/useTermStateRegister"
import TableView from "../../../../common/views/components/TableView";

function VarMapArea({stateName}) {
    const {termState} = useTermStateRegister(stateName);
    const head = [
        {key: "name", text: "Variable Name"},
        {key: "sort", text: "Math Type"},
        {key: "type_", text: "Refer Type"}
    ]
    console.log("stateName: ", stateName)
    return (
        <div>
            <p>{stateName}变量区</p>
            <TableView head={head} data={Object.values(termState)} />
        </div>
    )
}

export default VarMapArea;