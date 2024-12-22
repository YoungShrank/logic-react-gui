import { useDispatch, useSelector } from 'react-redux';

function useAssitAreaReceiver() {
    const assitTermList = useSelector(state => state.assitTermList);
    return { assitTermList };
}