import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// # ASSETS
import Login from "./pages/Login";
import Lobby from "./pages/Lobby";
import "./global.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/lobby" component={Lobby}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
