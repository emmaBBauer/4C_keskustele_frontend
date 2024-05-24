import {IUser, mockUsers} from "./IUser";

export interface IMessage{
    messageId: string,
    chatroomId: string,
    content: string,
    time: Date,
    user: IUser
}

export const mockMessages: IMessage[] = [
    {
        messageId: 'msg1',
        chatroomId: 'chat1',
        content: 'Hello, this is a message from John.',
        time: new Date('2023-05-23T10:00:00Z'),
        user: mockUsers[0]
    },
    {
        messageId: 'msg2',
        chatroomId: 'chat1',
        content: 'Hi John, this is Jane.',
        time: new Date('2023-05-23T10:05:00Z'),
        user: mockUsers[1]
    },
    {
        messageId: 'msg3',
        chatroomId: 'chat2',
        content: 'Good morning, everyone!',
        time: new Date('2023-05-23T09:30:00Z'),
        user: mockUsers[2]
    },
    {
        messageId: 'msg4',
        chatroomId: 'chat1',
        content: 'How are you doing today?',
        time: new Date('2023-05-23T10:10:00Z'),
        user: mockUsers[0]
    },
    {
        messageId: 'msg5',
        chatroomId: 'chat2',
        content: 'I am doing great, thanks!',
        time: new Date('2023-05-23T09:35:00Z'),
        user: mockUsers[1]
    }
];

