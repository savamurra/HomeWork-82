import {useEffect, useState} from 'react';
import { RegisterMutation } from '../../types';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import {clearRegisterError, selectRegisterError} from './userSlice.ts';
import { NavLink, useNavigate } from 'react-router-dom';
import { register } from './userThunks.ts';
import {IconButton, InputAdornment} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import * as React from "react";
import FileInput from "../../components/FileInput/FileInput.tsx";


const RegisterPage = () => {
  const [form, setForm] = useState<RegisterMutation>({
    username: '',
    displayName: '',
    password: '',
    avatar: null as File | null,
  });

  const dispatch = useAppDispatch();
  const registerError = useAppSelector(selectRegisterError);
  const navigate = useNavigate();
  const [password, setPassword] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      dispatch(clearRegisterError());
    };
  }, [dispatch]);

  console.log(form)


  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setForm({...form, [name]: value});
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(register(form)).unwrap();
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  const fileEventChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;

    if (files) {
      setForm((prevState) => ({
        ...prevState,
        [name]: files[0] || null,
      }));
    }
  };

  const getFieldError = (fieldName: string) => {
    try {
      return registerError?.errors[fieldName].message;
    } catch {
      return undefined;
    }
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
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
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
                error={Boolean(getFieldError('username'))}
                helperText={getFieldError('username')}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                  fullWidth
                  id="displayName"
                  label="Display Name"
                  name="displayName"
                  value={form.displayName}
                  onChange={inputChange}
                  error={Boolean(getFieldError('displayName'))}
                  helperText={getFieldError('displayName')}
              />
            </Grid>
            <Grid size={12}>
              <FileInput
                  name="avatar"
                  label="Avatar"
                  onGetFile={fileEventChangeHandler}
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
                error={Boolean(getFieldError('password'))}
                helperText={getFieldError('password')}
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
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid>
              <NavLink to='/login'>
                Already have an account? Sign in
              </NavLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;