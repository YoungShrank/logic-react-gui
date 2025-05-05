
# 问题描述
- 运行报错
```
could not find react-redux context value; please ensure the component is wrapped in a <Provider>
```
- 代码
```
# src\main\workarea\handler\useWorkAreaHandler.js
...
const dispatch = useDispatch();
...
```
```
# src\main\workarea\views\components\WorkArea.js

        <div onInput={handleInputChange} onChange={handleChekedChange}>Work Area
            <AssistContext.Provider value={useState(assitTermList)}>
                <Provider store={store}>
                    <Horizer>
                        <RuleArea commonTermList={RuleList}/>
                        <ProofArea commonTermList = {ProofList} commonAssitTermList={assitTermList}/>
                        <AssitArea/>
                        <VarArea commonVarList={VarList}/>
                    </Horizer>
                    <TermsArea stateName="termState"/>
                    <button onClick= {handleSave}>Save</button>
                    <button onClick= {handleBroadCast}>BroadCast</button>
                    
                </Provider>
            </AssistContext.Provider>
        </div>

```

# 问题分析

WorkArea也是使用了 react-redux context的组件，也应该被包裹在Provider组件中。

# 解决方案

新定义一个Wrapper组件，该组件用Provider包裹WorkArea组件，并将Provider的store属性传递给WorkArea组件。