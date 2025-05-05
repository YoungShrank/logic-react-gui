
### 问题描述

#### 代码
```

eventMap = {
    "onkeydown" : (e) => {
        console.log('onkeydown', e);
        console.log("current termState： ",  termState)
        if (e.key === 'Enter') {
            
        }
    }
}

```


### 分析

onkeydown是react的命名方式，js中应该是keydown

### 解决
去掉on  




### 问题描述

#### 代码
```

useEffect(() => {
    const termArea = termAreaRef.current;
    for (let key in eventMap) {
        console.log("useEffect -> event in map: " ,key);
        termArea.addEventListener(key, eventMap[key]);
        console.log("termArea", termArea)
        termArea.addEventListener("click", e => {console.log("debug click")})
    }
}, []);
```

#### 现象

只打印"click"函数中的方法


### 分析
keydown 事件通常只在元素具有焦点时才会触发。如果 termArea 或其子元素没有获取到焦点，则 keydown 事件不会触发。


### 解决
给element添加



