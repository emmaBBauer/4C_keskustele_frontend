import axios from "axios";
import { IMessage } from "../models/IMessage";

const BASE_URL = 'http://localhost:42069/message';


export const getAllMessagesAPI = async (chatroomName?: string, token?: string): Promise<IMessage[] | undefined> => {
    try {
        const response = await axios.request<IMessage[]>({
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://localhost:42069/message/all?chatroom=${chatroomName}`,
            headers: {
                'Authorization': 'Bearer '+token

            }
        });
        return response.data;
    } catch (error) {
        return undefined;
    }
}