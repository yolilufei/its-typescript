
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

可以看出，元祖使用extends类似于每个对应的元素类型进行比较，当且仅当 元素个数 和 对应的元素类型 都一致时为 true

## UnionType use extends

```typescript
type t1 = string | number;

type t2 = 12;

type t3 = t2 extends t1 ? true : false; // true

type t4 = '12';

type t5 = t2 extends t1 ? true : false; // true

type t6 = Function | number;

type t7 = t6 extends t1 ? true : false; // false

type t8 = string | number;

type t9 = t8 extends t1 ? true : false; // true

type t10 = any;

type t11 = t1 extends t10 ? true : false; // true

type t12 = string | number | {};

type t13 = t12 extends t1 ? true : false; // false 

type t14 = t1 extends t12 ? true : false; // true 
```

总结：unionType 使用 extends 时，有以下特点

- 当 '子类型' 只有一个类型并且类型符合 '父类型' 任意类型时，返回true。 如 t2、t4
- 当 '子类型' 有多个类型，只要有一个类型不符合 '父类型' 任意类型时，返回false。如 t6、t12

## interface use extends

1. 属性继承：子接口会继承父接口的所有属性
 **当父接口的属性在子接口中不存在时**
```typescript
interface T1 {
    name: string;
}
interface T2 extends T1 {
    age: number;
}

// ok
const demo: T2 = {
    name: 'guoshi',
    age: 12
}

// error: Property 'age' is missing in type '{ name: string; }' but required in type 'T2'
const demo1: T2 = {
    name: 'guoshi'
}

```
 **当父接口的属性在子接口中有存在时, 如果子接口的同名类型无法兼容父接口的同名类型，便会抛出错误**
```typescript
interface T1 {
    name: string;
}
// error: Interface 'T2' incorrectly extends interface 'T1'.
//  Types of property 'name' are incompatible.
//    Type 'number' is not assignable to type 'string'
interface T2 extends T1 {
    name: number;
}

```

**函数重载**
```typescript
interface T1 {
    create: (name: string) => void;
}

interface T2 extends T1 {
    create: (age: number) => void;
}

interface T3 extends T2 {
    create: (name: number) => void;
}
```