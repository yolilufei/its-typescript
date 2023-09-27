## tsconfig.json

### allowUnreachableCode

#### 选项值

- undefined 默认值
- true
- false

#### 选项释义

允许代码块中存在永远都不会执行的代码。当设置不同值时，ts 行为如下

1. 为 true 时，**忽略**代码块中永远都不会执行的代码
2. 为 false 时，当代码块中存在永远都不会执行的代码时，**抛出类型检查错误**
3. 为 undefined 时，当代码块中存在永远都不会执行的代码时，**提出告警而不会抛出类型检查错误**

#### example

[试一试](https://www.typescriptlang.org/play?noFallthroughCasesInSwitch=false&allowUnreachableCode=false#code/GYVwdgxgLglg9mABMMAKAhgLkWEBbAIwFMAnASkQG8AoROxGYRDRAHkQAYKb7fESiUECSToA3LXoBfREQA2AZyJVJffoOFIOE3lNXqhIxAEYO26lKA)

```typescript
    // tsconfig.json
    {
        "allowUnreachableCode": false
    }
    // test.ts
    function fn(a: number) {
        if (a < 0) {
            return a;
        } else {
            return 0;
        }
        return 100; // 抛出错误：Unreachable code detected.(7027)
    }
```

### alwaysStrict

#### 选项值

- true 默认值
- false

#### 选项释义

开启[严格模式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode)。一般来说，现代项目生成的js文件都是默认严格模式的，因此无需过多关注此选项，除非你的项目存在非严格模式文件。

### noFallthroughCasesInSwitch

#### 选项值

- true
- false

#### 选项释义

当为 true 时，switch 块中任意**非空case子句**都必须要有**结束声明**，避免case子句执行完成后继续执行下一个case子句。为 false 则不校验。
`非空case子句`：case 子句块内容不为空，例如：

```typescript
switch(match){
    case 0: // 空子句
    case 1: // 非空子句
        console.log(...);
        ...other logic
}
```

`结束声明`: 一般在 case 子句中通过 `break` 关键字结束匹配。其余结束声明还有 `return` 和 `throw`。

#### example

[试一试](https://www.typescriptlang.org/play?noFallthroughCasesInSwitch=true#code/FAGwpgLgBAtghhAxgCygXigRgNzGAZwHcBLJZACnjIEooBvYKJqROfMKABgC5Hn-EAewB2+QeAB0IQQHNyAck5Ri+WAhRgAJvOq4BbDpl78BIsZOlz5mZaqobtuviagAjAE5g4Aaz3NW7FAAzMbMmmAAZnAAriAQoS4eXr7AAL5AA)

```typescript
let match = 1;

switch(match) {
    case 0: // error: fallThrough case in switch
        console.log('0 is matched');
    case 1:
        console.log('1 is matched');
        break;
    case 3:
    default:
        break;
}
```

## Module

### allowArbitraryExtensions from v5.0

#### 选项值

- `true`
- `false`

#### 选项释义

允许任意扩展类型文件，

## Emit

### declaration

#### 选项值

- `true`
- `false`

#### 选项释义

为 `true` 时，在生产 js 文件时也会生成对应的 `.d.ts` 文件。

为 `false` 时，不会生产 `.d.ts` 文件。

### 关联选项
- [composite](#composite) 当 `composite` 选项启用(true)时，`declaration` 默认开启(true)
- [declarationDir](#declarationDir)
- [emitDeclarationOnly](#emitDeclarationOnly)

### declarationDir

#### 选项值

- `string`

#### 选项释义

配置生成的 `.d.ts` 文件目录

#### example

1. 不指定时

    ```json
    // tsconfig.json
        {
            "compilerOptions": {
                //"declarationDir": "./"
            }
        }
    // 执行编译，环境：MacOS，
    // 命令行执行指令：tsc --declaration index.ts
    // 执行结果：在编译文件所在目录生成 .d.ts 文件
    ```

    不指定 `declarationDir` 时，tsc 会在编译的每一个源文件同目录下生成 `.d.ts` 文件

2. 相对路径目录（**推荐**）

    ```json
    // tsconfig.json
        {
            "compilerOptions": {
                "declarationDir": "types"
            }
        }
    // 执行编译，环境：MacOS，
    // 命令行执行指令：tsc --declarationDir types index.ts
    // 执行结果：在当前tsconfig.json所在目录下的types目录下生成 index.d.ts 文件
    ```

    使用相对目录时，相对的是 `tsconfig.json` 所在的目录。假设，`tsconfig.json` 在项目根目录下，最终 `declarationDir` 的完整路径就是 `/项目路径/types`

3. 绝对路径的目录

    ```json
    // tsconfig.json
        {
            "compilerOptions": {
                "declarationDir": "/current-project-path/types"
            }
        }
    // 执行编译，环境：MacOS，命令行执行指令：tsc --declarationDir /current-project-path/types index.ts
    // 执行结果：在当前项目下的types目录下生成 index.d.ts 文件
    ```

    当指定的路径以`/`开头，表示该路径为绝对路径，当当前用户在该目录下有写权限时，生成的 `.d.ts` 文件就会放到该目录下。

    可以看到，使用绝对路径要比相对路径长很多，而且还容易指定到错误的目录，因此，一般不推荐使用该方式。
4. 指定 `rootDir`

    当指定 `rootDir` 时，是否会影响 `declarationDir` 最终的路径呢？我们来试一下

    ```json
    // tsconfig.json
        {
            "compilerOptions": {
                "rootDir": "src",
                "declarationDir": "types"
            }
        }
    // 执行编译，环境：MacOS
    // 命令行执行指令：tsc --rootDir src --declarationDir /current-project-path/types index.ts
    // 执行结果：在当前tsconfig.json所在目录下的types目录下生成 index.d.ts 文件
    ```

    可以看出，**rootDir 并不会影响 declarationDir 的最终路径**

5. 指定 `outDir`

    测试操作同3，此处省略。

    测试结果表明：**outDir 同样不会影响 declarationDir 的最终路径**

#### 总结

1. 当不指定 `declarationDir` 时，生成的 `.d.ts` 文件所在目录即当前编译的文件所在目录
2. 推荐使用**相对路径**指定 `.d.ts` 文件目录
3. `rootDir` 和 `outDir` 对 `declarationDir` 最终路径没有影响
4. 只有当 `declaration` 选项生效时，`declarationDir` 选项才生效


### declarationMap

#### 选项值

- `string`

#### 选项释义

生成 `.d.ts` map 文件，指向源文件。生成的 map 文件如下：

```json
    {
    "version": 3,
    "file": "index.d.ts",
    "sourceRoot": "",
    "sources": [
        "index.ts"
    ],
    "names": [],
    "mappings": "AAUA,eAAO,MAAM,CAAC,MAAM,CAAC"
    }
```

### downlevelIteration

#### 选项值

- `true`
- `false`

#### 选项释义

当在源码中使用了目标环境不支持的API或语法时(例如：在源码中使用 `...[]` 解构 或者 `for of` 迭代，但是
代码需要运行在 ES5 中)，ts 会提供内置的 **polyfill** 实现兼容。默认情况下，ts 会在每个需要兼容的文件内写入兼容性代码，像下面这样：

```typescript
    // 源码使用ES6的模板字符串语法
    const a = 1;
    const b = `${a > 1 ? '2' : '3'}23`;

    // tsconfig.json 配置如下
    {
        "target": "ES5",
        "downlevelIteration": true
    }
```

上面代码块中，指定了生成代码所在环境为 ES5，而模板字符串是 ES6 语法，在 ES5 中不存在。ts 在检测到该情况后，会查看编译配置选项(tsconfig.json)中是否开启了 `downlevelIteration`，如果未开启，ts 会提示用户开启该选项。 提示信息类似如下：

```typescript
只有在使用 "--downlevelIteration" 标志或 "--target" 为 "es2015" 或更高版本时，才能循环访问类型“"123"”。ts(2802)
```

如果开启了 `downlevelIteration`, ts 在编译时会提供兼容代码将较新的API和语法兼容到指定的环境(如 ES6 到 ES5)。

执行 `tsc` 编译后，生成的代码如下：

```typescript
    "use strict";
    var a = 1;
    var b = "".concat(a > 1 ? '2' : '3', "23");
```

不要被 `downlevelIteration` 语义迷惑，认为它只能兼容迭代器相关API或语法。实际上，任意较新的API和语法它都可以兼容。

再看一个兼容`class`的例子。

```typescript
    // 源文件：index.ts
    class A {
     
        ma(params: any) {
            console.log(params);    
        }
    }
    // 生成文件：index.js
    "use strict";
    var A = /** @class */ (function () {
        function A() {
        }
        A.prototype.ma = function (params) {
            console.log(params);
        };
        return A;
    }());

```
### importHelpers

#### 选项值

- `true`
- `false`

#### 选项释义

允许通过 `tslib` 包导入帮助函数，替换文件内生成的帮助函数，以减少代码冗余，降低包体积。

当在源码中使用了目标环境不支持的API时，例如：在源码中使用 `...[]` 解构 或者 `for of` 迭代，但是
代码需要运行在 ES5 中，ts 会提供内置的 **polyfill** 实现兼容。默认情况下，ts 会在每个需要兼容的文件内写入兼容性代码，像下面这样：

```typescript
    // a.ts
    console.log([1, ...[2, 3, 4]]);
    // b.ts
    console.log([1, ...[2, 3, 4]]);
```

执行 `tsc` 编译后，生成的代码如下：

```typescript
    // a.js
    "use strict";
    var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    };
    console.log(__spreadArray([1], [2, 3, 4], false));

    // b.js
    "use strict";
    var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    };
    console.log(__spreadArray([1], [2, 3, 4], false));
```

可以看到，a.js 和 b.js 都包含了 `__spreadArray` 函数，导致生成的文件包含了重复代码，增大了代码体积。如果是实际项目，那体积的增加是不可忽视的。为了解决重复代码问题，ts 提供了 `importHelpers` 选项，配合 `tslib` 包一起使用，使 ts 提供的帮助函数由文件内插入改为 `tslib`导入，多个文件共享同一份代码，有效的解决代码冗余问题。

`importHelpers` 配合 `tslib` 使用方式如下：

1. 首先下载 `tslib` 包，注意阅读 `tslib` [README](https://www.npmjs.com/package/tslib), 针对不同的 ts 版本需要下载不同的 `tslib`

    `npm install tslib` `// 支持 ts 3.9.2 及后续版本`
   
    `npm install tslib@^1` `// 支持 ts > 2.3.2 <=3.8.4`

    `npm install tslib@^1.6.1` `// 支持 ts <= 2.3.2`

2. 在 `tsconfig.json` 中开启 `importHelpers` 选项，即 `importHelpers: true`
3. 执行 ts 编译，即可看到生成的代码中从 `tslib` 导出的帮助函数

```typescript
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    console.log(tslib_1.__spreadArray([1], [2, 3, 4], false));
    exports.default = 1;
```

**注意**，只有 `ESModule` 模块才会导入 `tslib`, 全局文件仍然采用文件内插入帮助函数的形式。

### emitDeclarationOnly

#### 选项值

- `true`
- `false`

#### 选项释义

顾名思义，该选项开启时，ts 只会输出 `.d.ts` 文件，而不会生成 `.js` 文件。

注意，想开启该选项，需要先开启 `declaration` 选项。

以下场景，比较适合开启该选项

1. 有其他编译工具（babel）生成代码
2. 仅需要生成 `.d.ts` 声明文件, 例如给老项目生成 `.d.ts` 文件。

### importsNotUsedAsValues --Deprecated

#### 选项值

- `remove`
- `preserve`
- `error`
#### 选项释义



### noEmit

#### 选项值

- true
- false

#### 选项释义

为 `true` 时，执行 ts 编译不会有任何输出，包括 js 文件、map 文件以及 .d.ts 文件。

为 `false` 时，不会影响编译文件输出。

开启这个选项会阻止所有文件的生成，此时，ts 作为IDE（vsCode）的智能提示和静态类型检查工具使用。

**什么场景下需要该选项？**

1. 有其他的 transpiler (babel, [swc](https://github.com/swc-project/swc)) 生成文件。
