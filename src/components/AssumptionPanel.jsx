const AssumptionPanel = ({ assumptions, onApply }) => (
  <div className="panel">
    <h3>假设列表</h3>
    <div className="scroll-list">
      {assumptions.map((assumption, i) => (
        <div
          key={i}
          className="assumption-item"
          onContextMenu={(e) => {
            e.preventDefault();
            onApply({
              type: 'assume',
              index: i
            });
          }}
        >
          <div className="assumption-index">假设 #{i + 1}</div>
          <div className="assumption-content">{assumption}</div>
        </div>
      ))}
    </div>
  </div>
);

export default AssumptionPanel;