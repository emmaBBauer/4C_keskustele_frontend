import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { IUser } from '../../common/models/IUser';
import { useUserContext } from '../../common/context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {loginUserAPI} from "../../common/api/API_Access_User";

/**
 * Project: keskusteleFrontend
 * Created by: Emma Bauer
 * Date: 3/04/2024
 * Time: 08:18
 **/

const SignIn: React.FC = () => {
    const [errorString, setErrorString] = useState<string>('');
    const { user, setUser } = useUserContext();
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        if (confirmUser(data)) {
            const u: IUser = {
                id: undefined,
                username: undefined,
                email: String(data.get('email')),
                passwort: String(data.get('password'))
            };

            setUser(u);

            console.log(u);
            loginUserAPI(false, u)
                .then(value => loginCheck(value));

        }
    };

    const loginCheck = (user:IUser|undefined) => {
        if(user)
        {
            setUser(user);
            navigate('/homepage');
        }
        else {
            alert("wrong");
        }
    }


    const confirmUser = (data: FormData) => {
        if (!data.get('email')) {
            setErrorString('Please enter a valid email');
            return false;
        } else if (!data.get('password')) {
            setErrorString('Please enter a password');
            return false;
        } else {
            setErrorString('');
            return true;
        }
    };

    const defaultTheme = createTheme();

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
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        {errorString && (
                            <Typography color="error" variant="body2">
                                {errorString}
                            </Typography>
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default SignIn;
