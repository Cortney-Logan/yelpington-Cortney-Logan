import { Route, Switch } from "react-router-dom";
import Home from "./components/Home.js";
import Header from "./components/Header.js";
import Brewery from "./components/Brewery.js"
import NotFound from "./components/NotFound.js"
import Footer from "./components/Footer.js"
import "./App.css";

function App() {
  return (
    <div id="page-container">
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/brewery/:brewery" component={Brewery} />
        <Route path="*" component={NotFound} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
