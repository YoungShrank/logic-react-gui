# HEAD
- date: 2025-02-09
- author: young
- abstract: 组件的封装与复用
  
# BODY

## background
目前[项列表组件](../main/workarea/views/components/common/TermMapArea.js)是一个通用的组件，用来展示一系列项。比如辅助项区、规则区、公理区、局部结论区。

## problem
不同的组件存在需要定制的差异，比如附加部件、使用的状态量、触发事件、订阅的事件、对事件的处理方式等。针对这些差异，需要提供一个可扩展的接口（预留变化）。
### 如何通过接口绑定事件
JSX一般是通过声明`<onXXX = somefunction/>`绑定事件，如果要通过接口绑定任意事件，可以useEffect+useRef.


## solution
1. 定义一个工厂，根据不同的需求，对 状态量、事件、处理方法进行装配。比如，辅助项区：
    - 状态量：{subterm, anyText}
    - 监听：contrl+B
    - 处理方法：发起select请求，获取辅助项列表，渲染到页面上。

