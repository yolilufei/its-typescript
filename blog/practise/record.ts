type Cus_Record<T extends keyof any, K> = {
    [P in T]: K
}