import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../styles/signUpStyle.css';
import {useNavigate} from "react-router-dom";
import {IUser, IUserWithoutToken} from "../../common/models/IUser";
import {useUserContext} from "../../common/context/UserContext";
import {addUserAPI} from "../../common/api/API_Access_User";

const defaultTheme = createTheme();

const SignUp: React.FC = () => {
    const [errorString, setErrorString] = useState<string>("");
    const navigate = useNavigate();
    const { user, setUser } = useUserContext();

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

    const isSamePassword = (data: FormData): boolean | undefined => {
        return data.get("password") === data.get("passwordAgain");
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const isValid = confirmUser(data);
        if (isValid) {
            setErrorString("");
            const user:IUserWithoutToken = {
                id: undefined,
                username: data.get('username')?.toString(),
                email: data.get('email')?.toString(),
                password: data.get('password')?.toString()
            };

            console.log(user);

            addUserAPI(  user)
                .then(value => loginCheck(value));


            //post
            // get entweder error oder object und 201
        }
    };

    const loginCheck = (user:IUser|undefined) => {
        console.log("USER "+ user);
        if(user)
        {
            setUser(user);
            navigate('/login');
        }
        else {
            alert("wrong");
        }
    }

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
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="username"
                                    label="username"
                                    name="username"
                                    autoComplete="username"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="passwordAgain"
                                    label="Enter password again"
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
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default SignUp;
