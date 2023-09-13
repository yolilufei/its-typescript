# tsconfig.json

### allowUnreachableCode

#### 属性值

- undefined 默认值
- true
- false

#### 属性释义

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

#### 属性值

- true 默认值
- false

#### 属性释义

开启[严格模式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode)。一般来说，现代项目生成的js文件都是默认严格模式的，因此无需过多关注此属性，除非你的项目存在非严格模式文件。

### noFallthroughCasesInSwitch

#### 属性值

- true
- false

#### 属性释义

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

#### 属性值

- true
- false

#### 属性释义

允许任意扩展类型文件，

## Emit

### declaration

#### 属性值

- true
- false

#### 属性释义

为 `true` 时，在生产 js 文件时也会生成对应的 .d.ts 文件。

为 `false` 时，不会生产 .d.ts 文件。

### 关联属性
- [composite](#composite) 当 `composite` 属性启用(true)时，`declaration` 默认开启(true)
- [declarationDir](#declarationDir)
- [emitDeclarationOnly](#emitDeclarationOnly)

### declarationDir

#### 属性值

- string

#### 属性释义

配置生成的 .d.ts 文件目录

#### example

1. 相对路径目录

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

2. 绝对路径的目录

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
    当指定的路径以`/`开头，表示该路径为绝对路径，当当前用户在该目录下有写权限时，生成的 .d.ts 文件就会放到该目录下。

    可以看到，使用绝对路径要比相对路径长很多，而且还容易指定到错误的目录，因此，一般不推荐使用该方式。
3. 指定rootDir
4. 指定outDir

### noEmit

#### 属性值

- true
- false

#### 属性释义

为 `true` 时，执行 ts 编译不会有任何输出，包括 js 文件、map 文件以及 .d.ts 文件。

为 `false` 时，不会影响编译文件输出。

开启这个属性会阻止所有文件的生成，此时，ts 作为IDE（vsCode）的智能提示和静态类型检查工具使用。

**什么场景下需要该属性？**

1. 有其他的 transpiler (babel, [swc](https://github.com/swc-project/swc)) 生成文件。
