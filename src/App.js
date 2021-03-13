//@flow
//@typ
import logo from "./logo.svg";
import "./App.css";
import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/dashboard/Dashboard";
type Props = {
  foo: number,
  bar?: string,
};
function App(props: Props): React.Node {
  let hola: string = "";

  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <Home />} />
        <Route path="/login" render={() => <Login />} />
        {/* <Route path="/about" render={() => <About />} />
        <Route path="/profile" render={() => <Profile />} /> */}
        <Route path="/dashboard" render={() => <Dashboard />} />
        {/* <Route path="/dashboard/users" exact render={() => <Dashboard />} /> */}
      </Switch>
    </Router>
  );
}

export default App;
