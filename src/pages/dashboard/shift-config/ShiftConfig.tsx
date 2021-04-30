// @flow

import { useEffect, useState } from "react";
import { useHistory, useRouteMatch, Switch, Route } from "react-router-dom";
import EmployeeEdit from "../employees/EmployeesEdit";
import ShiftConfigNew from "./ShiftConfigNew";
import ShiftConfigList from "./ShiftConfigList";
import ShiftConfigEdit from "./ShiftConfigEdit";
const ShiftConfig = () => {
  let { path, url } = useRouteMatch();
  const history = useHistory();
  const newConfig = () => {
    history.push(`${url}/new`);
  };
  return (
    <>
      <div>
        <button onClick={newConfig}>Config</button>
      </div>
      <Switch>
        <Route exact path={`${url}`}>
          <ShiftConfigList />
        </Route>
        <Route path={`${url}/new`}>
          <ShiftConfigNew />
          {/* HOLA */}
        </Route>
        <Route path={`${url}/edit/:id`}>
          <ShiftConfigEdit />
        </Route>
      </Switch>
    </>
  );
};

export default ShiftConfig;
