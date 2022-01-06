type Cus_Partial<T> = {
    [k in keyof T] ?: T[k];
}

// 为什么不能用接口实现呢
// interface Cus_Partial<T> {
//     [k in keyof T] ?: T[k];
// }