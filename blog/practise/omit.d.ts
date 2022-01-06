type Cus_Omit<T, K extends keyof any> = {
    [P in keyof T]: P extends K ? never : T[P];
}