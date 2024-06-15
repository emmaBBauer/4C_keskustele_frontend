

/**
 * Project: keskusteleFrontend
 * Created by: Emma Bauer
 * Date: 3/04/2024
 * Time: 08:10
 **/

export interface IUserWithoutToken{
    id: string|undefined,
    username: string|undefined,
    email: string|null|undefined,
    password: string|null|undefined,
}

export interface IUser{
    id: string|undefined,
    username: string|undefined,
    email: string|null|undefined,
    password: string|null|undefined,
    token: string|undefined
}

export interface IUserWithoutToken{
    id: string|undefined,
    username: string|undefined,
    email: string|null|undefined,
    password: string|null|undefined,
}

export interface ILoginUser {
    email: string,
    password: string
}

export const mockUsers: IUser[] = [
    {
        id: '1',
        username: 'john_doe ',
        email: 'john@example.com',
        password: 'password123',
        token: ""
    },
    {
        id: '2',
        username: 'jane_smith ',
        email: 'jane.smith@example.com',
        password: 'securepass',
        token: ""

    },
    {
        id: '3',
        username: 'bob_brown ',
        email: 'bob.brown@example.com',
        password: 'mypassword',
        token: ""

    },
    {
        id: '4',
        username: 'alice_white ',
        email: 'alice.white@example.com',
        password: 'alicepass',
        token: ""

    },
    {
        id: undefined,
        username: undefined,
        email: null,
        password: null,
        token: ""

    }
];