import axios from "axios";
import {IUser} from "../models/IUser";
import {IChatroom, mockChatrooms} from "../models/IChatroom";



export const getAllChatrooms = async (token?: string, param?: string) => {
    try {
        const response = await axios.request( {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:42069/chatroom/all',
            headers: {
                'Authorization': 'Bearer '+token
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error users: ${error}`);
        return undefined;
    }
}

export const createNewChatroomAPI = async (body:IChatroom, token?: string):Promise<IChatroom|undefined> => {
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:42069/chatroom/post',
        headers: {
            'Authorization': 'Bearer '+token

        },
        data: body
    };

    try {
        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        console.error(error)
    }






}
