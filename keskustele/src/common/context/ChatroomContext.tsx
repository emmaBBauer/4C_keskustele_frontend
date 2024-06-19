import React, { createContext, useState, useContext, ReactNode } from 'react';
import {IChatroom, mockChatrooms} from "../models/IChatroom";

interface ChatroomContextProps {
    chatrooms: IChatroom[];
    addChatroom: (chatroom: IChatroom) => void;
    updateChatroom: (id: string, updatedChatroom: Partial<IChatroom>) => void;
}

const ChatroomContext = createContext<ChatroomContextProps | undefined>(undefined);

const ChatroomProvider = ({ children }: { children: ReactNode }) => {
    const [chatrooms, setChatrooms] = useState<IChatroom[]>(mockChatrooms);

    const addChatroom = (chatroom: IChatroom) => {
        setChatrooms([...chatrooms, chatroom]);
    };

    const updateChatroom = (id: string, updatedChatroom: Partial<IChatroom>) => {
        setChatrooms(chatrooms.map(cr => cr.id === id ? { ...cr, ...updatedChatroom } : cr));
    };


    return (
        <ChatroomContext.Provider value={{ chatrooms, addChatroom, updateChatroom }}>
            {children}
        </ChatroomContext.Provider>
    );
};

const useChatroomContext = () => {
    const context = useContext(ChatroomContext);
    if (context === undefined) {
        throw new Error('useChatroomContext must be used within a ChatroomProvider');
    }
    return context;
};

export { ChatroomProvider, useChatroomContext };
