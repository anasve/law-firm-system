import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import axios from 'axios';
axios.defaults.baseURL = 'http://127.0.0.1:8000';

const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: "Tajawal, Arial, sans-serif",
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>

);
