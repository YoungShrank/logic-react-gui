import { useState } from 'react';
import axios from 'axios';
import { apiClient } from '../api';
import { useEffect } from 'react';
import { API_BASE_URL } from '../config';

// 将结论ID输入组件抽象为可复用组件
const DraggableConclusionInput = ({ label, value, onChange }) => (
  <div className="input-group">
    <label>{label}</label>
    <input
      placeholder="通过拖放或输入设置"
      value={value}
      onChange={e => onChange(e.target.value)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        const id = e.dataTransfer.getData('conclusion/id');
        onChange(id);
      }}
    />
  </div>
);
const ApplicationPanel = ({ conclusions, terms, rules, selectedSubterm,
  onDataRefresh
}) => {
  const [selectedRule, setSelectedRule] = useState('');
  const [inputParams, setInputParams] = useState({
    quantifier: '∀',
    free_bound: {},
  });
  const [selectedConclusion, setSelectedConclusion] = useState('');
  const [ruleSearch, setRuleSearch] = useState('');
  const [selectedRuleId, setSelectedRuleId] = useState('');

   // 添加选区监听逻辑
   useEffect(() => {
    if (selectedSubterm && selectedRule === 'eqrepl'
       || selectedRule === 'bra'
    ) {
      setInputParams(prev => ({
        ...prev,
        first: selectedSubterm?.tstart,  // 使用正确字段名
        last: selectedSubterm?.tend      // 使用正确字段名
      }));
    // 添加空值检查
    setSelectedConclusion(selectedSubterm?.conclusion_id?.toString() || '');
    }
  }, [selectedSubterm, selectedRule]);

  // 推理规则列表（根据interface.yaml定义）
  const deductionRules = [
    { value: 'deduce', label: '一阶推理' },
    { value: 'instance', label: '量词消去' },
    { value: 'introduce', label: '量词引入' },
    { value: 'eqrepl', label: '等式替换' },
    { value: 'bra', label: '括号操作' },
    { value: 'qed', label: '结束证明' }
  ];

  // 获取一阶推理规则列表
  const filteredRules = Object.entries(rules)
  .filter(([id, pattern]) => 
    pattern.toLowerCase().includes(ruleSearch.toLowerCase()) || 
    id.toLowerCase().includes(ruleSearch.toLowerCase())
  );

  // 动态参数输入生成器
  const renderInputs = () => {
    switch(selectedRule) {
      case 'deduce':
        return (
            <>
              <div className="rule-search-box">
                <input
                  placeholder="搜索规则..."
                  value={ruleSearch}
                  onChange={e => setRuleSearch(e.target.value)}
                />
                <div className="rule-list">
                  {filteredRules.map(([id, pattern]) => (
                    <div 
                      key={id} 
                      className={`rule-item ${selectedRuleId === id ? 'selected' : ''}`}
                      onClick={() => {
                        setSelectedRuleId(id);
                        setInputParams({...inputParams, rule: id});
                      }}
                    >
                      <div className="rule-id">规则 {id}</div>
                      <div className="rule-pattern">{pattern}</div>
                    </div>
                  ))}
                </div>
              </div>
              <input
                placeholder="实例映射 (JSON)"
                onChange={e => setInputParams({...inputParams, name_instance: JSON.parse(e.target.value)})}
              />
            </>
          );
          case 'instance':
            return (
              <div className="input-section" 
                   onDragOver={(e) => e.preventDefault()}
                   onDrop={(e) => {
                     // 处理辅助项拖放
                     if (e.dataTransfer.types.includes('term/id')) {
                       const termId = e.dataTransfer.getData('term/id');
                       setInputParams({...inputParams, auxiliary_id: termId});
                     }
                   }}>
                <div className="input-group">
                  <label>约束变元名:</label>
                  <input
                    value={inputParams.bound_var || ''}
                    onChange={(e) => setInputParams({...inputParams, bound_var: e.target.value})}
                  />
                </div>
                
                {/* 新增辅助项拖放提示 */}
                <div className="drop-hint">
                  拖动辅助项至此区域 → 
                  {inputParams.auxiliary_id && (
                    <span className="term-badge">{inputParams.auxiliary_id}</span>
                  )}
                </div>
              </div>
            );
      case 'eqrepl':
        return (
          <>
            <DraggableConclusionInput
              label="等式ID:"
              value={inputParams.equal_id || ''}
              onChange={(val) => setInputParams({...inputParams, equal_id: val})}
            />
            
            <div className="input-group">
              <label>替换位置:</label>
              <select
                value={inputParams.old_side || 'left'}
                onChange={e => setInputParams({...inputParams, old_side: e.target.value})}
              >
                <option value="left">左侧替换</option>
                <option value="right">右侧替换</option>
              </select>
            </div>
                  {/* 调整选区展示布局 */}
      <div className="input-group">
        <label>替换范围:</label>
        <div className="range-inputs">
          <input
            type="number"
            placeholder="起始位置"
            value={inputParams.first || ''}
            onChange={e => setInputParams({...inputParams, first: e.target.value})}
          />
          <span>-</span>
          <input 
            type="number"
            placeholder="结束位置" 
            value={inputParams.last || ''}
            onChange={e => setInputParams({...inputParams, last: e.target.value})}
          />
        </div>
      </div>
          </>
        );
        case 'bra':
          return (
            <>
              <div className="input-group">
                <label>操作类型:</label>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      value="on"
                      checked={inputParams.off_on === 'on'}
                      onChange={e => setInputParams({...inputParams, off_on: e.target.value})}
                    />
                    添加括号
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="off"
                      checked={inputParams.off_on === 'off'}
                      onChange={e => setInputParams({...inputParams, off_on: e.target.value})}
                    />
                    去除括号
                  </label>
                </div>
              </div>
    
              {/* 复用等式替换的选区范围输入 */}
              <div className="input-group">
                <label>操作范围:</label>
                <div className="range-inputs">
                  <input
                    type="number"
                    placeholder="起始位置"
                    value={inputParams.first || ''}
                    onChange={e => setInputParams({...inputParams, first: e.target.value})}
                  />
                  <span>-</span>
                  <input 
                    type="number"
                    placeholder="结束位置" 
                    value={inputParams.last || ''}
                    onChange={e => setInputParams({...inputParams, last: e.target.value})}
                  />
                </div>
              </div>
            </>
          );
      // 在renderInputs的switch语句中添加introduce分支
case 'introduce':
  return (
    <>
      <div className="input-group">
        <label>量词类型:</label>
        <select
          value={inputParams.quantifier || '∀'}
          onChange={e => setInputParams({...inputParams, quantifier: e.target.value})}
        >
          <option value="∀">全称量词 (∀)</option>
          <option value="∃">存在量词 (∃)</option>
        </select>
      </div>


      <div className="variable-mapping">
        <label>变量替换关系（拖动自由变量→输入约束变量）:</label>
        {Object.entries(inputParams.free_bound || {}).map(([free, bound], index) => (
          <div key={index} className="mapping-item">
            <span className="free-var">{free}</span>
            <input
              type="text"
              placeholder="约束变量名"
              value={bound}
              onChange={e => {
                const newMap = {...inputParams.free_bound};
                newMap[free] = e.target.value;
                setInputParams({...inputParams, free_bound: newMap});
              }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                const varName = e.dataTransfer.getData('variable/name');
                if (varName) {
                  const newMap = {...inputParams.free_bound};
                  newMap[varName] = bound; // 保留已输入的约束变量名
                  setInputParams({...inputParams, free_bound: newMap});
                }
              }}
            />
            <button
              onClick={() => {
                const newMap = {...inputParams.free_bound};
                delete newMap[free];
                setInputParams({...inputParams, free_bound: newMap});
              }}>
              移除
            </button>
          </div>
        ))}
        <div className="new-mapping">
          <div 
            className="drop-zone"
            onDragOver={e => e.preventDefault()}
            onDrop={e => {
              const varName = e.dataTransfer.getData('variable/name');
              if (varName && !inputParams.free_bound?.[varName]) {
                setInputParams({
                  ...inputParams,
                  free_bound: {
                    ...inputParams.free_bound,
                    [varName]: "" // 初始化约束变量名为空
                  }
                });
              }
            }}>
            将自由变量拖至此区域添加
          </div>
        </div>
      </div>
    </>
  );
        // 在renderInputs函数中添加qed分支
      case 'qed':
        return (
          <div className="qed-notice">
            点击应用按钮将结束当前证明
          </div>
        );
      default:
        return null;
    }
  };

  // 提交处理
  const handleApply = async () => {
    try {
      let payload;
      switch(selectedRule) {
        case 'instance':
          payload = {
            conclusion_id: parseInt(selectedConclusion, 10),  // 转换为整数
            name_instance: {
              [inputParams.bound_var]: inputParams.auxiliary_id
            }
          };
          break;
        case 'deduce':
          payload = {
            presumptions: [selectedConclusion],
            rule: inputParams.rule,
            name_instance: inputParams.name_instance
          };
          break;
        case 'eqrepl':
          payload = {
            conclusion_id: selectedConclusion,
            equal_id: inputParams.equal_id,
            old_side: inputParams.old_side,
            first: inputParams.first,
            last: inputParams.last
          };
          break;
          case 'bra':
            payload = {
              conclusion_id: selectedConclusion,
              off_on: inputParams.off_on,
              first: inputParams.first,
              last: inputParams.last
            };
            break;
        case 'qed':
          payload = {}; // qed不需要任何参数
          break;
        default:
          payload = {
            ...inputParams,
            presumptions: [selectedConclusion]
          };
      }

      await apiClient.post(selectedRule, payload);
    
      // 新增数据刷新逻辑
      onDataRefresh(); // 需要从父组件传递该回调
    } catch (error) {
      console.error('应用错误:', error);
    } finally {
      // 清空参数
      setInputParams({});
      setSelectedConclusion('');
    }
  };

  return (
    <div className="application-panel">
      <div className="rule-selection">
        <select 
          value={selectedRule} 
          onChange={e => setSelectedRule(e.target.value)}
        >
          <option value="">选择推理规则</option>
          {deductionRules.map(rule => (
            <option key={rule.value} value={rule.value}>{rule.label}</option>
          ))}
        </select>
      </div>

      <div className="input-section">
        <input
          placeholder="选择结论ID"
          value={selectedConclusion}
          onChange={e => setSelectedConclusion(e.target.value)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            const conclusionId = e.dataTransfer.getData('conclusion/id');
            const content = e.dataTransfer.getData('conclusion/content');
            setSelectedConclusion(conclusionId);
            setInputParams({...inputParams, conclusion_id: conclusionId});
          }}
        />
        {renderInputs()}
      </div>

      <button 
        onClick={handleApply}
        disabled={!selectedRule ||  (selectedRule !== 'qed' && !selectedConclusion)}
      >
        应用推理规则
      </button>
    </div>
  );
};

export default ApplicationPanel;