// export interface Demo {
//     name: string;
// }

declare global {
    interface String {
        ddd: (s: string) => boolean;
    }
}

export {}
// declare const Jquery = (...args) => any;