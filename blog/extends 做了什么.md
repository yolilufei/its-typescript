
## 元祖(tuple) use extends

- 当两个测试类型元素个数和类型完全一致时

```typescript
    type t1 = [string, number];
    type t2 = ['2', 1];
    type t3 = t2 extends t1 ? true : false; // true
```

- 当两个测试类型元素个数不一致时

```typescript
    type t1 = [string, number];
    type t2 = ['2'];
    type t3 = t2 extends t1 ? true : false; // false
```

- 当两个测试类型元素类型不一致时

```typescript
    type t1 = [string, number];
    type t2 = [2, 1];
    type t3 = t2 extends t1 ? true : false; // false
```

**可以看出，元祖使用extends类似于每个对应的元素类型进行比较，当且仅当 元素个数 和 对应的元素类型 都一致时为 true**

## Union use extends

```typescript
type t1 = string | number;

type t2 = 12;

type t3 = t2 extends t1 ? true : false; // true

type t4 = '12';

type t5 = t2 extends t1 ? true : false; // true

type t6 = boolean;

type t7 = t6 extends t1 ? true : false; // false

type t8 = boolean ｜ string | number;;

type t9 = t6 extends t1 ? true : false; // false
```
