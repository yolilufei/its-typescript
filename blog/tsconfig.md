---
title: tsconfig.json 详解
tag:  typescript
categories: Typescript
---
# tsconfig 属性详解

|一级属性|分类|二级属性|类型|默认值|解释|版本|
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
|extend|||||继承外部tsconfig|[2.1](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html#configuration-inheritance)|
|compilerOptions|Type Checking(类型检查)|[allowUnreachableCode](#allowUnreachableCode)|boolean\undefined|undefined|代码中允许存在永远不会执行的代码|
|compilerOptions|Type Checking(类型检查)|[allowUnusedLabels](#allowUnusedLabels)|boolean | undefined\undefined|代码中允许存在不使用的标记语句|
|compilerOptions|Type Checking(类型检查)|[alwaysStrict](#alwaysStrict)|boolean|true|代码始终保持严格模式|
|compilerOptions|Type Checking(类型检查)|[exactOptionalPropertyTypes](#exactOptionalPropertyTypes)|boolean|true|严格按照可选属性类型列表定义属性值，不可赋值为undefined|
|compilerOptions|Type Checking(类型检查)|[noFallthroughCasesInSwitch](#noFallthroughCasesInSwitch)|boolean|true|不允许 switch 中存在**空（不包含 break 或者 return）** case|
|compilerOptions|Type Checking(类型检查)|[noImplicitAny](#noImplicitAny)|boolean|true|禁止属性类型是隐式any。true: 禁止; false: 忽略|
|compilerOptions|Type Checking(类型检查)|[noImplicitOverride](#noImplicitOverride)|boolean|true|禁止不明确的重写。true: 禁止; false: 忽略|
|compilerOptions|Type Checking(类型检查)|[noImplicitReturns](#noImplicitReturns)|boolean|false|禁止代码块有不明确的返回值。true: 禁止; false: 忽略|
|compilerOptions|Type Checking(类型检查)|[noImplicitThis](#noImplicitThis)|boolean|true|禁止函数内部使用没有明确类型的this。true: 禁止; false: 忽略|
|compilerOptions|Type Checking(类型检查)|[noPropertyAccessFromIndexSignature](#noPropertyAccessFromIndexSignature)|boolean|true|禁止使用`.`连接符访问未明确定义的属性|
|compilerOptions|Type Checking(类型检查)|[noUncheckedIndexedAccess](https://www.typescriptlang.org/tsconfig#noUncheckedIndexedAccess)|boolean|false|为 true 时，当使用索引属性时，会默认为索引属性添加`undefined`属性值|
|compilerOptions|Type Checking(类型检查)|[noUnusedLocals](https://www.typescriptlang.org/tsconfig#noUnusedLocals)|boolean|false|为 true 时，当存在未使用的局部变量时，会抛出错误|
|compilerOptions|Type Checking(类型检查)|[noUnusedParameters](https://www.typescriptlang.org/tsconfig#noUnusedParameters)|boolean|false|为 true 时，当存在未使用的参数时，会抛出错误|
|compilerOptions|Type Checking(类型检查)|[strictBindCallApply](https://www.typescriptlang.org/tsconfig#strictBindCallApply)|boolean|false|为 true ，当使用`call`、`bind`、`apply`调用函数时，提供正确的类型检查|
|compilerOptions|Type Checking(类型检查)|[strictFunctionTypes](https://www.typescriptlang.org/tsconfig#strictFunctionTypes)|boolean|false|为 true ，对函数参数类型严格把控|
|compilerOptions|Type Checking(类型检查)|[strictNullChecks](https://www.typescriptlang.org/tsconfig#strictNullChecks)|boolean|false|为 true ，对`null` 和 `undefined` 类型严格把控|
|compilerOptions|Type Checking(类型检查)|[strictPropertyInitialization](#strictPropertyInitialization)|boolean|false|为 true ，当类属性需要赋值但未赋值时抛出错误|
|compilerOptions|Type Checking(类型检查)|[useUnknownInCatchVariables](#useUnknownInCatchVariables)|boolean|false|为 true ，catch 块中的 error 参数类型设置为 unknown|
|compilerOptions|Modules(模块规范)|[allowUmdGlobalAccess](#allowUmdGlobalAccess)|boolean|false|为 true ，catch 块中的 error 参数类型设置为 unknown|

## allowUnreachableCode

**什么是 unreachable code**

Unreachable code 也可以被称为 **dead code**,是无法在任何上下文中执行的编程代码.

**当设置为以下值时**

- undefined: 默认值，提供 warning 类型的建议
- true: 忽略不可执行的代码
- false: 抛出编译错误

**栗子：**

```tsx
const hasUnreachableCode = (a: number) => {
    if (a > 1) {
        throw 'error';
        console.log('error', a); // 永远不会执行的代码
    } else {
        return a++;
    }
    return 0; // 永远不会执行的代码
}
```

**其他**

eslint 同样支持设置规则`'no-unreachable': "error"`来避免程序中存在不可执行的代码。

## allowUnusedLabels

**什么是 label**

在 js 中， label 表示标记语句，可以和 **break** 和 **continue** 语句一起使用，使用方式就是在一条语句前面加个可以引用的标识符。

**当设置为以下值时**

- undefined: 默认值，提供 warning 类型的建议
- true: 忽略没有用的标记语句
- false: 抛出编译错误

标记语句现在很少使用了，因此这个类型设置大家估计都不是很熟悉，我们栗子：熟悉下

```tsx
let str = '';

loop1: // loop1 这个标记语句是有用的，在 for 循环里用到了
for (let i = 0; i < 5; i++) {
  if (i === 1) {
    continue loop1;
  }
  str = str + i;
}

console.log(str); // 0234
```

**下面这个是没有用到的标记语句**

```tsx
foo: { // foo 没有用到
    console.log('face');
    console.log('unuse');
}
console.log('swap');
```

**其他**

eslint 同样支持设置规则`'no-unused-labels': "error"`来避免程序中存在不可执行的代码。

## exactOptionalPropertyTypes

**属性解释**
在 **type** 或者 **interface** 中定义可选属性时(也就是 ?: 定义的属性)，当 **exactOptionalPropertyTypes** 为 **true** 时，可选属性不能赋值为 undefined。为 **false**时，则允许赋值为 undefined。

**栗子**

- exactOptionalPropertyTypes: true

```tsx

interface UserDefaults {
    color?: 'light' | 'dark';
}

const user: UserDefaults = {
    color: undefined // Type 'undefined' is not assignable to type '"light" | "dark"'
}
```

- exactOptionalPropertyTypes: false

```tsx

interface UserDefaults {
    color?: 'light' | 'dark';
}

const user: UserDefaults = {
    color: undefined // ok
}
```

**其他**  

**exactOptionalPropertyTypes** 不影响可选属性是否定义，也就是不定义 color 属性时是允许的

```tsx
interface UserDefaults {
    color?: 'light' | 'dark';
}

const user: UserDefaults = {
    // 没有定义 color 也是 ok 的
}
```

## noFallthroughCasesInSwitch

**属性解释**
不允许 switch 表达式中存在 `fallthrough` case，即如果某个 case 内不存在 `break` 或 `return` 关键字，会抛出错误。
注意：只有当该 `case` 中存在代码逻辑但是无 `break`或`return` 时才会抛出错误。如果 `case` 内无逻辑代码则不会抛出错误。

**栗子**

- noFallthroughCasesInSwitch: true **抛出错误**

```tsx

const demo = (type: number) => {
    switch(type) {
        case 0: // error：Fallthrough case in switch.(7029)
            console.log('it is 0');
        case 1:
            console.log('it is 1');
            break;
    }
}
```

- noFallthroughCasesInSwitch: true **不抛出错误**

```tsx

const demo = (type: number) => {
    switch(type) {
        case 0: // ok，空的 case 是允许的，不会当作错误
            // console.log('it is 0');
        case 1:
            console.log('it is 1');
            break;
    }
}
```

- noFallthroughCasesInSwitch: false

```tsx

const demo = (type: number) => {
    switch(type) {
        case 0: // ignore
            console.log('it is 0');
        case 1:
            console.log('it is 1');
            break;
    }
}
```

## noImplicitAny

**属性解释**
typescript 会提供一个兜底类型 `any` 给那些**没有声明类型且无法推断出类型的属性**，`noImplicitAny` 的作用就是提供一个开关给用户决定是否禁止提供隐式any类型给上述类型。

**栗子**

- noImplicitAny: true **抛出错误**

```tsx

function fn(s) {
//Parameter 's' implicitly has an 'any' type.
  console.log(s.subtr(3));
}
```

- noImplicitAny: false **不抛出错误**

```tsx
function fn(s) {
//will ignore
  console.log(s.subtr(3));
}
```

## noImplicitOverride（禁止不明确的重写）

**属性解释**
**noImplicitOverride** 应用于 `subClass extends ParentClass` 场景下，当子类**重写**父类方法时，需要在重写的方法前添加`override`关键字，否则 typescript 就会抛出错误。

**栗子**

- noImplicitOverride: true **抛出错误**

```tsx
class Album {
  download() {
    // Default behavior
  }
}
 
class SharedAlbum extends Album {
  download(x: number) { // 抛出错误，重写的方法前必须添加 override 关键字
    // Override to get info from many sources
  }  
}
```

- noImplicitAny: false **不抛出错误**

```tsx
class Album {
  download() {
    // Default behavior
  }
}
 
class SharedAlbum extends Album {
  download() { // 忽略错误，正常执行
    // Override to get info from many sources
  }  
}
```

**看以下场景**  

- 重写的方法有额外参数

```tsx
class Album {
  download() {
    // Default behavior
  }
}
 
class SharedAlbum extends Album {
  download(x: number) { // 抛出错误：download 方法和 Album 的方法不匹配，即使 noImplicitOverride 设置为false也不能重写
    // Override to get info from many sources
  }  
}
```

- 重写的方法可见性(member visibility)低于父类方法可见性

```tsx
class Album {
  download() {
    // Default behavior
  }
}
 
class SharedAlbum extends Album {
  private download(x: number) { // 抛出错误：download 方法和 Album 的方法不匹配，即使 noImplicitOverride 设置为false也不能重写
    // Override to get info from many sources
  }  
}
```

- 覆写的方法前加 static 关键字会被当作子类自己定义的方法，和 override 无关，也就不会抛出错误

```tsx
class Album {
  download() {
    // Default behavior
  }
}
 
class SharedAlbum extends Album {
  static download(x: number) { // 不抛出错误
    // Override to get info from many sources
  }  
}
```

关于这个错误，就涉及到**重写**和**重载**的概念了。下面简单介绍下两者的特点和区别，具体概念可以[看这里](https://www.runoob.com/java/java-override-overload.html)
**typescript override的规则如下**

1. 重写方法的参数列表必须完全与被重写的方法的相同,否则不能称其为重写而是重载.
2. 重写方法的访问修饰符一定要大于被重写方法的访问修饰符（public>protected>private）
3. 被重写的方法不能为private，否则在其子类中只是新定义了一个方法，并没有对其进行重写.

## noImplicitReturns

**属性解释**
js 中对于没有返回值的代码块会默认返回undefined，这在一些场景中会不符合要求, 例如以下代码：

```tsx
const add = (n) => {
    if (typeof n === 'number') {
        return n;
    }
}

const result = add(1) + 2; // ok. output 3

const result = add('1') + 2; // error. NaN
```

typescript 提供了`noImplicitReturns`属性帮助检查函数中是否存在不明确返回值的代码块

**栗子**

- noImplicitReturns: true **抛出错误**

```tsx
function f(x) {
  // Error: Not all code paths return a value.
  if (x) {
    return false;
  }
  // implicitly returns `undefined`
}
```

- noImplicitReturns: false **不抛出错误**

```tsx
function f(x) {
  // ignore 忽略不明确返回值的情况
  if (x) {
    return false;
  }
  // implicitly returns `undefined`
}
```

- 当函数指定明确返回类型时，任意代码块返回值类型不符合要求都会抛出错误，即使 `noImplicitAny: false`

```tsx
function f(x) {
  // Error: Function lacks ending return statement and return type does not include 'undefined'
  if (x) {
    return false;
  }
  // implicitly returns `undefined`
}
```

## noImplicitThis

> 当`this`没有明确的类型定义时，抛出错误

**栗子**

- noImplicitReturns: true **抛出错误**
  
**因为作用域问题触发error**
```tsx
class Rectangle {
  width: number;
  height: number;
 
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
 
  getAreaFunction() {
    return function () {
      return this.width * this.height; // 'this' implicitly has type 'any' because it does not have a type annotation.
    };
  }
}
```
可以通过在函数参数中为`this`定义类型的方式解决错误
```tsx
getAreaFunction() {
    return function (this: Rectangle) {
      return this.width * this.height; 
    };
  }
```


- noImplicitThis: false **不抛出错误**

```tsx

const demo = function () {
  return this.AbortController; // 忽略未定义类型错误
}
```

## noPropertyAccessFromIndexSignature

> 禁止使用`.`连接符访问未明确定义的属性
还记得`index signature`（索引签名） 吗？我们在温习下，想了解详情的[传送门](https://www.typescriptlang.org/docs/handbook/2/objects.html#index-signatures)    

假设我们要定义一个类型，但是我们不知道有哪些属性，typescript 允许我们使用索引签名的方式定义属性。像这样： 
```tsx
interface MaybeArray {
  [x: string]: number;
}

const myArray: MaybeArray = createArray();
const secondItem = myArray[1];
```

这样非常方便我们定义类型，不过在某些场景下也会潜藏风险，比如这个栗子：
```tsx
interface BothNamedPropertyAndIndexSignature {
  name: 'a' | 'b' | 'c';
  [key: string]: string;
}

const demo = (p: BothNamedPropertyAndIndexSignature) => {
  return p.text;
}
```

在上面的栗子中，demo 方法返回了`p.text`，但是 `p`有没有`text`属性我们不得而知，因为我们使用的是索引签名，所以代码不会报错。同时 typescript 还会做返回值的类型推断（string）， 当`p`不存在`text`属性时，返回值是 undefined，这就造成了潜在的风险。   

为了避免这个问题，typescript 提供了 `noPropertyAccessFromIndexSignature` flag，帮助我们明确该如何使用索引签名属性。   

具体使用方式就是使用`[]`来访问索引签名定义的属性，以便提醒使用者该属性不一定存在。

**栗子**

- noPropertyAccessFromIndexSignature: true **抛出错误**
  
**因为作用域问题触发error**
```tsx
interface BothNamedPropertyAndIndexSignature {
  name: 'a' | 'b' | 'c';
  [key: string]: string;
}

const demo = (p: BothNamedPropertyAndIndexSignature) => {
  return p.text; // 属性 'text' 是索引签名, 所以必须通过 ['text'] 访问
}
```

- noPropertyAccessFromIndexSignature: false **不抛出错误**

```tsx
interface BothNamedPropertyAndIndexSignature {
  name: 'a' | 'b' | 'c';
  [key: string]: string;
}

const demo = (p: BothNamedPropertyAndIndexSignature) => {
  return p.text; // 忽略错误
}
```

## strictPropertyInitialization
> 当设置为 true 时，TS 会检查类属性是否需要初始化(可以理解为初始值)，当需要初始化的属性未初始化时，抛出错误

**栗子**

- strictPropertyInitialization: true **抛出错误**

```tsx
class UserAccount {
  name: string;
  accountType = "user";
  email: string;  // error，email未初始化
  address: string | undefined;
 
  constructor(name: string) {
    this.name = name;
  }
}
```
在上面例子中：
- `this.name` 明确初始化
- `this.accountType` 已初始赋值（默认值）
- `this.email` 没有初始值，**会抛出错误**
- `this.address` 声明了 `undefined` 类型，也就意味着不需要初始赋值


## useUnknownInCatchVariables
> `try/catch` 中 `catch` 块的参数默认类型为 `any`, 当在代码块中使用参数时不会出现抛出任何问题，即潜在的的问题不会在编译期暴露出来，就会导致运行时错误。 当设置为 `true` 时，TS 会将 `catch` 块中的参数类型设置为 `unknown`, 从而迫使用户增加类型约束，保证代码正确运行。

**栗子**

- useUnknownInCatchVariables: true **抛出错误**

```tsx
try {
  throw 123;
} catch(e) {
  console.log(e.message); // error, e 的类型是 unknown，
}
```
因此在使用 `e` 这个参数之前我们必须确认其类型，就不得不使用类型约束

```tsx
try {
  throw 123;
} catch(e) {
  if (e instanceof Error) { // ok
    console.log(e.message);
  }
}
```
