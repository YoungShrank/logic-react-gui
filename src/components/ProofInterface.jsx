import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiClient } from '../api';
import ProofArea from './ProofArea';
import AuxiliaryItemPanel from './AuxiliaryItemPanel';
import AssumptionPanel from './AssumptionPanel';
import VariablePanel from './VariablePanel';
import TheoremAxiomPanel from './TheoremAxiomPanel';
import '../styles/interface.css';
import ApplicationPanel from './ApplicationPanel';
import { API_BASE_URL } from '../config';

const ProofInterface = () => {
  const [envData, setEnvData] = useState({
    variables: { local: [], global: [] },
    theorems: [],
    assumptions: [],
    terms: [],
    inputLines: [],
    conclusions: [],
    rules: {},  // 新增规则数据
    proofStatus: {
        mode: 'Global',  // 从后端获取的实际模式
        targetTheorem: null
      }
  });
  const [selectedRule, setSelectedRule] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubterm, setSelectedSubterm] = useState(null); //

  const fetchEnvData = async () => {
    try {
      const response = await apiClient.post("/read", { items: [] });
      console.log('Fetched data:', response.data);
      setEnvData({
        variables: {
          local: Object.values(response.data.LC || {}),
          global: Object.values(response.data.GL || {})
        },
      // 合并定理和公理数据
      theorems: [
        ...Object.entries(response.data.TS || {}).map(([name, content]) => ({ 
          type: 'theorem',
          name: name,
          content: content
        })),
        ...Object.entries(response.data.AX || {}).map(([name, content]) => ({
          type: 'axiom',
          name: name,
          content: content // 根据data.json结构调整
        }))
      ],
        assumptions: response.data.AS || [],
        terms: Object.entries(response.data.TM || {}).map(([name, content]) => ({
          name,
          content
        })),
        inputLines: response.data.LN || [],    // 新增输入行
        conclusions: response.data.CC || [],   // 新增局部结论
        rules: response.data.RL || {},        // 新增规则数据
        proofStatus: {
            mode: response.data.MD || 'Global',
            targetTheorem: response.data.TH || null
          },
      });
    } catch (error) {
      console.error('Error fetching environment data:', error);
    }
  };
  // 初始化环境数据
  useEffect(() => {
    console.log('Fetching environment data...');
    fetchEnvData();
  }, []);
    // 新增ResizeObserver处理（放在所有useEffect最后）
    useEffect(() => {
      const observer = new ResizeObserver(entries => {
        try {
          entries.forEach(entry => {
            if (!entry.contentRect) return;
            // 这里添加实际的尺寸处理逻辑
          });
        } catch (error) {
          console.log('ResizeObserver安全处理:', error);
        }
      });
      
      const container = document.querySelector('.interface-container');
      if (container) observer.observe(container);
  
      return () => {
        if (container) observer.unobserve(container);
      };
    }, []); // 空依赖数组表示只运行一次

  // 命令输入处理
  // 修改handleCommandSubmit函数
  const handleCommandSubmit = async (command) => {
    try {
      await apiClient.post(`/write_line`, { expression: command });
      // 替换原有更新逻辑为完整刷新
      await fetchEnvData(); // 直接调用刷新函数
    } catch (error) {
      console.error('Command execution error:', error);
    }
  };

  // 新增应用处理函数
  const handleApplyItem = async (item) => {
    try {
      await apiClient.post('/use', {
        assume_or_axiom: item.type,
        index: item.type === 'assume' ? item.index : item.name
      });
      fetchEnvData(); // 刷新环境数据
    } catch (error) {
      console.error('应用错误:', error);
    }
  };

  
    // 处理添加辅助项
    const handleAddTerm = async (termData) => {
        try {
        await apiClient.post('/select', {
            conclusion_id: termData.conclusion_id,
            first: termData.tstart,
            last: termData.tend,
            name: termData.name
        });
        fetchEnvData(); // 刷新数据
        setSelectedSubterm(null);
        } catch (error) {
        console.error('添加辅助项错误:', error);
        }
    };
  
  // 修改组件传递
  return (
    <div className="interface-container">
      {/* 左侧面板 */}
      <div className="sidebar">
        <TheoremAxiomPanel 
          theorems={envData.theorems}
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
          onApply={handleApplyItem}
        />
        
        <VariablePanel 
          localVars={envData.variables.local}
          globalVars={envData.variables.global}
        />
      </div>

      {/* 主证明区域 */}
      <div className="main-area">
        <ProofArea 
          assumptions={envData.assumptions}
          onCommandSubmit={handleCommandSubmit}
          proofSteps={[
            ...envData.inputLines.map(line => ({ type: 'command', content: line })),
            ...envData.conclusions.map(conclusion => ({ type: 'conclusion', content: conclusion }))
          ]}
          proofStatus={envData.proofStatus}
          onSubtermSelect={setSelectedSubterm}
        />
        
        {/* 修复错误的return语句 */}
        <ApplicationPanel 
          conclusions={envData.conclusions}
          terms={envData.terms}
          rules={envData.rules}
          selectedSubterm={selectedSubterm}
          onDataRefresh={() => fetchEnvData()}
        />
      </div>

      {/* 右侧面板 */}
      <div className="sidebar">
        <AssumptionPanel 
            assumptions={envData.assumptions} 
            onApply={handleApplyItem}
        />
        <AuxiliaryItemPanel 
            terms={envData.terms}
            selectedSubterm={selectedSubterm}
            onAddTerm={handleAddTerm}
            onClearSelection={() => setSelectedSubterm(null)}
        />
      </div>
    </div>
  );
};

export default ProofInterface;
