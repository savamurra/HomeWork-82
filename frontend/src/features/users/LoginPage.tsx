import { useState } from 'react';
import { RegisterMutation } from '../../types';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import LockOpenIcon from '@mui/icons-material/lockOpen';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectLoginError } from './userSlice.ts';
import { NavLink, useNavigate } from 'react-router-dom';
import { login } from './userThunks.ts';
import {Alert, IconButton, InputAdornment} from '@mui/material';
import {Visibility, VisibilityOff} from "@mui/icons-material";


const RegisterPage = () => {
  const [form, setForm] = useState<RegisterMutation>({
    username: '',
    password: '',
  });
  const [password, setPassword] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const loginError = useAppSelector(selectLoginError);
  const navigate = useNavigate();

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setForm({...form, [name]: value});
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(login(form)).unwrap();
    navigate('/');
  }

  const hiddenPassword = () => {
    setPassword(!password);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
          <LockOpenIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        {loginError && (
          <Alert severity="error" sx={{mt:3, width: '100%'}}>
            {loginError.error}
          </Alert>
        )}
        <Box component="form" noValidate onSubmit={onSubmit} sx={{mt: 3}}>
          <Grid container direction={'column'} size={12} spacing={2}>
            <Grid size={12}>
              <TextField
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={form.username}
                onChange={inputChange}
              />
            </Grid>
            <Grid>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type={password ? 'text' : 'password'}
                id="password"
                value={form.password}
                onChange={inputChange}
                InputProps={{
                  endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                            onClick={() => hiddenPassword()}
                            edge="end"
                            aria-label="toggle password visibility"
                        >
                          {password ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
          >
            Sign in
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid>
              <NavLink to='/register'>
                Doesn't have an account yet? Sign Up
              </NavLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;