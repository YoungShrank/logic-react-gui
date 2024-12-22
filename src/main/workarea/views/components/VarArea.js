import useVarAreaHandler from "../../handler/useVarAreaHandler"
import TableView from "../../../common/views/components/TableView"
function VarArea({commonVarList}) {
    console.log("common var list : ",commonVarList)
    // handler
    const {head, varList, setVarList} = useVarAreaHandler(commonVarList)
    console.log("var list : ",varList)
    console.log("table head : " , head)
    // view
    return (
        <div>
            <p>变量区</p>
            <TableView head={head} data={varList} />
        </div>
    )
}

export default VarArea