type LockedAccount = {
     id: string;
    name: string;
}

const user1: Cus_Readonly<LockedAccount> = {
    id: '12',
    name: 'guoshi'
}

// error: 无法分配到 "name" ，因为它是只读属性
user1.name = 'guoshi2';

type UnLockedAccount = RemoveReadonly<LockedAccount>;

const user2: UnLockedAccount = {
    id: '12',
    name: 'guoshi'
}

// ok
user2.name = 'guoshi2';