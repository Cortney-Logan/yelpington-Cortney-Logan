import { Route, Switch, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./components/Home.js";
import Header from "./components/Header.js";
import Brewery from "./components/Brewery.js"
import NotFound from "./components/NotFound.js"
import "./App.css";

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/brewery/:brewery" component={Brewery} />
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
