import { Provider } from 'react-redux';
import store from '../../message/store';
import WorkArea from './WorkArea';
/**
 * 用于提供Provider的组件，将store注入到子组件中
 * @returns 
 */
function Wrapper() {
    return (
        <div>
            <Provider store={store}>
                <WorkArea />
            </Provider>
        </div>
    )
}

export default Wrapper;