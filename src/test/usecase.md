# 系统测试用例

## 功能测试


### 推理环境展示


### 证明

```
write | theorem  ∀ x:N, (ADD(ADD(x,_0,), _0,)) = x
write | any x:N,
use axiom theorem_name
select 0 5 13 left
instance 0 -x left
bra off 1 3 13
select 0 8 8 x
instance 0 -x x
bra off 3 3 3
eqrepl 4 2 19 19 left
bra off 5 3 3
bra off 6 16 16 
bra off 7 16 16 
introduce 8 all -x x
qed
```

## 健壮性测试
