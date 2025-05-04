import React from 'react';

const VariablePanel = ({ localVars, globalVars }) => (
  <div className="panel variable-panel">
    <h3>变量表</h3>
    
    {/* 全局变量表格 */}
    <div className="var-section">
      <h4>全局变量</h4>
      <table className="var-table">
        <thead>
          <tr>
            <th>变量名</th>
            <th>类型</th>
            <th>指代类型</th>
          </tr>
        </thead>
        <tbody>
          {globalVars.map((v, i) => (
            <tr 
              key={`global-${i}`}
              className="var-item"
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('variable/name', v.name);
                e.dataTransfer.setData('variable/type', v.type_);
              }}
            >
              <td title={v.name}>{v.name}</td>
              <td title={v.sort}>{v.sort}</td> 
              <td title={v.type_}>{v.type_}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* 局部变量表格 */}
    <div className="var-section">
      <h4>局部变量</h4>
      <table className="var-table">
        <thead>
          <tr>
            <th>变量名</th>
            <th>类型</th>
            <th>指代类型</th>
          </tr>
        </thead>
        <tbody>
          {localVars.map((v, i) => (
            <tr
              key={`local-${i}`}
              className="var-item"
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('variable/name', v.name);
                e.dataTransfer.setData('variable/type', v.type_);
              }}
            >
              <td title={v.name}>{v.name}</td>
              <td title={v.sort}>{v.sort}</td> 
              <td title={v.type_}>{v.type_}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default VariablePanel;