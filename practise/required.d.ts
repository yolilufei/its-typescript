type Cus_Required<T> = {
    [k in keyof T]-?: T[k];
}