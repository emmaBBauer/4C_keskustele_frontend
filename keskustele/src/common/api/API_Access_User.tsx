import axios from "axios";
import {ILoginUser, IPatchUser, IUser, IUserWithoutToken} from "../models/IUser";
import {IChatroom} from "../models/IChatroom";

const BASE_URL = 'http://localhost:42069/user';
const AUTH_URL = 'http://localhost:42069/auth';





export const getAllUsersAPI = async (token?: string, param?: string) => {
    try {
        const response = await axios.get<IUser[]>(`${BASE_URL}/all${param || ''}`, {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:42069/user/all',
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

export const addUserAPI = async ( user:IUserWithoutToken) => {
    try {
        const response = await axios.post<IUser>(`${AUTH_URL}/signup`, user,  {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'localhost:42069/user/all',
            headers: {
                'Authorization': 'Bearer'

            }
        });
        return response.data;
    } catch (error) {
        return undefined;
    }
};

export const loginUserAPI = async (cancel = false, user:ILoginUser):Promise<IUser|undefined> => {
    try {
        const response = await axios.post<IUser>(`${AUTH_URL}/login`, user, {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:42069/auth/login',
            headers: {
                'Content-Type': 'application/json'
            },
            data : user
        });

        return response.data;
    } catch (error) {
        return undefined;
    }
};

export const updateUserAPI = async (body:IPatchUser,  id?: string, token?: string):Promise<IUserWithoutToken|undefined> => {
    let config = {
        method: 'patch',
        maxBodyLength: Infinity,
        url: `http://localhost:42069/user/update/${id}`,
        headers: {
            'Authorization': 'Bearer '+token

        },
        data: body
    };

    try {
        const response = await axios.request(config);
        return response.data;


    }catch (error)
    {
        return undefined;
    }




}


