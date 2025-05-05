import {utiliseAxiom, queryLocalList} from "../api/api";
import {useDispatch} from "react-redux";
import { UPDATE_LOCALS } from "../message/actions";
const useAxiomAreaHandler = () => {
    const dispatch = useDispatch();
    function handleClick(termDataState) {
        utiliseAxiom(termDataState.index).then((d)=>{
            console.log("after utilise axiom: ", d);
            queryLocalList().then(data => {
                dispatch({
                    type: UPDATE_LOCALS,
                    payload: {
                        terms: data
                    }
                });
            });
        });
    }
    return {handleClick};
}

export default useAxiomAreaHandler;