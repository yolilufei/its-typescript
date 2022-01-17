

```typescript
type T1 = 'a' | 'b' | 'c' | 'd';
type T2 = 'd';

type T3_Obvious = T1 extends T2 ? never : T1;

// ok
type T3<T, U> = T extends U ? never : T;

type T4 = T3<T1, T2>;
```