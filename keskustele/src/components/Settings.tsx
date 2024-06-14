import React, {useState} from 'react';
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {IUser, IUserWithoutToken} from "../common/models/IUser";
import {addUserAPI} from "../common/api/API_Access_User";
import {useUserContext} from "../common/context/UserContext";
import {Label} from "@mui/icons-material";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

/**
 * Project: keskusteleFrontend
 * Created by: Emma Bauer
 * Date: 10/06/2024
 * Time: 15:33
 **/

const defaultTheme = createTheme();







const Settings = () => {
    const [errorString, setErrorString] = useState<string>("");
    const {user, setUser} = useUserContext();

    const handleOnClick = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const isValid = confirmUser(data);
        if (isValid) {
            setErrorString("");
            const u:IUser = {
                id: user?.id,
                token: user?.token,
                username: data.get('username')?.toString(),
                email: data.get('email')?.toString(),
                password: data.get('password')?.toString()
            };

            setUser(u);

            console.log(u);


            //post
            // get entweder error oder object und 201
        }

    }

    const isSamePassword = (data: FormData): boolean | undefined => {
        return data.get("password") === data.get("passwordAgain");
    };


    const confirmUser = (data: FormData): boolean | undefined => {
        if (data.get("username") === "") {
            setErrorString("Please enter a username");
            return false;
        } else if (data.get("email") === "") {
            setErrorString("Please enter a valid email");
            return false;
        } else if (data.get("password") === "") {
            setErrorString("Please enter a password");
            return false;
        } else if (data.get("passwordAgain") === "") {
            setErrorString("Please enter the same password again");
            return false;
        }

        if (isSamePassword(data)) {
            return true;
        } else {
            setErrorString("Not the same password");
            return false;
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <ManageAccountsIcon/>
                    </Avatar>
                    <h1>Update User</h1>

                    <Box component="form" noValidate onSubmit={handleOnClick} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="username"
                                    name= "username"
                                    label={user?.username}
                                    autoComplete="username"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="email"
                                    label={user?.email}
                                    name="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="password"
                                    type="password"
                                    id="password"
                                    label="New pasword"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="passwordAgain"
                                    label="Enter new password again"
                                    type="password"
                                    id="passwordAgain"
                                    autoComplete="new-password"
                                />
                                <Typography variant="h6">{errorString}</Typography>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Update User
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default Settings;