import logo from "./logo.svg";
import "./App.css";
import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import SignUp from "./pages/Signup";
// import 'bootstrap/dist/css/bootstrap.min.css';
type Props = {
  foo: number;
  bar?: any;
};
function App(props: Props) {
  let hola = "";

  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <Home />} />
        <Route path="/login" render={() => <Login />} />
        {/* <Route path="/about" render={() => <About />} />
        <Route path="/profile" render={() => <Profile />} /> */}
        <Route path="/dashboard" render={() => <Dashboard />} />
        {/* <Route path="/dashboard/users" exact render={() => <Dashboard />} /> */}
        <Route path="/signup" render={() => <SignUp />} />
      </Switch>
    </Router>
  );
}

export default App;
