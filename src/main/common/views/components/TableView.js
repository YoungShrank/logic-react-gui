// 导入样式
import '../css/TableView.css';

/**
 *  表格数据视图
 * @param {*} data [{col1: 'value1', col2: 'value2'}]
 * @param {*} head [{key: 'col1', text: '列1'}, {key: 'col2', text: '列2'}]
 */

function TableView({head, data}) {
    return (
        <table>
            <thead>
                <tr>
                    {head.map((item, index) => (
                        <th key={index}>{item.text}</th>
                    ))}
                </tr>
                {data.map((item, index) => (
                    <tr key={index}>
                        {head.map((headItem, headIndex) => (
                            <td key={headIndex}>{item[headItem.key]}</td>
                        ))}
                    </tr>
                ))}
            </thead>
        </table>
    )
}
  
export default TableView;