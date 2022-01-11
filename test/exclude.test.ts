type T0 = Cus_Exclude<"a" | "b" | "c", "a">;
     
type T1 = Cus_Exclude<"a" | "b" | "c", "a" | "b">;
     
type T2 = Cus_Exclude<string | number | (() => void), Function>;