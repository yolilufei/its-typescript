---
title: tsconfig.json 详解
tag:  typescript
categories: Typescript
---
# tsconfig 属性详解

<table>
    <thead>
        <th>一级属性</th>
        <th>分类</th>
        <th>二级属性</th>
        <th>类型</th>
        <th>默认值</th>
        <th>解释</th>
    </thead>
    <tbody>
        <tr>
            <td colspan="3" style="text-align: center">extend</td>
            <td></td>
            <td></td>
            <td>继承外部tsconfig</td>
        </tr>
        <tr>
            <td rowspan="20" style="vertical-align: middle;">compilerOptions</td>
            <td rowspan="6">类型检查(Type Checking)</td>
            <td>allowUnreachableCode</td>
            <td>boolean | undefined</td>
            <td>undefined</td>
            <td>代码中允许存在永远不会执行的代码</td>
        </tr>
         <tr>
            <td>allowUnusedLabels</td>
            <td>boolean | undefined</td>
            <td>undefined</td>
            <td>代码中允许存在不使用的标记语句</td>
        </tr>
        <tr>
            <td>alwaysStrict</td>
            <td>boolean</td>
            <td>true</td>
            <td>代码始终保持严格模式</td>
        </tr>
         <tr>
            <td>exactOptionalPropertyTypes</td>
            <td>boolean</td>
            <td>true</td>
            <td>严格按照可选属性类型列表定义属性值，不可赋值为undefined</td>
        </tr>
        <tr>
            <td>noFallthroughCasesInSwitch</td>
            <td>boolean</td>
            <td>true</td>
            <td>是否允许 switch 中存在**空（不包含 break 或者 return）** case</td>
        </tr>
        <tr>
            <td>noImplicitAny</td>
            <td>boolean</td>
            <td>true</td>
            <td>是否禁止属性类型是隐式any。true: 禁止; false: 忽略;</td>
        </tr>
    </tbody>
</table>

## allowUnreachableCode

**什么是 unreachable code**

Unreachable code 也可以被称为 **dead code**,是无法在任何上下文中执行的编程代码.

**当设置为以下值时**

- undefined: 默认值，提供 warning 类型的建议
- true: 忽略不可执行的代码
- false: 抛出编译错误

**举个栗子：**

```js
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

标记语句现在很少使用了，因此这个类型设置大家估计都不是很熟悉，我们举个栗子：熟悉下

```js
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

```js
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

**举个栗子**
- exactOptionalPropertyTypes: true
```js

interface UserDefaults {
    color?: 'light' | 'dark';
}

const user: UserDefaults = {
    color: undefined // Type 'undefined' is not assignable to type '"light" | "dark"'
}
```

- exactOptionalPropertyTypes: false
```js

interface UserDefaults {
    color?: 'light' | 'dark';
}

const user: UserDefaults = {
    color: undefined // ok
}
```
**其他**  

**exactOptionalPropertyTypes** 不影响可选属性是否定义，也就是不定义 color 属性时是允许的
```js
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

**举个栗子**
- noFallthroughCasesInSwitch: true **抛出错误**
```js

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
```js

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
```js

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

**举个栗子**
- noImplicitAny: true **抛出错误**
```js

function fn(s) {
//Parameter 's' implicitly has an 'any' type.
  console.log(s.subtr(3));
}
```

- noImplicitAny: false **不抛出错误**
```js
function fn(s) {
//will ignore
  console.log(s.subtr(3));
}
```

## noImplicitOverride（禁止不明确的重写）
**属性解释**   
**noImplicitOverride** 应用于 `subClass extends ParentClass` 场景下，当子类**重写**父类方法时，需要在重写的方法前添加`override`关键字，否则 typescript 就会抛出错误。

**举个栗子**
- noImplicitOverride: true **抛出错误**
```js
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
```js
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
```js
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
```js
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

```js
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