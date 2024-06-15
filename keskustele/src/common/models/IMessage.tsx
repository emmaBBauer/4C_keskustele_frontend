import {IUser, IUserWithoutToken, mockUsers} from "./IUser";
import {IChatroom} from "./IChatroom";

export interface IMessage{
    messageId: string|undefined,
    chatroomId: string|undefined|number,
    content: string,
    time: Date,
    author: IUser|undefined
    chatroom: IChatroom|undefined
}

export interface IMessageWithChatroom{
    id: number|undefined,
    content: string,
    time: Date,
    author: IUserWithoutToken|undefined,
    chatroom: IChatroom|undefined
}


export const mockMessages: IMessage[] = [
    {
        messageId: 'msg1',
        chatroomId: 1,
        content: 'Hello, this is a message from John.',
        time: new Date('2023-05-23T10:00:00Z'),
        author: mockUsers[0],
        chatroom: undefined
    },
    {
        messageId: 'msg2',
        chatroomId: 1,
        content: 'Hi John, this is Jane.',
        time: new Date('2023-05-23T10:05:00Z'),
        author: mockUsers[1],
        chatroom: undefined
    },
    {
        messageId: 'msg3',
        chatroomId: 1,
        content: 'Good morning, everyone!',
        time: new Date('2023-05-23T09:30:00Z'),
        author: mockUsers[2],
        chatroom: undefined
    }
];

