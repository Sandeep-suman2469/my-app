'use client';

import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { TextField, Button, Box, Typography, Container, Link as MuiLink, FormControl, FormLabel, Select, MenuItem, InputLabel,SelectChangeEvent } from '@mui/material';

function SignUpForm() {
  

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userType, setUserType] = useState<string>('guest');
  const [error, setError] = useState<string>('')


  

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    if(username.trim() === ''  || password.trim() === ''){
        setError('provide required data')
        return;
    }
    setUsername('');
    setPassword('');
    setUserType('Guest');
   try{
    const response = await  fetch('https://dummyjson.com/user/me', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer /* YOUR_ACCESS_TOKEN_HERE */', // Pass JWT via Authorization header
        },
      })
      .then(res => res.json())
      .then(console.log);

    }catch(err){
      setError('Something went wrong')
    }
  }
  

  return (
    
    <Container maxWidth="xs">
      <Box sx={{
         mt: 18,
         padding: 4,
         display: 'flex',
         flexDirection: 'column',
         alignItems: 'center',
         boxShadow: 3,
         borderRadius:2,
         backgroundColor: 'white'}}>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>

       <Box component="form" onSubmit={handleSubmit} sx={{mt:1}}> 
          <TextField
            margin='normal'
            required
            fullWidth
            label='username'
            name='username'
            autoComplete='username'
            autoFocus
            value={username}
            onChange={(e:ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
           
            ></TextField>

            <TextField
              margin='normal'
              required
              fullWidth
              label='password'
              name='password'
              type='password'
              autoComplete='password'
              autoFocus
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              
              ></TextField>

              <FormControl fullWidth sx={{mt:1}}>
                
                <InputLabel id="userType">SignUp As</InputLabel>
                <Select
                  labelId='userType'
                  id='userType'
                  label="signUp As"
                  name='userType'
                  value={userType}
                  onChange={(e)=> setUserType(e.target.value)}
                  >
                    
                        <MenuItem value="Guest">Guest</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="user">User</MenuItem>

                  </Select>
              </FormControl>
              
              

              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{mt:3, mb:2}}>
                  SIGN UP
               </Button>

               <Typography 
                 variant='body2'>
                  Already have an account?{' '}
                  <MuiLink component={Link} href="/login" >Sign in</MuiLink>
                 </Typography>
       </Box>
      </Box>
    </Container>
  );
}

export default SignUpForm;




