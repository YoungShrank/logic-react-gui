import { useState, useEffect } from 'react';
import { apiClient } from '../api'; // 新增导入

const ProofArea = ({ 
    assumptions, onCommandSubmit, proofSteps, proofStatus,
    onSubtermSelect}) => {
  const [commandInput, setCommandInput] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (commandInput.trim()) {
      onCommandSubmit(commandInput);
      setCommandInput('');
    }
  };
  // 需要保留的清理逻辑
useEffect(() => {
    return () => {
      // 组件卸载时清理所有定时器
      const steps = document.querySelectorAll('.step-content');
      steps.forEach(step => {
        if (step.timer) {
          clearTimeout(step.timer);
          delete step.timer;
        }
      });
    };
  }, []);

 // 统一处理文本选区逻辑
 const handleTextSelection = async (index, content, e) => {
      // 添加调试日志
   console.log('触发选区检测', { index, type: proofSteps[index]?.type });
    if (proofSteps[index].type !== 'conclusion') return;
    // 新增内容节点检测
  // 修正为使用事件当前目标
  const container = e.currentTarget;
  const contentNode = container.querySelector('.content-text');
    if (!contentNode) return;

    // 修改选区检测逻辑
    const selection = window.getSelection();
    if (selection.isCollapsed || !selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    // 修改边界检查
    if (!contentNode.contains(range.startContainer)) return;

    const preRange = range.cloneRange();
    preRange.selectNodeContents(contentNode); // 改为基于内容节点计算
    preRange.setEnd(range.startContainer, range.startOffset);
    
    const selectionData = {
      conclusionId: index,
      start: preRange.toString().length,
      end: preRange.toString().length + range.toString().length,
      content: content
    };
    
    console.log('start handle selection', index, selectionData);

    const timer = setTimeout(async () => {
      try {
        console.log("[DEBUG] 定时器回调已执行");
        const response = await apiClient.post('/cp2tp', {
          conclusion_id: index,
          first: selectionData.start,
          last: selectionData.end,
          text: content
        });
        
        // 通过回调更新父组件状态
        onSubtermSelect({
          conclusion_id: index,
          text: content,
          start: response.data[2],
          end: response.data[3],
          tstart : response.data[0],
          tend : response.data[1],
          name: ""
        });
      } catch (error) {
        console.error('选区转换错误:', error);
      }
    }, 3000);
  };

  return (
    <div className="proof-area">
      {/* 新增证明状态栏 */}
      <div className="proof-status">
        <span className="status-label">证明模式:</span>
        <span className="status-value">{proofStatus.mode}</span>
        
        <span className="status-label">待证命题:</span>
        <span className="status-theorem">{proofStatus.targetTheorem || "暂无"}</span>
      </div>

      {/* 修改证明步骤显示 */}
      <div className="proof-steps">
            {proofSteps.map((step, index) => (
          <div 
            key={index} 
            className={`proof-step ${step.type}`}
          >
            <div className="step-number">
                {index + 1}.
                    {/* 添加拖动手柄 */}
                    <span 
                    className="drag-handle"
                    draggable
                    onDragStart={(e) => {
                        e.dataTransfer.setData('conclusion/id', index);
                        e.dataTransfer.setData('conclusion/content', step.content);
                    }}
                    >🖐️</span>
                </div>
                <div 
                className="step-content"
                onMouseUp={(e) => handleTextSelection(index, step.content, e)}
                >
                {/* 将结论标签与内容分离 */}
                {step.type === 'conclusion' && (
                    <span className="conclusion-badge">结论</span>
                )}
                <span className="content-text">{step.content}</span>
            </div>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="command-input">
        <input
          type="text"
          value={commandInput}
          onChange={(e) => setCommandInput(e.target.value)}
          placeholder="输入推理命令..."
        />
        <button type="submit">执行</button>
      </form>
    </div>
  );
};

export default ProofArea;