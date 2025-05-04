import React, { useState } from 'react';

const AuxiliaryItemPanel = ({ terms, selectedSubterm, onAddTerm,
    onClearSelection}) => {
    const [termName, setTermName] = useState('');
    return (
  <div className="panel">
    <h3>辅助项</h3>
     
      {/* 新增待添加项区 */}
      {selectedSubterm && (
        <div className="pending-term">
          <div className="subterm-preview">
            选中内容: {selectedSubterm.text.slice(selectedSubterm.start, selectedSubterm.end + 1)}
          </div>
          <input
            placeholder="输入辅助项名称"
            value={termName}
            onChange={(e) => setTermName(e.target.value)}
          />
          <button 
            onClick={() => {
              onAddTerm({
                ...selectedSubterm,
                name: termName
              });
              setTermName('');
            }}
          >
            添加
          </button>
        </div>
      )}

    <div className="scroll-list">
      {terms.map((term, i) => (
        <div key={i} 
        className="term-item"
        draggable 
        onDragStart={(e) => {
            e.dataTransfer.setData('term/id', term.name);
            e.dataTransfer.setData('term/content', term.content);
        }}
        >
        <div className="term-header">
            <span className="term-name">{term.name}</span>
            <span className="term-type">辅助项</span>
        </div>
          <div className="term-content">{term.content}</div>
        </div>
      ))}
      {/*添加空状态提示*/}
        {terms.length === 0 && (
        <div className="empty-state">
            <div className="empty-icon">🖱️</div>
            <p>从结论选区创建辅助项</p>
        </div>
        )}
    </div>
  </div>
)};

export default AuxiliaryItemPanel;