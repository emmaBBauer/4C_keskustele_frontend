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
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { IUser, IUserWithoutToken } from '../../common/models/IUser';
import { useUserContext } from '../../common/context/UserContext';
import { addUserAPI } from '../../common/api/API_Access_User';
import "./signUpStyles.css";


/**
 * Project: keskusteleFrontend
 * Created by: Emma Bauer
 * Date: 3/04/2024
 * Time: 08:18
 **/


const SignUp: React.FC = () => {
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const navigate = useNavigate();
    const { setUser } = useUserContext();

    const confirmUser = (data: FormData): string | true => {
        if (data.get('username') === '') {
            return 'Please enter a username';
        }
        if (data.get('email') === '') {
            return 'Please enter a valid email';
        }
        if (data.get('password') === '') {
            return 'Please enter a password';
        }
        if (data.get('passwordAgain') === '') {
            return 'Please enter the same password again';
        }
        if (!isSamePassword(data)) {
            return 'Passwords do not match';
        }
        return true;
    };

    const isSamePassword = (data: FormData): boolean => {
        return data.get('password') === data.get('passwordAgain');
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const validationResult = confirmUser(data);
        if (validationResult === true) {
            addUserToDatabase(data);
        } else {
            setAlertMessage(validationResult);
            setOpenAlert(true);
        }
    };

    const addUserToDatabase = (data: FormData) => {
        const user: IUserWithoutToken = {
            id: undefined,
            username: data.get('username')?.toString(),
            email: data.get('email')?.toString(),
            password: data.get('password')?.toString(),
        };

        addUserAPI(user)
            .then((value) => handleAddUserResponse(value))
            .catch(() => {
                setAlertMessage('Failed to add user. Please try again.');
                setOpenAlert(true);
            });
    };

    const handleAddUserResponse = (user: IUser | undefined) => {
        if (user) {
            setUser(user);
            navigate('/login');
        } else {
            setAlertMessage('Failed to add user. Please try again.');
            setOpenAlert(true);
        }
    };

    const handleCloseAlert = () => {
        setOpenAlert(false);
    };

    return (
        <>

            <Container component="main" maxWidth="xs" className={"container"}>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                        <LockOutlinedIcon />
                    <br/>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }} className={"form"}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField sx={{input:{color: "white"}}}
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
                            </Grid>
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} className="submit-buttonn">
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2" className={"link"}>
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
            <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
                <MuiAlert elevation={6} variant="filled" onClose={handleCloseAlert} severity="error">
                    {alertMessage}
                </MuiAlert>
            </Snackbar>
        </>
    );
};

export default SignUp;
