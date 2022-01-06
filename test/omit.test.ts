type User = {
    id: string;
    name: string;
    age: number;
}

type OtherUser = Cus_Omit<User, 'name'>;
