import React from 'react';

const TheoremAxiomPanel = ({ theorems, searchTerm, onSearch, onApply }) => (
  <div className="panel">
    <input
      type="text"
      placeholder="搜索定理/公理..."
      value={searchTerm}
      onChange={(e) => onSearch(e.target.value)}
    />
    <div className="scroll-list">
      {theorems.filter(t => 
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.content.toLowerCase().includes(searchTerm.toLowerCase())
      ).map((theorem, i) => (
        <div 
          key={i} 
          className=""
          title={"右键应用它"}
          onContextMenu={(e) => {
            e.preventDefault();
            onApply({
              type: theorem.type === 'axiom' ? 'axiom' : 'theorem',
              name: theorem.name
            });
          }}
        >
          <div className="theorem-header">
            <span className="theorem-type">{theorem.type === 'axiom' ? '[公理]' : '[定理]'}</span>
            <span className="theorem-name">{theorem.name}</span>
          </div>
          <div className="theorem-content">{theorem.content}</div>
        </div>
      ))}
    </div>
  </div>
);

export default TheoremAxiomPanel;