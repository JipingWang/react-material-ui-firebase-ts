import React, { Component, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import firebase from 'firebase/app';
import { createMuiTheme, MuiThemeProvider, Theme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Home from './Home'
import Login from './unauthenticated/Login'
import Register from './unauthenticated/Register';

const theme = createMuiTheme()

export const App = () => {
  const [signedIn, setSignedIn] = useState(false)
  const win = signedIn ? <Home /> : <Login />;

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {win}
    </MuiThemeProvider>
  )
}





export default App;
