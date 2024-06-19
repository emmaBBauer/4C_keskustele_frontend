/**
 * Project: keskusteleFrontend
 * Created by: Emma Bauer
 * Date: 13/06/2024
 * Time: 14:50
 **/


import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
} from '@mui/material';
import { IChatroom } from '../../common/models/IChatroom';
import { useUserContext } from '../../common/context/UserContext';
import {useChatroomContext} from "../../common/context/ChatroomContext";

interface CreateChatroomPopupProps {
    open: boolean;
    onClose: () => void;
    onCreate: (name:string, picPath:string) => void;
}

const CreateChatroomPopup: React.FC<CreateChatroomPopupProps> = ({ open, onClose, onCreate }) => {
    const { user } = useUserContext();
    const [name, setName] = useState('');
    const [picPath, setPicPath] = useState('');
    const {chatrooms, addChatroom} = useChatroomContext();

    const handleCreate = () => {
        if (name.trim() === '') {
            alert('Chatroom name is required');
            return;
        }

        onCreate(name, picPath);
        onClose();
        setName('');
        setPicPath('');

    };

    /*
          <TextField
                    margin="dense"
                    label="Picture URL"
                    type="text"
                    fullWidth
                    value={picPath}
                    onChange={(e) => setPicPath(e.target.value)}
                />

     */

    return (
        <Dialog open={open} onClose={onClose} PaperProps={{style: {backgroundColor: "#1e293b"}}}>
            <DialogTitle>Create New Chatroom</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Chatroom Name"
                    type="text"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleCreate}>Create</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateChatroomPopup;
