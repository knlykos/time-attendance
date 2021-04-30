
import * as React from "react";
import { useHistory, useRouteMatch, Switch, Route } from "react-router-dom";
import DepartmentsEdit from "./DepartmentsEdit";
import DepartmentsList from "./DepartmentsList";
import DepartmentsNew from "./DepartmentsNew";
const Departments = () => {
  let { path, url } = useRouteMatch();
  const history = useHistory();
  const newDepartment = () => {
    history.push(`${url}/new`);
  };

  return (
    <>

      <Switch>
        <Route exact path={`${url}`}>
          <DepartmentsList />
        </Route>
        <Route path={`${url}/new`}>
          <DepartmentsNew />
          {/* HOLA */}
        </Route>
        <Route path={`${url}/edit/:id`}>{<DepartmentsEdit />}</Route>
      </Switch>
    </>
  );
};
export default Departments;