/**
 * Project: keskusteleFrontend
 * Created by: Emma Bauer
 * Date: 10/05/2024
 * Time: 22:41
 **/

export interface IChatroom {
    id: string,
    name: string,
    picPath: string,
    creatorId: string
}

export const mockChatrooms: IChatroom[] = [
    {
        id: 'chat1',
        name: 'General Discussion',
        picPath: '/images/general_discussion.png',
        creatorId: '1'
    },
    {
        id: 'chat2',
        name: 'Tech Talk',
        picPath: '/images/tech_talk.png',
        creatorId: '2'
    },
    {
        id: 'chat3',
        name: 'Random Chat',
        picPath: '/images/random_chat.png',
        creatorId: '3'
    },
    {
        id: 'chat4',
        name: 'Gaming Room',
        picPath: '/images/gaming_room.png',
        creatorId: '1'
    },
    {
        id: 'chat5',
        name: 'Book Club',
        picPath: '/images/book_club.png',
        creatorId: '2'
    }
];
