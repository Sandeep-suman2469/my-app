"use client";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import Link from "next/link";

import {
    Container,
    Box,
    TextField,
    Button,
    Typography,
    Link as MuiLink,
} from "@mui/material";


function LoginForm(){
    

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isloading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        if(username.trim() === "" || password.trim() === ""){
            setError("Required")
            setIsLoading(false);
            return;
        }
        setUsername("");
        setPassword("");

        try {
      const response = await fetch(" https://dummyjson.com/auth/login ", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      const data = await response.json();

      console.log("my data", data);
      console.log("my data1", data["email"]);

      if (response.ok) {
        console.log("Login Successfull !!!")   
      } else {
        setError("login failed");
      }
    } catch (err) {
      setError("something went wrong!!");
    } finally {
      setIsLoading(false);
    }
    }

    return(
        <Container maxWidth="xs">
            <Box
              sx={{
                 mt: 18,
                 display: "flex",
                 flexDirection: "column",
                 background: "white",
                 boxShadow: 3,
                 alignItems: "center",
                 padding: 4,
              }}
              >
                <Typography component='h1' variant="h5"> Sign In</Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{mt:1}}>
                    <TextField
                       margin="normal"
                       required
                       fullWidth
                       label="username"
                       name="username"
                       autoComplete="username"
                       autoFocus
                       value={username}
                       onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                       disabled={isloading}
                       />
                       <TextField
                       margin="normal"
                       required
                       fullWidth
                       label="password"
                       name="password"
                       autoComplete="password"
                       type="password"
                       autoFocus
                       value={password}
                       onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                       disabled={isloading}
                       />

                       {error && (
                          <Typography color="error" variant="body2" sx={{mt:1}}>
                            {error}
                          </Typography>
                       )}

                       <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          disabled={isloading}
                          sx={{mt:3, mb:2}}>
                            {isloading ? "Logging in..." : "LOGIN"}
                          </Button>

                          <Typography variant="body2">
                            Don't have an account?{" "}
                            <MuiLink component={Link} href="/signup">
                            SignUp 
                            </MuiLink>
                          </Typography>

                </Box>
              </Box>
        </Container>
    );
}

export default LoginForm;