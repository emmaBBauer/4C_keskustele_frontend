/**
 * Project: keskusteleFrontend
 * Created by: Emma Bauer
 * Date: 10/05/2024
 * Time: 22:41
 **/
import {IUser, IUserWithoutToken} from "./IUser";

export interface IChatroom {
    id: string|undefined,
    name: string,
    picPath: string,
    creator: IUserWithoutToken|undefined
}

export const mockChatrooms: IChatroom[] = [
    {
        id: 'chat1',
        name: 'General Discussion',
        picPath: '/images/general_discussion.png',
        creator: undefined
    },
    {
        id: 'chat2',
        name: 'Tech Talk',
        picPath: '/images/tech_talk.png',
        creator: undefined
    },
    {
        id: 'chat3',
        name: 'Random Chat',
        picPath: '/images/random_chat.png',
        creator: undefined
    },
    {
        id: 'chat4',
        name: 'Gaming Room',
        picPath: '/images/gaming_room.png',
        creator: undefined
    },
    {
        id: 'chat5',
        name: 'Book Club',
        picPath: '/images/book_club.png',
        creator: undefined
    }
];
