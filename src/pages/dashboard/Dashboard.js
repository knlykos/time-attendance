//@flow
// ------------------------------------------------
// PLEASE DO NOT EDIT. FORK IF YOU NEED TO MODIFY.
// ------------------------------------------------

import * as React from "react";
import { render } from "react-dom";

import { Route, Switch, useRouteMatch } from "react-router";
import Employees from "./employees/Employees";
import { NavLink } from "react-router-dom";
import ShiftPlanner from "./shift-planner/ShiftPlanner";
import ShiftConfig from "./shift-config/ShiftConfig";
import Departments from "./departments/Departments";
const StoryContent = () => {
  const content = (
    <div className="bx--grid">

    </div>
  );

  return <div id="main-content">{content}</div>;
};
const Fade16 = () => (
  <svg
    width="16"
    height="16"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    aria-hidden="true"
  >
    <path d="M8.24 25.14L7 26.67a14 14 0 0 0 4.18 2.44l.68-1.88a12 12 0 0 1-3.62-2.09zm-4.05-7.07l-2 .35A13.89 13.89 0 0 0 3.86 23l1.73-1a11.9 11.9 0 0 1-1.4-3.93zm7.63-13.31l-.68-1.88A14 14 0 0 0 7 5.33l1.24 1.53a12 12 0 0 1 3.58-2.1zM5.59 10L3.86 9a13.89 13.89 0 0 0-1.64 4.54l2 .35A11.9 11.9 0 0 1 5.59 10zM16 2v2a12 12 0 0 1 0 24v2a14 14 0 0 0 0-28z" />
  </svg>
);
const Dashboard = (): React.Node => {
  let { path, url } = useRouteMatch();
  return (
    <div className="container">
      <NavLink to={"/dashboard/employees"} className="bx--side-nav__link">
        Employees
      </NavLink>
      {/* </SideNavMenuItem> */}

      <NavLink to={"/dashboard/shift-planner"} className="bx--side-nav__link">
        Shift Planner
      </NavLink>
      <NavLink to={"/dashboard/shift-config"} className="bx--side-nav__link">
        Shift Config
      </NavLink>
      <NavLink to={"/dashboard/departments"} className="bx--side-nav__link">
        Departments
      </NavLink>
      <Switch>
        <Route exact path={path}>
          <StoryContent />
        </Route>
        <Route path={`${path}/employees`}>
          <div id="main-content">
            <Employees />
          </div>
        </Route>
        <Route path={`${path}/shift-planner`}>
          <div id="main-content">
            <ShiftPlanner />
          </div>
        </Route>{" "}
        <Route path={`${path}/shift-config`}>
          <div id="main-content">
            <ShiftConfig />
          </div>
        </Route>
        <Route path={`${path}/departments`}>
          <div id="main-content">
            <Departments />
          </div>
        </Route>
      </Switch>
    </div>
  );
};

export default Dashboard;
