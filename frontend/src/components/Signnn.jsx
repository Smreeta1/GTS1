
import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../hook/useAuth";

const defaultTheme = createTheme();

export default function Signnn() {
  // const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [dataRegister, setDataRegister] = useState({
    email: "",
    password: "",
  });

  const changeValue = (e) => {
    const { name, value } = e.target;
    setDataRegister({ ...dataRegister, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await Axios.post(
        "http://127.0.0.1:8000/api/user/login/",
        dataRegister,
      );

      if (response.status === 200 ) {
        // Successful login
        
        const { access_token } = response.data;
        localStorage.setItem("accessToken", access_token);
        // setIsAuthenticated(true);
        navigate("/userDash", { replace: true });
        toast.success("Login Successful", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      } else {
        // Handle other response statuses as needed
        toast.error("Login Failed!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Login error:", error);

      toast.error("Login Failed. Check your credentials.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        margin: "75px",
        padding: "23px",
      }}
    >
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: "80vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                "url(https://images.pexels.com/photos/2768961/pexels-photo-2768961.jpeg?auto=compress&cs=tinysrgb&w=800)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={dataRegister.email}
                  onChange={changeValue}
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
                  value={dataRegister.password}
                  onChange={changeValue}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="/forgetps" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ textDecoration: "none", color: "white", mt: 3, mb: 2 }}
                >
                  <Link
                    component="button"
                    variant="body2"
                    sx={{ textDecoration: "none", color: "white" }}
                  >
                    {"Sign In with Google! "}
                  </Link>
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </Box>
  );
}
