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
import {IPatchUser, IUser, IUserWithoutToken} from "../common/models/IUser";
import {addUserAPI, loginUserAPI, updateUserAPI} from "../common/api/API_Access_User";
import userContext, {useUserContext} from "../common/context/UserContext";
import {Label} from "@mui/icons-material";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import {useNavigate} from "react-router-dom";

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
    const [inputUsername, setInputUsername] = useState<string>(user?.username??"");
    const [inputEmail, setInputEmail] = useState<string>(user?.email??"");
    const [inputPassword, setInputPassword] = useState<string>("");
    const [inputPasswordA, setInputPasswordA] = useState<string>("");
    const navigate = useNavigate();

    const handleOnClick = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const isValid = confirmUser(data);
        if (isValid) {
            setErrorString("");
            const u: IPatchUser = {
                username: inputUsername,
                email: inputEmail,
                password: inputPassword
            };


            updateUserAPI(u, user?.id, user?.token)
                .then((data) => {
                    const nU = {
                        id: data?.id,
                        token: user?.token,
                        username: u.username,
                        email: data?.email,
                        password: data?.password,
                    }
                    console.log("SER USER ");
                    console.log(nU);
                    setUser(nU);
                });

            console.log("Passwort: ");
            console.log(inputPassword)
            //addUserAPI({id: user?.id, username: user?.username, email: inputEmail, password: inputPassword})
            //    .then(value => console.log(value));

            loginUserAPI(false, {email: inputEmail, password: inputPassword})
              .then(value => setUser(value));

            setUser(undefined);
            navigate("/login");

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
            <Container component="main" maxWidth="xs" style={{backgroundColor: "#1e293b", borderRadius: 8}}>
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
                                    value={inputUsername}
                                    label={"username"}
                                    autoComplete="username"
                                    onChange={(value) => setInputUsername(value.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="email"
                                    label={"email"}
                                    name="email"
                                    value={inputEmail}
                                    onChange={(value) => setInputEmail(value.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="password"
                                    type="password"
                                    id="password"
                                    label="New pasword"
                                    onChange={(value) => setInputPassword(value.target.value)}
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
                                    onChange={(value) => setInputPasswordA(value.target.value)}
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
    );
};

export default Settings;