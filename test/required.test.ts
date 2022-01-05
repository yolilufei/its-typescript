interface Props {
  a?: number;
  b?: string;
}

const obj: Props = { a: 5 };

// error 缺少 b 属性
const obj2: Cus_Required<Props> = { a: 5 };
