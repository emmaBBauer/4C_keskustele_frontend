import React, { createContext, useContext, useState } from 'react';
import { IMessage } from "../models/IMessage";

/**
 * Project: keskusteleFrontend
 * Created by: Emma Bauer
 * Date: 07/06/2024
 * Time: 08:19
 **/

interface MessageContextProps {
    messages: IMessage[];
    addMessage: (message: IMessage) => void;
    setMessages: (messages: IMessage[]) => void;
}

const MessageContext = createContext<MessageContextProps>({
    messages: [],
    addMessage: () => {},
    setMessages: () => {},
});

export const useMessageContext = () => {
    const context = useContext(MessageContext);
    if (!context) {
        throw new Error("Context must be used within a Provider");
    }
    return context;
};

interface MessageProviderProps {
    children: React.ReactNode;
}

const MessageContextProvider: React.FC<MessageProviderProps> = ({ children }) => {
    const [messages, setMessages] = useState<IMessage[]>([]);

    const addMessage = (newMessage: IMessage) => {
        setMessages(prevMessages => [...prevMessages, newMessage]);
    };

    return (
        <MessageContext.Provider value={{ messages, addMessage, setMessages }}>
            {children}
        </MessageContext.Provider>
    );
};

export default MessageContextProvider;
