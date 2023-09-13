# Mapping Type

## Mapping Modifiers

**readonly** 和 **?** 作为额外的两种修饰符，使用特点如下：

1. 属性只读(readonly)

```typescript
  type LockedAccount = {
    readonly id: string;
    readonly name: string;
   };
```

去除只读属性, 需要加 **-**, 否则是无法去掉只读属性的
  [demo](../test/readonly.test.ts)
  
```typescript
  type RemoveReadonly<T> = {
      -readonly [P in keyof T]: T[P];
  }

```

2. 属性可选(?)

```typescript
    type MaybeUser = {
        id: string;
        name?: string;
        age?: number;
    }
```  

去除可选属性，需要加 **-**, 否则是无法去掉可选属性的
[demo](../test/required.test.ts)

```typescript
    type removeOptional<T> = {
        [P in keyof T] -?: T[P];
    }
```

## Key Remapping via as

我翻译为属性重定义，意思就是在映射属性时可以重定义属性名，举例:

```typescript
// 这里有一个对象类型，定义 User 的属性类型
    type User = {
        id: string;
        name: string;
        age: number;
    }
// 通过 as 定义属性的 getter/setter

    type UserGetter<T> = {
        [P in keyof T as `get${Capitalize<string & P>}`]: () => T[P];
    }

    type UserSetter<T> = {
        [P in keyof T as `set${Capitalize<string & P>}`]: (k: T[P]) => void;
    }

// 完整的 User 属性
    type UserComplete = User & UserGetter<User> & UserSetter<User>;

```
