// 一行展示的若干数据项

import { useState } from "react";
/**
 * 一行展示若干视图项
 * 
 * @param {*} props 键值对，键为名，值为视图
 * @returns  视图，组合了若干视图项，在一行中展示
 */
function Horizer(props) {
    console.log(props.children)
    const children = props.children
    const styles = {
        container : {
            display: 'flex', // 弹性布局
            flexDirection: 'row', // 方向为横向
            justifyContent:'space-between', // 两端对齐
            alignItems: 'center', // 垂直居中
            //padding: '10px', // 内边距
            borderBottom: '1px solid #ccc', // 底部边框
            backgroundColor: 'lightblue'// 背景色
        }
    }

    return (
        <div style={styles.container}>
            {children}
        </div>
    )
}

export default Horizer;