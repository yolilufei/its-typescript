type Cus_Readonly<T> = {
    readonly [P in keyof T]: T[P];
}