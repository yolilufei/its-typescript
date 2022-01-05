type RemoveReadonly<T> = {
    -readonly [P in keyof T]: T[k];
}