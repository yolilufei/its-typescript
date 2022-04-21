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
            <td>严格按照可选属性类型列表定义属性值</td>
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
