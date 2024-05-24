

/**
 * Project: keskusteleFrontend
 * Created by: Emma Bauer
 * Date: 3/04/2024
 * Time: 08:10
 **/

export interface IUser{
    id: string|undefined,
    username: string|undefined,
    email: string|null|undefined,
    passwort: string|null|undefined
}

export const mockUsers: IUser[] = [
    {
        id: '1',
        username: 'john_doe ',
        email: 'john@example.com',
        passwort: 'password123'
    },
    {
        id: '2',
        username: 'jane_smith ',
        email: 'jane.smith@example.com',
        passwort: 'securepass'
    },
    {
        id: '3',
        username: 'bob_brown ',
        email: 'bob.brown@example.com',
        passwort: 'mypassword'
    },
    {
        id: '4',
        username: 'alice_white ',
        email: 'alice.white@example.com',
        passwort: 'alicepass'
    },
    {
        id: undefined,
        username: undefined,
        email: null,
        passwort: null
    }
];